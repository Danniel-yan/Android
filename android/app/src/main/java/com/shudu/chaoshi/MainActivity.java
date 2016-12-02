package com.shudu.chaoshi;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.umeng.analytics.MobclickAgent;

import cn.jpush.android.api.JPushInterface;

import static com.tencent.bugly.crashreport.inner.InnerAPI.context;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "supermarketjs";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        MainApplication.isMainActivityRunning = true;
    }

    @Override
    public void onResume() {
        super.onResume();
        MobclickAgent.onResume(context);
        JPushInterface.onResume(this);
    }

    @Override
    public void onPause() {
        super.onPause();
        MobclickAgent.onPause(context);
        JPushInterface.onPause(this);
    }

}
