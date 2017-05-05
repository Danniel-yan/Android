package com.shudu.chaoshi.activity;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.shudu.chaoshi.MainApplication;
import com.umeng.analytics.MobclickAgent;

import cn.jpush.android.api.JPushInterface;

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
        /*处理webview中输入框被软键盘遮挡的bug
           如果非全屏模式，可以使用清单文件中设置adjustResize 应用中暂用此种方法
           如果是全屏模式，则使用AndroidBug5497Workaround进行处理。*/
//        AndroidBug5497Workaround.assistActivity(this);
        MainApplication.isMainActivityRunning = true;
    }

    @Override
    public void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
        JPushInterface.onResume(this);
    }

    @Override
    public void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
        JPushInterface.onPause(this);
    }

}
