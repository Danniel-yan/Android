package com.shudu.chaoshi.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.moxie.client.model.MxParam;
import com.shudu.chaoshi.R;

/**
 * Created by speakJ on 2017/3/30.
 */

public class ImportBillResultActivity extends Activity {

    private ImageView iv_result_importbill;
    private TextView tv_result_importbill, tv_result_importbill_title;
    private Button btn_result_importbill;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_importbill_result);
        initView();
        resultData();
        setListener();
    }

    private void initView() {
        iv_result_importbill = (ImageView) findViewById(R.id.iv_result_importbill);
        tv_result_importbill = (TextView) findViewById(R.id.tv_result_importbill);
        btn_result_importbill = (Button) findViewById(R.id.btn_result_importbill);
        tv_result_importbill_title = (TextView) findViewById(R.id.tv_result_importbill_title);
    }

    private void resultData() {
        String type = getIntent().getStringExtra("actName");
        int result = getIntent().getIntExtra("result", 0);
        if (result == 0) {
            tv_result_importbill.setText("导入失败");
            if (type.equals(MxParam.PARAM_FUNCTION_ALIPAY)) {
                iv_result_importbill.setImageResource(R.mipmap.ic_billalipay_fail);
            } else {
                iv_result_importbill.setImageResource(R.mipmap.ic_billjd_fail);
            }
        } else {
            tv_result_importbill.setText("导入成功");
            if (type.equals(MxParam.PARAM_FUNCTION_ALIPAY)) {
                iv_result_importbill.setImageResource(R.mipmap.ic_billalipay_success);
            } else {
                iv_result_importbill.setImageResource(R.mipmap.ic_billjd_success);
            }
        }

        tv_result_importbill_title.setText(type.equals(MxParam.PARAM_FUNCTION_ALIPAY) ? "支付宝账单导入" : "京东账单导入");
    }

    private void setListener() {
        btn_result_importbill.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }
}
