package com.shudu.chaoshi.activity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Rect;
import android.graphics.RectF;
import android.graphics.SurfaceTexture;
import android.graphics.YuvImage;
import android.hardware.Camera;
import android.hardware.Camera.Parameters;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.util.SparseArray;
import android.view.Surface;
import android.view.TextureView;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.RelativeLayout.LayoutParams;
import android.widget.TextView;

import com.megvii.bankcard.BankCardRecognition;
import com.megvii.bankcard.bean.BankCardResult;
import com.megvii.demo.util.BankCardIndicator;
import com.megvii.demo.util.IDCardIndicator;
import com.megvii.demo.util.RotaterUtil;
import com.megvii.demo.util.Util;
import com.shudu.chaoshi.util.BitmapUtils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;

public class FaceBankCardScanActivity extends Activity implements
		TextureView.SurfaceTextureListener, Camera.PreviewCallback {
	TextureView textureView;
	Camera mCamera;
	BankCardRecognition mRecognition;
	TextView fps;
	TextView debuge;
	TextView numText, pointText, pointAllText;
	BankCardIndicator mIndicatorView;
	private IDCardIndicator mIDCardIndicator;
	ImageView image, image2;

	private DecodeThread mDecoder = null;
	private Camera.Size mBestPreviewSize = null;
	private int Angle;
	private String titleStr;
	private boolean isDebuge, isAllBankCard;
	private Handler mHandler = new Handler();

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(com.megvii.demo.R.layout.bankcardscan_layout);

		initData();
	}

	private void initData() {
		titleStr = getIntent().getStringExtra(Util.KEY_TITLE);
		if (titleStr == null)
			titleStr = "扫描银行卡";
		isDebuge = getIntent().getBooleanExtra(Util.KEY_ISDEBUGE, false);
		isAllBankCard = getIntent().getBooleanExtra(Util.KEY_ISALLCARD, false);

		mRecognition = new BankCardRecognition(this);
		mRecognition.init(Util.readModel(this));

		image = (ImageView) findViewById(com.megvii.demo.R.id.bankcardscan_layout_image);
		image2 = (ImageView) findViewById(com.megvii.demo.R.id.bankcardscan_layout_image2);
		textureView = (TextureView) findViewById(com.megvii.demo.R.id.bankcardscan_layout_surface);
		textureView.setSurfaceTextureListener(this);
		textureView.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				autoFocus();
			}
		});
		TextView title = (TextView) findViewById(com.megvii.demo.R.id.resutl_layout_title);
		title.setText(titleStr);
		findViewById(com.megvii.demo.R.id.title_layout_returnRel).setOnClickListener(
				new OnClickListener() {
					@Override
					public void onClick(View v) {
						FaceBankCardScanActivity.this.finish();
					}
				});
		fps = (TextView) findViewById(com.megvii.demo.R.id.bankcardscan_layout_fps);
		debuge = (TextView) findViewById(com.megvii.demo.R.id.bankcardscan_layout_debuge);
		numText = (TextView) findViewById(com.megvii.demo.R.id.bankcardscan_layout_numText);
		pointText = (TextView) findViewById(com.megvii.demo.R.id.bankcardscan_layout_pointText);
		pointAllText = (TextView) findViewById(com.megvii.demo.R.id.bankcardscan_layout_pointAllText);

		if (isDebuge) {
			fps.setVisibility(View.VISIBLE);
			debuge.setVisibility(View.VISIBLE);
		} else {
			fps.setVisibility(View.GONE);
			debuge.setVisibility(View.GONE);
		}

		mFrameDataQueue = new LinkedBlockingDeque<byte[]>(1);
		mIndicatorView = (BankCardIndicator) findViewById(com.megvii.demo.R.id.bankcardscan_layout_indicator);
		mIDCardIndicator = (IDCardIndicator) findViewById(com.megvii.demo.R.id.bankcardscan_layout_idcardIndicator);
		if (isAllBankCard) {
			pointText.setVisibility(View.INVISIBLE);
			pointAllText.setVisibility(View.VISIBLE);
			mIDCardIndicator.setVisibility(View.VISIBLE);
			mIndicatorView.setVisibility(View.GONE);
		} else {
			pointText.setVisibility(View.VISIBLE);
			pointAllText.setVisibility(View.INVISIBLE);
			mIndicatorView.setVisibility(View.VISIBLE);
			mIDCardIndicator.setVisibility(View.GONE);
		}
	}

	private void autoFocus() {
		if (mCamera != null) {
			mCamera.cancelAutoFocus();
			Parameters parameters = mCamera.getParameters();
			parameters.setFocusMode(Parameters.FOCUS_MODE_AUTO);
			mCamera.setParameters(parameters);
			mCamera.autoFocus(null);
		}
	}

	@Override
	protected void onResume() {
		super.onResume();
		mHasSuccess = false;
		nums.clear();
		mDecoder = new DecodeThread();
		mDecoder.start();

		// mHandler.postDelayed(new Runnable() {
		// @Override
		// public void run() {
		// autoFocus();
		// }
		// }, 1500);
		mCamera = Camera.open(0);
		setAndLayout();
	}

	private void setAndLayout() {
		if (mCamera == null)
			return;

		int screenWidth = getWindowManager().getDefaultDisplay().getWidth();
		int screenHeight = getWindowManager().getDefaultDisplay().getHeight();

		Parameters parameters = mCamera.getParameters();
		mBestPreviewSize = Util.getNearestRatioSize(parameters, screenWidth,
				screenHeight);
		int cameraWidth = mBestPreviewSize.width;
		int cameraHeight = mBestPreviewSize.height;
		parameters.setPreviewSize(cameraWidth, cameraHeight);
		List<String> focusModes = parameters.getSupportedFocusModes();
		if (focusModes.contains(Parameters.FOCUS_MODE_CONTINUOUS_VIDEO)) {
			parameters
					.setFocusMode(Parameters.FOCUS_MODE_CONTINUOUS_VIDEO);
		}

		// Rect rect = new Rect();
		// rect.left = (int) ((mIndicatorView.CONTENT_RATIO * -1000) /
		// mIndicatorView.IDCARD_RATIO);
		// rect.top = (int) (mIndicatorView.CONTENT_RATIO * -1000);
		// rect.right = (int) ((mIndicatorView.CONTENT_RATIO * 1000) /
		// mIndicatorView.IDCARD_RATIO);
		// rect.bottom = (int) (mIndicatorView.CONTENT_RATIO * 1000);
		// Camera.Area area = new Camera.Area(rect, 1000);
		// ArrayList<Area> focusAreas = new ArrayList<Area>();
		// focusAreas.add(area);
		// parameters.setFocusAreas(focusAreas);
		Angle = getCameraAngle();
		mCamera.setDisplayOrientation(Angle);
		mCamera.setParameters(parameters);

		float scale = Math.min(screenWidth * 1.0f / mBestPreviewSize.height,
				screenHeight * 1.0f / mBestPreviewSize.width);
		int layout_width = (int) (scale * mBestPreviewSize.height);
		int layout_height = (int) (scale * mBestPreviewSize.width);

		LayoutParams layout_params = new LayoutParams(
				layout_width, layout_height);
		layout_params.addRule(RelativeLayout.CENTER_IN_PARENT);
		textureView.setLayoutParams(layout_params);
		mIndicatorView.setLayoutParams(layout_params);
		mIDCardIndicator.setLayoutParams(layout_params);
	}

	private void startPreview() {
		if (mHasSurface && mCamera != null) {
			try {
				mCamera.setPreviewTexture(textureView.getSurfaceTexture());
			} catch (IOException e) {
				e.printStackTrace();
			}
			mCamera.setPreviewCallback(this);
			mCamera.startPreview();
		}
	}

	@Override
	protected void onPause() {
		super.onPause();
		mHasSuccess = true;
		nums_count.clear();
		nums_best.clear();
		nums_conf.clear();
		if (mCamera != null) {
			mCamera.setPreviewCallback(null);
			mCamera.stopPreview();
			mCamera.release();
			mCamera = null;
		}
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();
		mDecoder.interrupt();
		try {
			mDecoder.join();
			mDecoder = null;
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		mRecognition.release();
		mRecognition = null;
		mIndicatorView.destory();
	}

	private boolean mHasSurface = false;

	@Override
	public void onSurfaceTextureAvailable(SurfaceTexture surface, int width,
			int height) {
		mHasSurface = true;
		startPreview();
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

	ArrayList<String> nums = new ArrayList<String>();
	SparseArray<float[][]> nums_count = new SparseArray<float[][]>();
	SparseArray<float[][]> nums_best = new SparseArray<float[][]>();
	SparseArray<Float> nums_conf = new SparseArray<Float>();
	private BlockingQueue<byte[]> mFrameDataQueue;
	private boolean mHasSuccess = false;
	private int listSum = 6, listSameNum = 3;// 容器最大数和取值数量
	private int frameIndex = 15;// 分数阈值
	private float mconfidence = 0.8f, maxConfidence = 0.99f;

	private class DecodeThread extends Thread {
		@Override
		public void run() {
			byte[] imgData = null;
			try {
				while ((imgData = mFrameDataQueue.take()) != null) {
					if (mHasSuccess)
						return;
					int imageWidth = mBestPreviewSize.width;
					int imageHeight = mBestPreviewSize.height;

					imgData = RotaterUtil.rotate(imgData, imageWidth,
							imageHeight, Angle);
					imageWidth = mBestPreviewSize.height;
					imageHeight = mBestPreviewSize.width;

					RectF rectF = mIDCardIndicator.getBankCardPosition();
					if (!isAllBankCard)
						rectF = mIndicatorView.getPosition();
					Rect roi = new Rect();
					Log.w("ceshi", "rectF===" + rectF);
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
					Log.w("ceshi", "roi===" + roi + ", " + imageWidth + ", "
							+ imageHeight);
					final long startTime = System.currentTimeMillis();
					BankCardResult bankCardResult = mRecognition
							.recognizeNV21Data(imgData, imageWidth,
									imageHeight, roi);
					final long endTime = System.currentTimeMillis();

					final String num = bankCardResult.bankCardNumber;
					final float confidence = bankCardResult.confidence;

					if (isDebuge) {
						getBitmapFilePath(imgData, imageWidth, imageHeight, roi);
					}

					runOnUiThread(new Runnable() {
						@Override
						public void run() {
							if (confidence > mconfidence) {
								numText.setVisibility(View.VISIBLE);
								pointText.setVisibility(View.INVISIBLE);
								numText.setText(num);
							}
						}
					});

					if (confidence >= maxConfidence) {
						getBranCardValue(
								num,
								confidence + "",
								getBitmapFilePath(imgData, imageWidth,
										imageHeight, roi));
						return;
					}
					// Log.w("ceshi", "confidence===" + confidence);

					if (confidence > mconfidence) {
						nums.add(num);
						final String bankNum = getNum(nums);
						// Log.w("ceshi", "bankNum===" + bankNum);
						if (bankNum == null) {
							if (nums.size() == listSum)
								nums.remove(0);
						} else {
							getBranCardValue(
									bankNum,
									confidence + "",
									getBitmapFilePath(imgData, imageWidth,
											imageHeight, roi));
							return;
						}
						// / code by caima
						// // calc on turn
						int len = num.length();
						if (nums_count.get(len) == null) {
							nums_count.put(len, new float[len][11]);
							nums_best.put(len, new float[len][11]);
							nums_conf.put(len, 0f);
						}
						nums_conf.put(len, nums_conf.get(len) + confidence);
						for (int i = 0; i < len; ++i) {
							int u = 10;
							if (num.charAt(i) != ' ')
								u = num.charAt(i) - '0';
							nums_count.get(len)[i][u] += Math.pow(
									bankCardResult.characters[i].confidence, 3);
							if (nums_best.get(len)[i][u] < confidence)
								nums_best.get(len)[i][u] = confidence;
						}
						// // find best
						int best_len = 0;
						for (int i = 0; i < nums_conf.size(); ++i) {
							if (best_len == 0
									|| nums_conf.get(nums_conf.keyAt(i)) > nums_conf
											.get(best_len))
								best_len = nums_conf.keyAt(i);
						}
						Log.w("ceshi", "best_len: " + best_len
								+ ", best_conf: " + nums_conf.get(best_len));
						if (nums_conf.get(best_len) > frameIndex) {
							StringBuilder sb = new StringBuilder();
							float sp_conf = 0f;
							for (int i = 0; i < best_len; ++i) {
								int best_value = 0;
								for (int j = 1; j <= 10; ++j)
									if (nums_count.get(best_len)[i][j] > nums_count
											.get(best_len)[i][best_value])
										best_value = j;
								sp_conf += nums_best.get(best_len)[i][best_value];
								if (best_value == 10)
									sb.append(' ');
								else
									sb.append(best_value);
							}
							sp_conf /= best_len;
							String bankCardNum = sb.toString();
							Log.w("ceshi", "sp-bankcard (" + sp_conf + ") : "
									+ sb.toString());
							getBranCardValue(
									bankCardNum,
									sp_conf + "",
									getBitmapFilePath(imgData, imageWidth,
											imageHeight, roi));
							return;
						}
						// / end for code
					}

					runOnUiThread(new Runnable() {
						@Override
						public void run() {
							debuge.setText("num: " + num + "\nconfidence: "
									+ confidence + "\nrate: "
									+ (endTime - startTime));
							fps.setText("fps: " + 1000
									/ ((endTime - startTime) * 1.0f));
						}
					});
				}
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

	private String getBitmapFilePath(byte[] data, int width, int hight,
			Rect rect) {
		if (mCamera == null)
			return null;
		YuvImage yuvImage = new YuvImage(data, mCamera.getParameters()
				.getPreviewFormat(), width, hight, null);
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		yuvImage.compressToJpeg(rect, 80, byteArrayOutputStream);
		byte[] jpegData = byteArrayOutputStream.toByteArray();
		// 获取照相后的bitmap
		final Bitmap tmpBitmap = BitmapFactory.decodeByteArray(jpegData, 0,
				jpegData.length);
		String filePath = Util.saveBitmap(this, tmpBitmap);
		if (isDebuge)
			runOnUiThread(new Runnable() {
				@Override
				public void run() {
					ImageView image = (ImageView) findViewById(com.megvii.demo.R.id.bankcard_layout_image);
					image.setImageBitmap(tmpBitmap);
				}
			});
		return filePath;
	}

	private void getBranCardValue(final String bankNum, final String confidenc,
			final String filePath) {
		onPause();
		mHandler.postDelayed(new Runnable() {
			@Override
			public void run() {
//				Intent intent = new Intent(FaceBankCardScanActivity.this,
//						ResultActivity.class);
                Intent intent = new Intent();
                intent.putExtra("bankNum", bankNum);
//				intent.putExtra("confidence", confidenc);
                try {
                    intent.putExtra("bankcardBase64", BitmapUtils.getImageByPathNew(filePath));
                } catch (Exception e) {
                    e.printStackTrace();
                }
                intent.putExtra(Util.KEY_ISDEBUGE, isDebuge);
                intent.putExtra(Util.KEY_TITLE, "银行卡识别");
                setResult(RESULT_OK, intent);
//				startActivityForResult(intent, INTO_RESULT_PAGE);
				finish();
			}
		}, 200);
	}

	private static final int INTO_RESULT_PAGE = 100;

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
		if (requestCode == INTO_RESULT_PAGE && resultCode == RESULT_OK) {
			Intent intent = new Intent();
			intent.putExtra("filePath", data.getStringExtra("filePath"));
			intent.putExtra("bankNum", data.getStringExtra("bankNum"));
			intent.putExtra("confidence", data.getStringExtra("confidence"));
			setResult(RESULT_OK, intent);
			finish();
		}
	}

	private String getNum(ArrayList<String> nums) {
		if (nums == null)
			return null;

		HashMap<String, Integer> map = new HashMap<String, Integer>();

		int index = 0;
		for (int i = 0; i < nums.size(); i++) {
			String num = nums.get(i);
			if (map.get(num) != null) {
				map.put(num, map.get(num) + 1);
			} else {
				index++;
				if (index >= (listSum - listSameNum + 1)) {
					return null;
				}
				map.put(num, 1);
			}
		}

		for (Entry<String, Integer> enty : map.entrySet()) {
			String numStr = enty.getKey(); // 返回与此项对应的键
			int numTimes = enty.getValue(); // 返回与此项对应的值
			if (numTimes >= listSameNum) {
				return numStr;
			}
		}

		return null;
	}

	// 用取余运算
	public boolean isEven01(int num) {
		if (num % 2 == 0) {
			return true;
		} else {
			return false;
		}
	}

	public static void startMe(Context context) {
		if (context == null)
			return;
		Intent intent = new Intent(context, FaceBankCardScanActivity.class);
		context.startActivity(intent);
	}

	/**
	 * 获取照相机旋转角度
	 */
	public int getCameraAngle() {
		int rotateAngle = 90;
		Camera.CameraInfo info = new Camera.CameraInfo();
		Camera.getCameraInfo(0, info);
		int rotation = getWindowManager().getDefaultDisplay().getRotation();
		int degrees = 0;
		switch (rotation) {
		case Surface.ROTATION_0:
			degrees = 0;
			break;
		case Surface.ROTATION_90:
			degrees = 90;
			break;
		case Surface.ROTATION_180:
			degrees = 180;
			break;
		case Surface.ROTATION_270:
			degrees = 270;
			break;
		}

		if (info.facing == Camera.CameraInfo.CAMERA_FACING_FRONT) {
			rotateAngle = (info.orientation + degrees) % 360;
			rotateAngle = (360 - rotateAngle) % 360; // compensate the mirror
		} else { // back-facing
			rotateAngle = (info.orientation - degrees + 360) % 360;
		}
		return rotateAngle;
	}
}