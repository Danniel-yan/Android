package com.megvii.idcardlib.util;

import android.content.Context;
import android.graphics.*;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;

/**
 * Created by binghezhouke on 15-8-12.
 */
public class IDCardIndicator extends View {
	private Rect mDrawRect = null;
	private Paint mDrawPaint = null;
	private float IDCARD_RATIO = 1.55f;
	private float CONTENT_RATIO = 0.95f;
	private Rect mTmpRect = null;

	private void init() {
		mDrawRect = new Rect();
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

	}

	@Override
	protected void onDraw(Canvas canvas) {

		// background
		mDrawPaint.setStyle(Paint.Style.FILL);
		mDrawPaint.setColor(0xa0000000);

		// top
		mTmpRect.set(0, 0, getWidth(), mDrawRect.top);
		canvas.drawRect(mTmpRect, mDrawPaint);
		// bottom
		mTmpRect.set(0, mDrawRect.bottom, getWidth(), getHeight());
		canvas.drawRect(mTmpRect, mDrawPaint);
		// left
		mTmpRect.set(0, mDrawRect.top, mDrawRect.left, mDrawRect.bottom);
		canvas.drawRect(mTmpRect, mDrawPaint);
		// right
		mTmpRect.set(mDrawRect.right, mDrawRect.top, getWidth(),
				mDrawRect.bottom);
		canvas.drawRect(mTmpRect, mDrawPaint);

		drawViewfinder(canvas);
	}

	private void drawViewfinder(Canvas canvas) {
		int finderColor = 0XFF00D3FF;
		mDrawPaint.setStyle(Paint.Style.STROKE);
		mDrawPaint.setColor(finderColor);
		mDrawPaint.setStrokeWidth(2);
		int length = mDrawRect.height() / 16;
		// left top
		canvas.drawLine(mDrawRect.left, mDrawRect.top, mDrawRect.left + length,
				mDrawRect.top, mDrawPaint);
		canvas.drawLine(mDrawRect.left, mDrawRect.top, mDrawRect.left,
				mDrawRect.top + length, mDrawPaint);

		// right top
		canvas.drawLine(mDrawRect.right, mDrawRect.top, mDrawRect.right
				- length, mDrawRect.top, mDrawPaint);
		canvas.drawLine(mDrawRect.right, mDrawRect.top, mDrawRect.right,
				mDrawRect.top + length, mDrawPaint);

		// left bottom
		canvas.drawLine(mDrawRect.left, mDrawRect.bottom, mDrawRect.left
				+ length, mDrawRect.bottom, mDrawPaint);
		canvas.drawLine(mDrawRect.left, mDrawRect.bottom, mDrawRect.left,
				mDrawRect.bottom - length, mDrawPaint);

		// right bottom
		canvas.drawLine(mDrawRect.right, mDrawRect.bottom, mDrawRect.right
				- length, mDrawRect.bottom, mDrawPaint);
		canvas.drawLine(mDrawRect.right, mDrawRect.bottom, mDrawRect.right,
				mDrawRect.bottom - length, mDrawPaint);

		// 两个角中间的线
		mDrawPaint.setColor(0X20FFFFFF);
		// top
		canvas.drawLine(mDrawRect.left + length, mDrawRect.top, mDrawRect.right
				- length, mDrawRect.top, mDrawPaint);
		// left
		canvas.drawLine(mDrawRect.left, mDrawRect.top + length, mDrawRect.left,
				mDrawRect.bottom - length, mDrawPaint);
		// right
		canvas.drawLine(mDrawRect.right, mDrawRect.top + length,
				mDrawRect.right, mDrawRect.bottom - length, mDrawPaint);
		// bottom
		canvas.drawLine(mDrawRect.left + length, mDrawRect.bottom,
				mDrawRect.right - length, mDrawRect.bottom, mDrawPaint);

	}

	public RectF getPosition() {
		RectF rectF = new RectF();
		rectF.left = mDrawRect.left / (float) getWidth();
		rectF.top = mDrawRect.top / (float) getHeight();
		rectF.right = mDrawRect.right / (float) getWidth();
		rectF.bottom = mDrawRect.bottom / (float) getHeight();
		return rectF;
	}
}
