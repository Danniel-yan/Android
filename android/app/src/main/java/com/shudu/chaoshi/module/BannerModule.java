package com.shudu.chaoshi.module;

import android.content.Context;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;

/**
 * Created by yshr on 2017/5/15.
 */

public class BannerModule extends ReactContextBaseJavaModule {

    private Context mContext;
    private static final String MODULE_NAME = "BannerModule";
    private Promise promise;

    public BannerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext.getBaseContext();
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void getBannerList(ReadableArray imgUrlList, Promise promise) {
        this.promise = promise;
//        GrowingIO.getInstance().trackBanner(banner, bannerDescriptions);

    }

}