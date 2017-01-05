package com.shudu.chaoshi.module;

import com.alibaba.sdk.android.feedback.impl.FeedbackAPI;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by speakJ on 2016/11/28.
 */

public class FeedbackModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "FeedbackModule";

    public FeedbackModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void openFeedback() {
        FeedbackAPI.openFeedbackActivity();
    }
}
