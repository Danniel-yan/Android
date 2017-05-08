package com.shudu.chaoshi.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.shudu.chaoshi.R;
import com.moxie.client.model.MxParam;

/**
 * Created by speakJ on 2017/4/24.
 */

public class ImportBillChooseActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_choose);
    }

    public void jd(View view) {
        Intent intent = new Intent();
        intent.setClass(this, ImportBillActivity.class);
        intent.putExtra("name", MxParam.PARAM_FUNCTION_JINGDONG);
        startActivity(intent);
    }

    public void alipay(View view) {
        Intent intent = new Intent();
        intent.setClass(this, ImportBillActivity.class);
        intent.putExtra("name", MxParam.PARAM_FUNCTION_ALIPAY);
        startActivity(intent);
    }
}
