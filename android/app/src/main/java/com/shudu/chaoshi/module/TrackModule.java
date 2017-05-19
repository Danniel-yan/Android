package com.shudu.chaoshi.module;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.growingio.android.sdk.collection.GrowingIO;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by speakJ on 2017/5/17.
 */

public class TrackModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "TrackModule";

    public TrackModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void track(String eventName, String properties) {
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject = new JSONObject(properties);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        GrowingIO.getInstance().track(eventName, jsonObject);
    }

    @ReactMethod
    public void trackCS(String uuid) {
        GrowingIO.getInstance().setCS1("uuid", uuid);
    }

}
