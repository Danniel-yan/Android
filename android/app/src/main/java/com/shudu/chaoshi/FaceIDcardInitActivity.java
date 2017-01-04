package com.shudu.chaoshi;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.megvii.idcardlib.util.Util;
import com.megvii.idcardquality.IDCardQualityLicenseManager;
import com.megvii.licensemanager.Manager;


/**
 * Created by yshr on 16/12/7.
 */

public class FaceIDcardInitActivity extends Activity implements View.OnClickListener{
    private String uuid;
    private LinearLayout btnLinear, barLinear;
    private TextView WarrantyText;
    private ProgressBar WarrantyBar;
    private Button againWarrantyBtn;
    private Button selectBtn;
    boolean isVertical;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.face_activity_init);
        init();
        initData();
        netWorkWarranty();
    }

    private void init() {
        uuid = Util.getUUIDString(this);

        btnLinear = (LinearLayout) findViewById(R.id.loading_layout_btnLinear);
        barLinear = (LinearLayout) findViewById(R.id.loading_layout_barLinear);
        WarrantyText = (TextView) findViewById(R.id.loading_layout_WarrantyText);
        WarrantyBar = (ProgressBar) findViewById(R.id.loading_layout_WarrantyBar);
        againWarrantyBtn = (Button) findViewById(R.id.loading_layout_againWarrantyBtn);
        againWarrantyBtn.setOnClickListener(this);
        selectBtn = (Button) findViewById(R.id.loading_layout_isVerticalBtn);
        selectBtn.setOnClickListener(this);
        findViewById(R.id.loading_back).setOnClickListener(this);
        findViewById(R.id.loading_front).setOnClickListener(this);
    }

    /**
     * 联网授权
     */
    private void netWorkWarranty() {
        btnLinear.setVisibility(View.GONE);
        barLinear.setVisibility(View.VISIBLE);
        againWarrantyBtn.setVisibility(View.GONE);
        WarrantyText.setText("正在联网授权...");
        WarrantyBar.setVisibility(View.VISIBLE);
        new Thread(new Runnable() {
            @Override
            public void run() {
                Manager manager = new Manager(FaceIDcardInitActivity.this);
                IDCardQualityLicenseManager idCardLicenseManager = new IDCardQualityLicenseManager(
                        FaceIDcardInitActivity.this);
                manager.registerLicenseManager(idCardLicenseManager);

                manager.takeLicenseFromNetwork(uuid);
                if (idCardLicenseManager.checkCachedLicense() > 0)
                    mHandler.sendEmptyMessage(1);
                else
                    mHandler.sendEmptyMessage(2);
            }
        }).start();
    }

    private void initData() {
        if (isVertical)
            selectBtn.setText("vertical");
        else
            selectBtn.setText("horizontal");
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.loading_layout_isVerticalBtn:
                isVertical = !isVertical;
                initData();
                break;
            case R.id.loading_front: {
                Intent intent = new Intent(this,
                        com.megvii.idcardlib.IDCardScanActivity.class);
                intent.putExtra("side", 0);
                intent.putExtra("isvertical", isVertical);
                startActivityForResult(intent, INTO_IDCARDSCAN_PAGE);
            }
            break;
            case R.id.loading_back: {
                Intent intent = new Intent(this,
                        com.megvii.idcardlib.IDCardScanActivity.class);
                intent.putExtra("side", 1);
                intent.putExtra("isvertical", isVertical);
                startActivityForResult(intent, INTO_IDCARDSCAN_PAGE);
                break;
            }
            case R.id.loading_layout_againWarrantyBtn:
                netWorkWarranty();
                break;
        }
    }

    private static final int INTO_IDCARDSCAN_PAGE = 100;

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == INTO_IDCARDSCAN_PAGE && resultCode == RESULT_OK) {
            Intent intent = new Intent(this, FaceIDcardResultActivity.class);
            intent.putExtra("side", data.getIntExtra("side", 0));
            intent.putExtra("idcardImg", data.getByteArrayExtra("idcardImg"));
            if (data.getIntExtra("side", 0) == 0) {
                intent.putExtra("portraitImg",
                        data.getByteArrayExtra("portraitImg"));
            }
            startActivity(intent);
        }
    }

    Handler mHandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            if (msg.what == 1) {
                btnLinear.setVisibility(View.VISIBLE);
                selectBtn.setVisibility(View.VISIBLE);
                barLinear.setVisibility(View.GONE);
            } else if (msg.what == 2) {
                againWarrantyBtn.setVisibility(View.VISIBLE);
                WarrantyText.setText("联网授权失败，请点击按钮重新授权");
                WarrantyBar.setVisibility(View.GONE);
                selectBtn.setVisibility(View.GONE);
                btnLinear.setVisibility(View.GONE);
            }
        }
    };
}
