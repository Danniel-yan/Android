package com.shudu.chaoshi;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.megvii.bankcard.BankCardRecognition;
import com.megvii.demo.util.SharedUtil;
import com.megvii.demo.util.Util;
import com.shudu.chaoshi.util.FileUtil;

/**
 * Created by binghezhouke on 15-8-12.
 */
public class FaceBankCardInitActivity extends Activity implements View.OnClickListener {

	private String uuid;
	private LinearLayout btnLinear, barLinear;
	private TextView WarrantyText;
	private ProgressBar WarrantyBar;
	private Button againWarrantyBtn, sureBtn;
	private ImageView cardImage;
	private EditText cardNum;
	private TextView confidenceText, versionText;
	private SharedUtil mSharedUtil;
	private Button debugeBtn, allCardBtn;
	private boolean isDebuge, isAllCard;
	private static final String KEY_ISDEBUGE = "KEY_ISDEBUGE";
	private static final String KEY_ISALLCARD = "KEY_ISALLCARD";

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_loading);
		init();
		isDebuge();
		isAllCard();
		// netWorkWarranty();
	}

	private void init() {
		mSharedUtil = new SharedUtil(this);
		isDebuge = mSharedUtil.getBooleanValueByKey(KEY_ISDEBUGE);
		isAllCard = mSharedUtil.getBooleanValueByKey(KEY_ISALLCARD);
		Log.w("ceshi", "isAllCard1111111===" + isAllCard);
		uuid = Util.getUUIDString(this);

		debugeBtn = (Button) findViewById(R.id.loading_layout_debugeBtn);
		debugeBtn.setOnClickListener(this);
		allCardBtn = (Button) findViewById(R.id.loading_layout_isAllCardBtn);
		allCardBtn.setOnClickListener(this);

		btnLinear = (LinearLayout) findViewById(R.id.loading_layout_btnLinear);
		barLinear = (LinearLayout) findViewById(R.id.loading_layout_barLinear);
		WarrantyText = (TextView) findViewById(R.id.loading_layout_WarrantyText);
		cardImage = (ImageView) findViewById(R.id.load_cardImage);
		cardNum = (EditText) findViewById(R.id.load_cardNumtext);
		cardNum.setInputType(EditorInfo.TYPE_CLASS_PHONE);
		confidenceText = (TextView) findViewById(R.id.load_confidencetext);
		versionText = (TextView) findViewById(R.id.loading_layout_versionText);
		versionText.setText("版本号：" + BankCardRecognition.getVersion());
		WarrantyBar = (ProgressBar) findViewById(R.id.loading_layout_WarrantyBar);
		againWarrantyBtn = (Button) findViewById(R.id.loading_layout_againWarrantyBtn);
		againWarrantyBtn.setOnClickListener(this);
		sureBtn = (Button) findViewById(R.id.loading_layout_cameraBtn);
		sureBtn.setOnClickListener(this);
		findViewById(R.id.loading_back).setOnClickListener(this);
		findViewById(R.id.loading_front).setOnClickListener(this);
	}

	private void isDebuge() {
		if (isDebuge)
			debugeBtn.setText("debug");
		else
			debugeBtn.setText("release");
	}
	private void isAllCard() {
		Log.w("ceshi", "isAllCard===" + isAllCard);
		if (isAllCard)
			allCardBtn.setText("全卡显示");
		else
			allCardBtn.setText("数字显示");
	}


	@Override
	public void onClick(View v) {
		switch (v.getId()) {
		case R.id.loading_layout_cameraBtn:
			Intent intent = new Intent(this,
					FaceBankCardScanActivity.class);
			intent.putExtra(Util.KEY_ISDEBUGE, isDebuge);
			intent.putExtra(Util.KEY_ISALLCARD, isAllCard);
			startActivity(intent);
			finish();
//			startActivityForResult(intent, INTO_IDCARDSCAN_PAGE);
			break;
		case R.id.loading_front:
			break;
		case R.id.loading_back:
			break;
		case R.id.loading_layout_debugeBtn:
			isDebuge = !isDebuge;
			mSharedUtil.saveBooleanValue(KEY_ISDEBUGE, isDebuge);
			isDebuge();
			break;
		case R.id.loading_layout_isAllCardBtn:
			isAllCard = !isAllCard;
			mSharedUtil.saveBooleanValue(KEY_ISALLCARD, isAllCard);
			isAllCard();
			break;
		case R.id.loading_layout_againWarrantyBtn:
			// netWorkWarranty();
			break;
		}

	}

	private static final int INTO_IDCARDSCAN_PAGE = 100;

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
		if (requestCode == INTO_IDCARDSCAN_PAGE && resultCode == RESULT_OK) {
			String filePath = data.getStringExtra("filePath");
			String bankNum = data.getStringExtra("bankNum");
			String confidence = data.getStringExtra("confidence");
			cardNum.setVisibility(View.VISIBLE);
			cardImage.setVisibility(View.VISIBLE);
			if (isDebuge)
				confidenceText.setVisibility(View.VISIBLE);
			else
				confidenceText.setVisibility(View.INVISIBLE);
			cardNum.setText(bankNum);
			confidenceText.setText("confidence: " + confidence);
			final Bitmap bitmap = BitmapFactory.decodeFile(filePath);
			new Thread(
					new Runnable() {
						@Override
						public void run() {
							FileUtil.saveBitmap(bitmap);
						}
					}
			).start();
			cardImage.setImageBitmap(bitmap);
		}
	}

	Handler mHandler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			if (msg.what == 1) {
				btnLinear.setVisibility(View.VISIBLE);
				barLinear.setVisibility(View.GONE);
			} else if (msg.what == 2) {
				againWarrantyBtn.setVisibility(View.VISIBLE);
				WarrantyText.setText("");
				WarrantyBar.setVisibility(View.GONE);
			}
		}
	};
}