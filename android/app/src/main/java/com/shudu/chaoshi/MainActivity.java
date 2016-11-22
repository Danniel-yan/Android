package com.shudu.chaoshi;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.shudu.chaoshi.util.ToastHelper;

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
    public void onBackPressed() {
        if (back_pressed + 2000 > System.currentTimeMillis()) {
            exitApp();
        } else {
            ToastHelper.getInstance().showToast("请再按一次返回键退出!");
            back_pressed = System.currentTimeMillis();
        }
    }

    private void exitApp() {
        MainApplication.isMainActivityRunning = false;
        finish();
    }
}
