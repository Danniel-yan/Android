package com.shudu.chaoshi;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.shudu.chaoshi.util.AnalysisUtil;
import com.umeng.analytics.MobclickAgent;

import java.util.Map;

import static com.tencent.bugly.crashreport.inner.InnerAPI.context;

/**
 * Created by speakJ on 2016/11/24.
 */

public class UmengModule extends ReactContextBaseJavaModule {
    private Context mContext;
    private static final String MODULE_NAME = "StatisticalEvent";

    public UmengModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext.getBaseContext();
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void onResume() {
        MobclickAgent.onResume(context);
    }

    @ReactMethod
    public void onPause() {
        MobclickAgent.onPause(context);
    }

    @ReactMethod
    public void onEvent(String eventName) {
        AnalysisUtil.create(context).sendEvent(eventName);
    }

    @ReactMethod
    public void onEventWithAttributes(String eventName, Map<String, String> map) {
        AnalysisUtil.create(context).sendEvent(eventName, map);
    }
}
