package com.shudu.chaoshi.module;

import android.content.Context;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableNativeMap;
import com.shudu.chaoshi.model.ShareContentModel;
import com.shudu.chaoshi.util.ShareUtil;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

import cn.sharesdk.framework.Platform;
import cn.sharesdk.framework.PlatformActionListener;

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
    public void circle(ReadableMap readableMap, Promise promise) {
        shareUtil.circle(setModel(readableMap), getPlatformActionListener(promise));
    }

    @ReactMethod
    public void weixin(ReadableMap readableMap, Promise promise) {
        shareUtil.weixin(setModel(readableMap), getPlatformActionListener(promise));

    }

    @ReactMethod
    public void sina(ReadableMap readableMap, Promise promise) {
        shareUtil.sina(setModel(readableMap), getPlatformActionListener(promise));
    }

    @ReactMethod
    public void qzone(ReadableMap readableMap, Promise promise) {
        shareUtil.qzone(setModel(readableMap), getPlatformActionListener(promise));
    }

    @ReactMethod
    public void qq(ReadableMap readableMap, Promise promise) {
        shareUtil.qq(setModel(readableMap), getPlatformActionListener(promise));
    }

    private ShareContentModel setModel(ReadableMap readableMap) {
        ShareContentModel model = new ShareContentModel();
        if (readableMap != null) {
            ReadableMapKeySetIterator it = readableMap.keySetIterator();
            Class cl = model.getClass();
            while(it.hasNextKey()) {
                String key = it.nextKey();
                try {
                    cl.getDeclaredField(key).set(model, readableMap.getString(key));
                } catch (NoSuchFieldException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }

            }
        }
        return model;
    }

    private PlatformActionListener getPlatformActionListener(final Promise promise) {
        return new PlatformActionListener() {
            @Override
            public void onComplete(Platform platform, int i, HashMap<String, Object> hashMap) {
                WritableNativeMap writableNativeMap = new WritableNativeMap();
                writableNativeMap.putString("status", "success");
                promise.resolve(writableNativeMap);
            }

            @Override
            public void onError(Platform platform, int i, Throwable throwable) {
                WritableNativeMap writableNativeMap = new WritableNativeMap();
                writableNativeMap.putString("status", "failure");
                promise.resolve(writableNativeMap);
            }

            @Override
            public void onCancel(Platform platform, int i) {
                WritableNativeMap writableNativeMap = new WritableNativeMap();
                writableNativeMap.putString("status", "cancel");
                promise.resolve(writableNativeMap);
            }
        };
    }

}
