package com.megvii.demo.util;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.*;
import android.os.Handler;
import android.util.AttributeSet;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.View;

/**
 * Created by binghezhouke on 15-8-12.
 */
public class BankCardIndicator extends View {
	// 4.08 : 1.08
	// confidence 大于0.7
	// 取六帧大于0.7的，再从这六帧中取出同一个频率最高的号码，这个号码的次数要大于3
	// mBestPreviewSize.width===1280, mBestPreviewSize.height===720,
	// roi===Rect(194, 72 - 1086, 648)
	// mBestPreviewSize.width===1280, mBestPreviewSize.height===720,
	// roi===Rect(128, 225 - 1152, 495)

	private Rect mDrawRect = null;
	private Rect mShowDrawRect = null;
	private Paint mDrawPaint = null;
	public float IDCARD_RATIO = 3.78f;// 矩形框的宽和线框的高的比 宽/高
	public float CONTENT_RATIO = 0.95f;// 矩形框的宽和屏幕的比 宽/屏幕宽
	// private float IDCARD_RATIO = 1.55f;
	// private float CONTENT_RATIO = 0.8f;
	private Rect mTmpRect = null;
	private String textStr = "请将银行卡号置于扫描框内";
	private float textSize, numSize;
	private float textX, textY, numX, numY;
	private int lineColor = 0XFF1386CE;
	private int finderColor = 0XFF00D3FF;
	private String numStr = "";
	private int width, height;
	IRunnable mRunnable;
	Handler mHandler = new Handler();
	private Context mContext;

	private void init(Context context) {
		this.mContext = context;
		mDrawRect = new Rect();
		mShowDrawRect = new Rect();
		mTmpRect = new Rect();
		mDrawPaint = new Paint();
		mDrawPaint.setDither(true);
		mDrawPaint.setAntiAlias(true);
		mDrawPaint.setStrokeWidth(10);
		mDrawPaint.setStyle(Paint.Style.STROKE);
		mDrawPaint.setColor(lineColor);

		mRunnable = new IRunnable();
		mHandler.postDelayed(mRunnable, 250);
	}

	public BankCardIndicator(Context context) {
		super(context);
		init(context);
	}

	public BankCardIndicator(Context context, AttributeSet attrs) {
		super(context, attrs);
		init(context);
	}

	public BankCardIndicator(Context context, AttributeSet attrs,
			int defStyleAttr) {
		super(context, attrs, defStyleAttr);
		init(context);
	}

	public void setNumStr(String numStr) {
		this.numStr = numStr;
		this.postInvalidate();
	}

	@Override
	protected void onLayout(boolean changed, int left, int top, int right,
			int bottom) {
		super.onLayout(changed, left, top, right, bottom);
		width = right - left;
		height = bottom - top;

//		int cX = (left + right) >> 1;//算出屏幕的中心点
//		int cY = (top + bottom) >> 1;
		int centerX = width >> 1; //算出控件的中心点
		int centerY = height >> 1;
		int content_width = 0;
		int content_height = 0;
		if (width / (float) (height) < IDCARD_RATIO) // the view is to high
		{
			content_width = (int) (width * CONTENT_RATIO);
			content_height = (int) (content_width / IDCARD_RATIO);
		} else { // the view is too wide
			content_height = (int) (height * CONTENT_RATIO);
			content_width = (int) (content_height * IDCARD_RATIO);
		}

		mDrawRect.left = centerX - content_width / 2;
		mDrawRect.top = centerY - content_height / 2;
		mDrawRect.right = centerX + content_width / 2;
		Log.w("ceshi", "mDrawRect.right===" + mDrawRect.right + ", centerX==" + centerX + ", " + content_width / 2);
		mDrawRect.bottom = centerY + content_height / 2;

		mShowDrawRect.left = centerX - content_width / 2;
		mShowDrawRect.top = (int) (centerY - content_height / 2 * 0.6f);
		mShowDrawRect.right = centerX + content_width / 2;
		mShowDrawRect.bottom = (int) (centerY + content_height / 2 * 0.6f);
		textSize = width / 15.0f;
		numSize = width / 16.0f;
		textX = (width / 2.0f) - (textSize * textStr.length() / 2.0f)
				+ (textStr.length() * 1.5f);
		// Log.d("ceshi", "onLayout: width===" + width + ", " + height +
		// ", textsize===" + textSize + ", " + textX);
	}

	@Override
	protected void onDraw(Canvas canvas) {
		// background
		mDrawPaint.setStyle(Paint.Style.FILL);
		mDrawPaint.setColor(0xa8000000);

		// top
		mTmpRect.set(0, 0, getWidth(), mShowDrawRect.top);
		canvas.drawRect(mTmpRect, mDrawPaint);
		// bottom
		mTmpRect.set(0, mShowDrawRect.bottom, getWidth(), getHeight());
		canvas.drawRect(mTmpRect, mDrawPaint);
		// left
		mTmpRect.set(0, mShowDrawRect.top, mShowDrawRect.left,
				mShowDrawRect.bottom);
		canvas.drawRect(mTmpRect, mDrawPaint);
		// right
		mTmpRect.set(mShowDrawRect.right, mShowDrawRect.top, getWidth(),
				mShowDrawRect.bottom);
		canvas.drawRect(mTmpRect, mDrawPaint);

		drawViewfinder(canvas);
		drawScanLine(canvas);
	}

