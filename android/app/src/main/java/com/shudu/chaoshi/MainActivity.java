package com.shudu.chaoshi;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.shudu.chaoshi.util.ToastHelper;
import cn.jpush.android.api.JPushInterface;

public class MainActivity extends ReactActivity {

    private static long back_pressed;

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
        JPushInterface.onResume(this);
    }

    @Override
    public void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
    }

    private void exitApp() {
        MainApplication.isMainActivityRunning = false;
        finish();
    }
}
