package com.shudu.chaoshi;

import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import com.megvii.idcardquality.bean.IDCardAttr;
import com.shudu.chaoshi.util.BitmapUtils;
import com.shudu.chaoshi.util.FileUtil;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

/**
 * Created by binghezhouke on 15-8-12.
 */
public class FaceIDcardResultActivity extends Activity {
	private ImageView mIDCardImageView;
	private ImageView mPortraitImageView;
	private TextView mIDCardSize;
	private TextView mPortraitSize;
	IDCardAttr.IDCardSide mIDCardSide;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.face_activity_result);

		mIDCardSide = getIntent().getIntExtra("side", 0) == 0 ? IDCardAttr.IDCardSide.IDCARD_SIDE_FRONT
				: IDCardAttr.IDCardSide.IDCARD_SIDE_BACK;
		init();
	}

	void init() {
		mIDCardImageView = (ImageView) findViewById(R.id.result_idcard_image);
		mPortraitImageView = (ImageView) findViewById(R.id.result_portrait_image);

		mIDCardSize = (TextView) findViewById(R.id.result_idcard_size);
		mPortraitSize = (TextView) findViewById(R.id.result_portrait_size);
		{
			byte[] idcardImgData = getIntent().getByteArrayExtra("idcardImg");
			final Bitmap idcardBmp = BitmapFactory.decodeByteArray(idcardImgData, 0,
					idcardImgData.length);
			new Thread(
					new Runnable() {
						@Override
						public void run() {
							FileUtil.saveBitmap(idcardBmp);
						}
					}
			).start();

			mIDCardImageView.setImageBitmap(idcardBmp);
			mIDCardSize.setText(idcardBmp.getWidth() + "_"
					+ idcardBmp.getHeight());
		}
		if (mIDCardSide == IDCardAttr.IDCardSide.IDCARD_SIDE_FRONT) {
			byte[] portraitImgData = getIntent().getByteArrayExtra(
					"portraitImg");
			final Bitmap img = BitmapFactory.decodeByteArray(portraitImgData, 0,
					portraitImgData.length);
			new Thread(
					new Runnable() {
						@Override
						public void run() {
							FileUtil.saveBitmap(img);
						}
					}
			).start();
			mPortraitImageView.setImageBitmap(img);
			mPortraitSize.setText(img.getWidth() + "_" + img.getHeight());
		}
	}



}