package com.shudu.chaoshi.module;

import android.content.Context;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.shudu.chaoshi.util.DeviceInfo;

/**
 * Created by speakJ on 2016/11/28.
 */

public class DeviceInfoModule extends ReactContextBaseJavaModule {
    private Context mContext;
    private static final String MODULE_NAME = "DeviceInfoModule";

    public DeviceInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext.getBaseContext();
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void getAppVersionName(Promise promise) {
        promise.resolve(DeviceInfo.getAppVersion(mContext));
    }

}
