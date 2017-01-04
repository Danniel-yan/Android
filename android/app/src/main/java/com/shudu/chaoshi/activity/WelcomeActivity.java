package com.shudu.chaoshi.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;

import com.megvii.demo.util.Util;
import com.shudu.chaoshi.activity.FaceIDCardScanActivity;
import com.shudu.chaoshi.R;
import com.shudu.chaoshi.util.IdCardInit;

/**
 * Created by speakJ on 2016/11/28.
 */

public class WelcomeActivity extends Activity implements View.OnClickListener {
    private Button btn_faceverify, btn_bankcardverify, btn_idcardverify, btn_surpermarket;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);
//        hide();

        initView();
        initListenner();
    }

    private void initListenner() {
//        btn_faceverify.setOnClickListener(this);
        btn_bankcardverify.setOnClickListener(this);
        btn_idcardverify.setOnClickListener(this);
        btn_surpermarket.setOnClickListener(this);
    }

    private void initView() {
//        btn_faceverify = (Button) findViewById(R.id.btn_faceverify);
        btn_bankcardverify = (Button) findViewById(R.id.btn_bankcardverify);
        btn_idcardverify = (Button) findViewById(R.id.btn_idcardverify);
        btn_surpermarket = (Button) findViewById(R.id.btn_surpermarket);
    }

    private void hide() {
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                startActivity(new Intent(WelcomeActivity.this, MainActivity.class));
                finish();
            }
        }, 1000);
    }

    @Override
    public void onClick(View v) {
        Intent intent = new Intent();
        switch (v.getId()) {
//            case R.id.btn_faceverify:
////                intent.setClass(this, FaceLivenessInitActivity.class);
//                break;
            case R.id.btn_bankcardverify:
                intent.putExtra(Util.KEY_ISDEBUGE, false);
                intent.putExtra(Util.KEY_ISALLCARD, true);
                intent.setClass(this, FaceBankCardScanActivity.class);
                break;
            case R.id.btn_idcardverify:
                intent.putExtra("side", 0);
                intent.putExtra("isvertical", false);
                intent.setClass(this, FaceIDCardScanActivity.class);
                break;
              case R.id.btn_surpermarket:
                intent.setClass(this, MainActivity.class);
                break;
        }
        if (intent != null) {
            startActivity(intent);
        }
    }
}
