package com.shudu.chaoshi.module;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.shudu.chaoshi.util.JpushUtil;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by speakJ on 2016/11/28.
 */

public class JpushModule extends ReactContextBaseJavaModule {
    private Context mContext;
    private static final String MODULE_NAME = "JpushModule";

    public JpushModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext.getBaseContext();
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void init() {
        JpushUtil.init(mContext);
    }

    @ReactMethod
    public void setAlias(String alias) {
        JpushUtil.setAlias(alias);
    }

    @ReactMethod
    public void setAliasAndTags(String alias, ReadableArray dataArray) {
        Set<String> set = new HashSet<>();
        for (int i = 0; i < dataArray.size(); i++) {
            set.add(dataArray.getString(i));
        }
        JpushUtil.setAliasAndTags(alias, set);
    }
}
