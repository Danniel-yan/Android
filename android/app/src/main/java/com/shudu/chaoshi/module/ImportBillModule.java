package com.shudu.chaoshi.module;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.moxie.client.model.MxParam;
import com.shudu.chaoshi.activity.ImportBillActivity;
import com.facebook.react.bridge.ReactMethod;


/**
 * Created by yshr on 2017/5/3.
 */
public class ImportBillModule extends ReactContextBaseJavaModule {
    private Context mContext;
    private static final String MODULE_NAME = "ImportBillModule";
    private Promise mPromise;
    private int REQUEST_CODE_JINGDONG = 5; //
    private int REQUEST_CODE_ALIPAY = 6; //

    private final ActivityEventListener myActivityEventListener = new ActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if (requestCode == REQUEST_CODE_JINGDONG && resultCode == Activity.RESULT_OK) {
//                System.out.println(data);
                String urlStr = data.getStringExtra("urlStr");
                System.out.println("ImportBillModule data urlStr------------------------>" + urlStr);
//                String bankcardBase64 = data.getStringExtra("bankcardBase64");
//                WritableArray writableArray = new WritableNativeArray();
//                writableArray.pushString(bankcardBase64);
//                WritableNativeMap writableNativeMap = new WritableNativeMap();
//                writableNativeMap.putString("value", bankNum);
//                writableNativeMap.putArray("images", writableArray);
//                mPromise.resolve(writableNativeMap);
            }
        }

        @Override
        public void onNewIntent(Intent intent) {

        }
    };

    public ImportBillModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext.getBaseContext();
        reactContext.addActivityEventListener(myActivityEventListener);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void importJingdongBill(Promise promise) {
        mPromise = promise;
        try {
            Intent intent = new Intent();
            intent.setClass(mContext, ImportBillActivity.class);
            intent.putExtra("name", MxParam.PARAM_FUNCTION_JINGDONG);
//            getCurrentActivity().startActivity(intent);
            getCurrentActivity().startActivityForResult(intent, REQUEST_CODE_JINGDONG);
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException("Could not open the activity : " + e.getMessage());
        }

    }

    @ReactMethod
    public void importAlipayBill(Promise promise) {
        mPromise = promise;
        try {
            Intent intent = new Intent();
            intent.setClass(mContext, ImportBillActivity.class);
            intent.putExtra("name", MxParam.PARAM_FUNCTION_ALIPAY);
//            getCurrentActivity().startActivity(intent);
            getCurrentActivity().startActivityForResult(intent, REQUEST_CODE_ALIPAY);
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException("Could not open the activity : " + e.getMessage());
        }

    }
}
