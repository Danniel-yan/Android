package com.shudu.chaoshi.module;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Parcelable;
import android.text.TextUtils;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.megvii.demo.util.Util;

import java.util.concurrent.ArrayBlockingQueue;

/**
 * Created by yshr on 16/12/30.
 */

public class FaceMegModule extends ReactContextBaseJavaModule {
    private Context mContext;
//    private IdCardUtil idcardUtil;
    private static final String MODULE_NAME = "FaceMegModule";
    public static final int REQUEST_CODE = 1;
    private Promise promise;

    private final ActivityEventListener mActivityEventListener = new ActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if (requestCode == REQUEST_CODE && resultCode == ((Activity)mContext).RESULT_OK){
                promise.resolve(data.getStringExtra("bankNum"));
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
//        idcardUtil = new IdCardUtil(mContext);
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
        promise = promise;
        try {
            Intent intent = new Intent(mContext,
                    com.shudu.chaoshi.FaceBankCardScanActivity.class);
            intent.putExtra(Util.KEY_ISDEBUGE, false);
            intent.putExtra(Util.KEY_ISALLCARD, true);
            intent.putExtra("promise", (Parcelable) promise);
            ((Activity)mContext).startActivityForResult(intent, REQUEST_CODE);
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException("Could not open the activity : " + e.getMessage());
        }


    }
}
