package com.shudu.chaoshi.activity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.Rect;
import android.graphics.RectF;
import android.graphics.SurfaceTexture;
import android.hardware.Camera;
import android.os.Bundle;
import android.view.TextureView;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.megvii.idcardlib.R;
import com.megvii.idcardlib.util.DialogUtil;
import com.megvii.idcardlib.util.ICamera;
import com.megvii.idcardlib.util.IDCardIndicator;
import com.megvii.idcardlib.util.RotaterUtil;
import com.megvii.idcardlib.util.Util;
import com.megvii.idcardquality.IDCardQualityAssessment;
import com.megvii.idcardquality.IDCardQualityResult;
import com.megvii.idcardquality.bean.IDCardAttr;

import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;

public class FaceIDCardScanActivity extends Activity implements
		TextureView.SurfaceTextureListener, Camera.PreviewCallback {

	private TextureView textureView;
	private DialogUtil mDialogUtil;
	private ICamera mICamera;// 照相机工具类
	private IDCardQualityAssessment idCardQualityAssessment = null;
	private IDCardIndicator mIndicatorView;
	private IDCardAttr.IDCardSide mSide;
	private DecodeThread mDecoder = null;
	private boolean mIsVertical = false;
	private TextView fps;
	private TextView errorType;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.idcardscan_layout);
		init();
		initData();
	}

	private void init() {
		mIsVertical = getIntent().getBooleanExtra("isvertical", false);
		if (mIsVertical)
			setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
		else
			setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		
		mICamera = new ICamera(mIsVertical);
		mDialogUtil = new DialogUtil(this);
		textureView = (TextureView) findViewById(R.id.idcardscan_layout_surface);
		textureView.setSurfaceTextureListener(this);
		textureView.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				mICamera.autoFocus();
			}
		});
		fps = (TextView) findViewById(R.id.idcardscan_layout_fps);
		errorType = (TextView) findViewById(R.id.idcardscan_layout_error_type);
		mFrameDataQueue = new LinkedBlockingDeque<byte[]>(1);
		mIndicatorView = (IDCardIndicator) findViewById(R.id.idcardscan_layout_indicator);
		mDecoder = new DecodeThread();
		mDecoder.start();
		mSide = getIntent().getIntExtra("side", 0) == 0 ? IDCardAttr.IDCardSide.IDCARD_SIDE_FRONT
				: IDCardAttr.IDCardSide.IDCARD_SIDE_BACK;
	}

	/**
	 * 初始化数据
	 */
	private void initData() {
		idCardQualityAssessment = new IDCardQualityAssessment();
		boolean initSuccess = idCardQualityAssessment.init(this,
				Util.readModel(this));
		if (!initSuccess) {
			mDialogUtil.showDialog("检测器初始化失败");
		}
	}
	
	@Override
	protected void onResume() {
		super.onResume();
		Camera mCamera = mICamera.openCamera(this);
		if (mCamera != null) {
			RelativeLayout.LayoutParams layout_params = mICamera
					.getLayoutParam(this);
			textureView.setLayoutParams(layout_params);
			mIndicatorView.setLayoutParams(layout_params);
		} else {
			mDialogUtil.showDialog("打开摄像头失败");
		}
	}

	@Override
	protected void onPause() {
		super.onPause();
		mICamera.closeCamera();
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();
		mDialogUtil.onDestory();
		mDecoder.interrupt();
		try {
			mDecoder.join();
			mDecoder = null;
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		idCardQualityAssessment.release();
		idCardQualityAssessment = null;
	}

	private void doPreview() {
		if (!mHasSurface)
			return;
		
		mICamera.startPreview(textureView.getSurfaceTexture());
	}
	
	private boolean mHasSurface = false;

	@Override
	public void onSurfaceTextureAvailable(SurfaceTexture surface, int width,
			int height) {
		mHasSurface = true;
		doPreview();

		mICamera.actionDetect(this);
	}
	

	@Override
	public void onSurfaceTextureSizeChanged(SurfaceTexture surface, int width,
			int height) {

	}

	@Override
	public boolean onSurfaceTextureDestroyed(SurfaceTexture surface) {
		mHasSurface = false;
		return false;
	}

	@Override
	public void onSurfaceTextureUpdated(SurfaceTexture surface) {

	}

	@Override
	public void onPreviewFrame(final byte[] data, Camera camera) {

		mFrameDataQueue.offer(data);
	}

	private BlockingQueue<byte[]> mFrameDataQueue;

	private class DecodeThread extends Thread {
		boolean mHasSuccess = false;
		int mCount = 0;
		int mTimSum = 0;
		private IDCardQualityResult.IDCardFailedType mLstErrType;

		@Override
		public void run() {
			byte[] imgData = null;
			try {
				while ((imgData = mFrameDataQueue.take()) != null) {
					if (mHasSuccess)
						return;
					int imageWidth = mICamera.cameraWidth;
					int imageHeight = mICamera.cameraHeight;

					if (mIsVertical) {
						imgData = RotaterUtil.rotate(imgData, imageWidth,
								imageHeight, mICamera.getCameraAngle(FaceIDCardScanActivity.this));
						imageWidth = mICamera.cameraHeight;
						imageHeight = mICamera.cameraWidth;
					}

					long start = System.currentTimeMillis();
					RectF rectF = mIndicatorView.getPosition();
					Rect roi = new Rect();
					roi.left = (int) (rectF.left * imageWidth);
					roi.top = (int) (rectF.top * imageHeight);
					roi.right = (int) (rectF.right * imageWidth);
					roi.bottom = (int) (rectF.bottom * imageHeight);
					if (!isEven01(roi.left))
						roi.left = roi.left + 1;
					if (!isEven01(roi.top))
						roi.top = roi.top + 1;
					if (!isEven01(roi.right))
						roi.right = roi.right - 1;
					if (!isEven01(roi.bottom))
						roi.bottom = roi.bottom - 1;

					final IDCardQualityResult result = idCardQualityAssessment
							.getQuality(imgData, imageWidth, imageHeight,
									mSide, roi);

					long end = System.currentTimeMillis();
					mCount++;
					mTimSum += (end - start);
					if (result.isValid()) {
						mHasSuccess = true;
						handleSuccess(result);
						return;
					} else {
						runOnUiThread(new Runnable() {
							@Override
							public void run() {
								List<IDCardQualityResult.IDCardFailedType> failTypes = result.fails;
								if (failTypes != null) {
									StringBuilder stringBuilder = new StringBuilder();
									IDCardQualityResult.IDCardFailedType errType = result.fails
											.get(0);
									if (errType != mLstErrType) {
										Util.showToast(FaceIDCardScanActivity.this,
												Util.errorType2HumanStr(
														result.fails.get(0),
														mSide));
										mLstErrType = errType;
									}
									errorType.setText(stringBuilder.toString());
								}
								if (mCount != 0)
									fps.setText((1000 * mCount / mTimSum)
											+ " FPS");
							}
						});
					}
				}
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}

		private void handleSuccess(IDCardQualityResult result) {
			Intent intent = new Intent();
			intent.putExtra("side",
					mSide == IDCardAttr.IDCardSide.IDCARD_SIDE_FRONT ? 0 : 1);
			intent.putExtra("idcardImg",
					Util.bmp2byteArr(result.croppedImageOfIDCard()));
			if (result.attr.side == IDCardAttr.IDCardSide.IDCARD_SIDE_FRONT) {
				intent.putExtra("portraitImg",
						Util.bmp2byteArr(result.croppedImageOfPortrait()));
			}
			setResult(RESULT_OK, intent);
			Util.cancleToast(FaceIDCardScanActivity.this);
			finish();
		}
	}

	public static void startMe(Context context, IDCardAttr.IDCardSide side) {
		if (side == null || context == null)
			return;
		Intent intent = new Intent(context, FaceIDCardScanActivity.class);
		intent.putExtra("side",
				side == IDCardAttr.IDCardSide.IDCARD_SIDE_FRONT ? 0 : 1);
		context.startActivity(intent);
	}
	
	// 用取余运算
	public boolean isEven01(int num) {
		return num % 2 == 0;
	}
}