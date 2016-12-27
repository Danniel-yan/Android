package com.shudu.chaoshi.activity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.ValueCallback;

import com.facebook.react.ReactActivity;
import com.shudu.chaoshi.MainApplication;
import com.umeng.analytics.MobclickAgent;

import cn.jpush.android.api.JPushInterface;

import static com.shudu.chaoshi.module.NativeWebViewModule.FILECHOOSER_RESULTCODE;
import static com.shudu.chaoshi.module.NativeWebViewModule.FILECHOOSER_RESULTCODE_FOR_ANDROID_5;

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
        MobclickAgent.onResume(this);
        JPushInterface.onResume(this);
    }

    @Override
    public void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
        JPushInterface.onPause(this);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        if (requestCode == FILECHOOSER_RESULTCODE) {
            ValueCallback<Uri> mUploadMessage = intent.getParcelableExtra("mUploadMessage");
            if (null == mUploadMessage)
                return;
            Uri result = intent == null || resultCode != RESULT_OK ? null
                    : intent.getData();
            mUploadMessage.onReceiveValue(result);

        } else if (requestCode == FILECHOOSER_RESULTCODE_FOR_ANDROID_5) {
            ValueCallback<Uri[]> mUploadMessageForAndroid5 = intent.getParcelableExtra("mUploadMessageForAndroid5");
            if (null == mUploadMessageForAndroid5)
                return;
            Uri result = (intent == null || resultCode != RESULT_OK) ? null
                    : intent.getData();
            if (result != null) {
                mUploadMessageForAndroid5.onReceiveValue(new Uri[]{result});
            } else {
                mUploadMessageForAndroid5.onReceiveValue(new Uri[]{});
            }
        }
    }

}
