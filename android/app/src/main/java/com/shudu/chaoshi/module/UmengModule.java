package com.shudu.chaoshi.module;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.shudu.chaoshi.util.AnalysisUtil;
import com.umeng.analytics.MobclickAgent;

import java.util.HashMap;

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
        MobclickAgent.onResume(mContext);
    }

    @ReactMethod
    public void onPause() {
        MobclickAgent.onPause(mContext);
    }

    @ReactMethod
    public void onEvent(String eventName) {
        AnalysisUtil.create(mContext).sendEvent(eventName);
    }

    @ReactMethod
    public void onEventWithAttributes(String eventName, ReadableMap dataMap) {
        if (dataMap != null) {
            HashMap<String, String> map = new HashMap<>();
            ReadableMapKeySetIterator readableMapKeySetIterator = dataMap.keySetIterator();
            while (readableMapKeySetIterator.hasNextKey()) {
                String aKey = readableMapKeySetIterator.nextKey();
                String aValue = dataMap.getString(aKey);
                map.put(aKey, aValue);
            }
            AnalysisUtil.create(mContext).sendEvent(eventName, map);
        }
    }
}
