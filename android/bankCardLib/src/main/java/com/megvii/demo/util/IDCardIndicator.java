package com.megvii.demo.util;

import android.content.Context;
import android.graphics.*;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;

/**
 * Created by binghezhouke on 15-8-12.
 */
public class IDCardIndicator extends View {
	//银行卡字符高度与图像高度的比例为： 24 : 108
	private Rect mDrawRect = null;
	private Rect mBankCardDrawRect = null;
	private Rect mBankCardShowDrawRect = null;
	private Paint mDrawPaint = null;
	private float IDCARD_NUMRATIO = 0.22f;
	private float IDCARD_RATIO = 1.55f;
	private float CONTENT_RATIO = 0.95f;
	private Rect mTmpRect = null;

	private void init() {
		mDrawRect = new Rect();
		mBankCardDrawRect = new Rect();
		mBankCardShowDrawRect = new Rect();
		mTmpRect = new Rect();
		mDrawPaint = new Paint();
		mDrawPaint.setDither(true);
		mDrawPaint.setAntiAlias(true);
		mDrawPaint.setStrokeWidth(10);
		mDrawPaint.setStyle(Paint.Style.STROKE);
		mDrawPaint.setColor(0xff0000ff);
	}

	public IDCardIndicator(Context context) {
		super(context);
		init();
	}

	public IDCardIndicator(Context context, AttributeSet attrs) {
		super(context, attrs);
		init();
	}

	public IDCardIndicator(Context context, AttributeSet attrs, int defStyleAttr) {
		super(context, attrs, defStyleAttr);
		init();
	}

	@Override
	protected void onLayout(boolean changed, int left, int top, int right,
							int bottom) {
		super.onLayout(changed, left, top, right, bottom);
		int width = right - left;
		int height = bottom - top;

		int centerX = width >> 1;
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
		mDrawRect.bottom = centerY + content_height / 2;

		//切得银行卡号高度
		mBankCardDrawRect.left = centerX - content_width / 2;
		mBankCardDrawRect.right = centerX + content_width / 2;
		int height_1 = (int) ((mBankCardDrawRect.right - mBankCardDrawRect.left) / 3.78f);
		//显示得银行卡号高度
		float numHeight = IDCARD_NUMRATIO * height_1;

		float height_value = (height_1 - numHeight) / 2;

		mBankCardDrawRect.top = centerY - height_1 / 4;
		mBankCardDrawRect.bottom = centerY + height_1 - height_1 / 4;

		Log.w("ceshi", "numHeight===" + numHeight + ", content_height===" + content_height);
		mBankCardShowDrawRect.left = mBankCardDrawRect.left;
		mBankCardShowDrawRect.top = mBankCardDrawRect.top + (int)height_value;
		mBankCardShowDrawRect.right = mBankCardDrawRect.right;
		mBankCardShowDrawRect.bottom = mBankCardDrawRect.bottom - (int)height_value;

		// mDrawRect = mBankCardDrawRect;
		Log.w("ceshi", "idcardindicator++++mDrawRect===" + mDrawRect);
	}

	@Override
	protected void onDraw(Canvas canvas) {

		// background
		mDrawPaint.setStyle(Paint.Style.FILL);
		mDrawPaint.setColor(0xa0000000);

		onDraw_1(canvas, mDrawRect);
		//onDraw_1(canvas, mBankCardShowDrawRect);
	}

	private void onDraw_1(Canvas canvas, Rect drawRect) {
		// top
		mTmpRect.set(0, 0, getWidth(), drawRect.top);
		canvas.drawRect(mTmpRect, mDrawPaint);
		// bottom
		mTmpRect.set(0, drawRect.bottom, getWidth(), getHeight());
		canvas.drawRect(mTmpRect, mDrawPaint);
		// left
		mTmpRect.set(0, drawRect.top, drawRect.left, drawRect.bottom);
		canvas.drawRect(mTmpRect, mDrawPaint);
		// right
		mTmpRect.set(drawRect.right, drawRect.top, getWidth(),
				drawRect.bottom);
		canvas.drawRect(mTmpRect, mDrawPaint);

		drawViewfinder(canvas, drawRect);
	}

	private void drawViewfinder(Canvas canvas, Rect drawRect) {
		int finderColor = 0XFF00D3FF;
		mDrawPaint.setStyle(Paint.Style.STROKE);
		mDrawPaint.setColor(finderColor);
		mDrawPaint.setStrokeWidth(2);
		int length = drawRect.height() / 16;
		// left top
		canvas.drawLine(drawRect.left, drawRect.top, drawRect.left + length,
				drawRect.top, mDrawPaint);
		canvas.drawLine(drawRect.left, drawRect.top, drawRect.left,
				drawRect.top + length, mDrawPaint);

		// right top
		canvas.drawLine(drawRect.right, drawRect.top, drawRect.right
				- length, drawRect.top, mDrawPaint);
		canvas.drawLine(drawRect.right, drawRect.top, drawRect.right,
				drawRect.top + length, mDrawPaint);

		// left bottom
		canvas.drawLine(drawRect.left, drawRect.bottom, drawRect.left
				+ length, drawRect.bottom, mDrawPaint);
		canvas.drawLine(drawRect.left, drawRect.bottom, drawRect.left,
				drawRect.bottom - length, mDrawPaint);

		// right bottom
		canvas.drawLine(drawRect.right, drawRect.bottom, drawRect.right
				- length, drawRect.bottom, mDrawPaint);
		canvas.drawLine(drawRect.right, drawRect.bottom, drawRect.right,
				drawRect.bottom - length, mDrawPaint);

		// 两个角中间的线
		mDrawPaint.setColor(0X20FFFFFF);
		// top
		canvas.drawLine(drawRect.left + length, drawRect.top, drawRect.right
				- length, drawRect.top, mDrawPaint);
		// left
		canvas.drawLine(drawRect.left, drawRect.top + length, drawRect.left,
				drawRect.bottom - length, mDrawPaint);
		// right
		canvas.drawLine(drawRect.right, drawRect.top + length,
				drawRect.right, drawRect.bottom - length, mDrawPaint);
		// bottom
		canvas.drawLine(drawRect.left + length, drawRect.bottom,
				drawRect.right - length, drawRect.bottom, mDrawPaint);
		mDrawPaint.setColor(0Xa0FFFFFF);
		// centerTop
		canvas.drawLine(mBankCardShowDrawRect.left, mBankCardShowDrawRect.top, mBankCardShowDrawRect.right, mBankCardShowDrawRect.top, mDrawPaint);
		// centerbottom
		canvas.drawLine(mBankCardShowDrawRect.left, mBankCardShowDrawRect.bottom,
				mBankCardShowDrawRect.right, mBankCardShowDrawRect.bottom, mDrawPaint);

	}

	public RectF getPosition() {
		Log.w("ceshi", "getPosition++++mDrawRect===" + mDrawRect);
		RectF rectF = new RectF();
		rectF.left = mDrawRect.left / (float) getWidth();
		rectF.top = mDrawRect.top / (float) getHeight();
		rectF.right = mDrawRect.right / (float) getWidth();
		rectF.bottom = mDrawRect.bottom / (float) getHeight();
		return rectF;
	}

	public RectF getBankCardPosition() {
		RectF rectF = new RectF();
		rectF.left = mBankCardDrawRect.left / (float) getWidth();
		rectF.top = mBankCardDrawRect.top / (float) getHeight();
		rectF.right = mBankCardDrawRect.right / (float) getWidth();
		rectF.bottom = mBankCardDrawRect.bottom / (float) getHeight();
		return rectF;
	}
}
