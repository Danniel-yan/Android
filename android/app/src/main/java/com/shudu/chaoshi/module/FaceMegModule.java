package com.shudu.chaoshi.module;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.megvii.demo.util.Util;
import com.shudu.chaoshi.activity.FaceBankCardScanActivity;

/**
 * Created by yshr on 16/12/30.
 */

public class FaceMegModule extends ReactContextBaseJavaModule {
    private Context mContext;
    private static final String MODULE_NAME = "FaceMegModule";
    private int REQUEST_CODE = 1;
    private Promise mPromise;

    private final ActivityEventListener mActivityEventListener = new ActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if (requestCode == REQUEST_CODE && resultCode == Activity.RESULT_OK) {
                String bankNum = data.getStringExtra("bankNum");
                String bankcardBase64 = data.getStringExtra("bankcardBase64");
                WritableArray writableArray = new WritableNativeArray();
                writableArray.pushString(bankcardBase64);
                WritableNativeMap writableNativeMap = new WritableNativeMap();
                writableNativeMap.putString("value", bankNum);
                writableNativeMap.putArray("images", writableArray);
                mPromise.resolve(writableNativeMap);
            }
        }

        @Override
        public void onNewIntent(Intent intent) {

        }
    };

    public FaceMegModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext.getBaseContext();
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void idCardVerifyFromFront(Promise promise) {
        try {
            Intent intent = new Intent(mContext,
                    com.megvii.idcardlib.IDCardScanActivity.class);
            // 身份证正面
            intent.putExtra("side", 0);
            intent.putExtra("isvertical", false);
            mContext.startActivity(intent);
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException("Could not open the activity : " + e.getMessage());
        }

    }

    @ReactMethod
    public void idCardVerifyFromBack() {
        try {
            Intent intent = new Intent(mContext,
                    com.megvii.idcardlib.IDCardScanActivity.class);
            // 身份证反面
            intent.putExtra("side", 1);
            intent.putExtra("isvertical", false);
            mContext.startActivity(intent);
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException("Could not open the activity : " + e.getMessage());
        }

    }

    @ReactMethod
    public void bankCardVerify(Promise promise) {
        mPromise = promise;
        try {
            Intent intent = new Intent(mContext,
                    FaceBankCardScanActivity.class);
            intent.putExtra(Util.KEY_ISDEBUGE, false);
            intent.putExtra(Util.KEY_ISALLCARD, true);
            getCurrentActivity().startActivityForResult(intent, REQUEST_CODE);
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException("Could not open the activity : " + e.getMessage());
        }


    }
}
