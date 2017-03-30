package com.shudu.chaoshi.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import com.shudu.chaoshi.R;

/**
 * Created by speakJ on 2016/11/28.
 */

public class WelcomeActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);
        hide();
    }

    private void hide() {
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                startActivity(new Intent(WelcomeActivity.this, ImportBillActivity.class));
                finish();
            }
        }, 1000);
    }
}
