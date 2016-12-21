package com.shudu.chaoshi.module;

import android.content.Context;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
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

//                readableMap.getString(key);
            }
//            model.content = readableMap.getString("content");
//            model.title = readableMap.getString("title");
//            model.url = readableMap.getString("url");
//            model.icon_url = readableMap.getString("icon_url");
        }
        return model;
    }

    private PlatformActionListener getPlatformActionListener(final Promise promise) {
        return new PlatformActionListener() {
            @Override
            public void onComplete(Platform platform, int i, HashMap<String, Object> hashMap) {
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("status", "success");
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                promise.resolve(jsonObject);
            }

            @Override
            public void onError(Platform platform, int i, Throwable throwable) {
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("status", "faliure");
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                promise.resolve(jsonObject);
            }

            @Override
            public void onCancel(Platform platform, int i) {
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("status", "cancel");
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                promise.resolve(jsonObject);
            }
        };
    }

}