	/**
	 * 画角
	 */
	private void drawViewfinder(Canvas canvas) {
		// rect
		mDrawPaint.setStyle(Paint.Style.STROKE);
		mDrawPaint.setColor(finderColor);
		mDrawPaint.setStrokeWidth(2);
		int length = mShowDrawRect.height() / 6;
		// left top
		canvas.drawLine(mShowDrawRect.left, mShowDrawRect.top,
				mShowDrawRect.left + length, mShowDrawRect.top, mDrawPaint);
		canvas.drawLine(mShowDrawRect.left, mShowDrawRect.top,
				mShowDrawRect.left, mShowDrawRect.top + length, mDrawPaint);

		// right top
		canvas.drawLine(mShowDrawRect.right, mShowDrawRect.top,
				mShowDrawRect.right - length, mShowDrawRect.top, mDrawPaint);
		canvas.drawLine(mShowDrawRect.right, mShowDrawRect.top,
				mShowDrawRect.right, mShowDrawRect.top + length, mDrawPaint);

		// left bottom
		canvas.drawLine(mShowDrawRect.left, mShowDrawRect.bottom,
				mShowDrawRect.left + length, mShowDrawRect.bottom, mDrawPaint);
		canvas.drawLine(mShowDrawRect.left, mShowDrawRect.bottom,
				mShowDrawRect.left, mShowDrawRect.bottom - length, mDrawPaint);

		// right bottom
		canvas.drawLine(mShowDrawRect.right, mShowDrawRect.bottom,
				mShowDrawRect.right - length, mShowDrawRect.bottom, mDrawPaint);
		canvas.drawLine(mShowDrawRect.right, mShowDrawRect.bottom,
				mShowDrawRect.right, mShowDrawRect.bottom - length, mDrawPaint);

		// 两个角中间的线
		mDrawPaint.setColor(0X20FFFFFF);
		// top
		canvas.drawLine(mShowDrawRect.left + length, mShowDrawRect.top,
				mShowDrawRect.right - length, mShowDrawRect.top, mDrawPaint);
		// left
		canvas.drawLine(mShowDrawRect.left, mShowDrawRect.top + length,
				mShowDrawRect.left, mShowDrawRect.bottom - length, mDrawPaint);
		// right
		canvas.drawLine(mShowDrawRect.right, mShowDrawRect.top + length,
				mShowDrawRect.right, mShowDrawRect.bottom - length, mDrawPaint);
		// bottom
		canvas.drawLine(mShowDrawRect.left + length, mShowDrawRect.bottom,
				mShowDrawRect.right - length, mShowDrawRect.bottom, mDrawPaint);

//		mDrawPaint.setStyle(Paint.Style.FILL);
//		mDrawPaint.setTextSize(textSize);
//		mDrawPaint.setColor(0XFFFFFFFF);
//		canvas.drawText(textStr, textX, (mShowDrawRect.bottom + textSize * 2),
//				mDrawPaint);
		// numX = (width / 2.0f) - (textSize * textStr.length() / 2.0f) +
		// (textStr.length() * 1.5f);
		// mDrawPaint.setTextSize(numSize);
		// canvas.drawText(numStr, textX, mShowDrawRect.top - 10, mDrawPaint);
	}

	private boolean isAnim = true;

	class IRunnable implements Runnable {
		@Override
		public void run() {
			BankCardIndicator.this.invalidate();
			if (isAnim)
				mHandler.postDelayed(mRunnable, 250);
		}
	}

	int alphaIndex = 0;

	/**
	 * 画中间那条扫描线
	 */
	private void drawScanLine(Canvas canvas) {
		mDrawPaint.setColor(lineColor);
		alphaIndex++;
		mDrawPaint.setAlpha(255 / getAlphaIndex(alphaIndex));
		if (alphaIndex == 11) {
			alphaIndex = 0;
		}

		mDrawPaint.setStyle(Paint.Style.STROKE);

		mDrawPaint.setStrokeWidth(3);
		// left top
		canvas.drawLine(mShowDrawRect.left + 10,
				(mShowDrawRect.top + mShowDrawRect.bottom) / 2,
				mShowDrawRect.right - 10,
				(mShowDrawRect.top + mShowDrawRect.bottom) / 2, mDrawPaint);
	}

	private int getAlphaIndex(int i) {
		if (i <= 6) {
			return i;
		} else {
			return 12 - i;
		}
	}

	public RectF getPosition() {
		RectF rectF = new RectF();
		rectF.left = mDrawRect.left / (float) getWidth();
		rectF.top = mDrawRect.top / (float) getHeight();
		rectF.right = mDrawRect.right / (float) getWidth();
		rectF.bottom = mDrawRect.bottom / (float) getHeight();
		return rectF;
	}

	public void destory() {
		isAnim = false;
		mHandler.removeCallbacks(mRunnable);
	}
}