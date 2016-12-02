package com.shudu.chaoshi.module;

import android.content.Context;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.shudu.chaoshi.util.ChannelUtil;

/**
 * Created by speakJ on 2016/11/30.
 */

public class ChannelModule extends ReactContextBaseJavaModule {
    private Context mContext;
    private static final String MODULE_NAME = "ChannelModule";

    public ChannelModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext.getBaseContext();
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void getChannel(Promise promise) {
        promise.resolve(ChannelUtil.getChannel(mContext));
    }

    @ReactMethod
    public void getChannelDefault(String defaultChannel, Promise promise) {
        promise.resolve(ChannelUtil.getChannel(mContext, defaultChannel));
    }
}
