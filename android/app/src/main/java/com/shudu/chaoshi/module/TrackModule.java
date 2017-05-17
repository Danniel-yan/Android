package com.shudu.chaoshi.module;

import android.util.Log;

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
        Log.d("1234",eventName + "----"+properties);
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject = new JSONObject(properties);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        Log.d("1234","json----"+jsonObject);
        GrowingIO.getInstance().track(eventName, jsonObject);
    }

}
