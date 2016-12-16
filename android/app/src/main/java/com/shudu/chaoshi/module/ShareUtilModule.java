package com.shudu.chaoshi.module;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.shudu.chaoshi.model.ShareContentModel;
import com.shudu.chaoshi.util.ShareUtil;

/**
 * Created by speakJ on 2016/11/28.
 */

public class ShareUtilModule extends ReactContextBaseJavaModule {
    private Context mContext;
    private ShareUtil shareUtil;
    private static final String MODULE_NAME = "ShareUtilModule";

    public ShareUtilModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext.getBaseContext();
        shareUtil = new ShareUtil(mContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void circle(ReadableMap readableMap) {
        shareUtil.circle(setModel(readableMap));
    }

    @ReactMethod
    public void weixin(ReadableMap readableMap) {
        shareUtil.weixin(setModel(readableMap));
    }

    @ReactMethod
    public void sina(ReadableMap readableMap) {
        shareUtil.sina(setModel(readableMap));
    }

    @ReactMethod
    public void qzone(ReadableMap readableMap) {
        shareUtil.qzone(setModel(readableMap));
    }

    @ReactMethod
    public void qq(ReadableMap readableMap) {
        shareUtil.qq(setModel(readableMap));
    }

    private ShareContentModel setModel(ReadableMap readableMap) {
        ShareContentModel model = new ShareContentModel();
        if (readableMap != null) {
            model.content = readableMap.getString("content");
            model.title = readableMap.getString("title");
            model.url = readableMap.getString("url");
            model.icon_url = readableMap.getString("icon_url");
        }
        return model;
    }

}
