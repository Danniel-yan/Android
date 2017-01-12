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
import com.shudu.chaoshi.activity.FaceIDCardScanActivity;
import com.shudu.chaoshi.activity.FaceLivenessActivity;
import com.shudu.chaoshi.util.Base64;
import com.shudu.chaoshi.util.BitmapUtils;

import java.io.FileDescriptor;
import java.io.UnsupportedEncodingException;

/**
 * Created by yshr on 16/12/30.
 */

public class FaceMegModule extends ReactContextBaseJavaModule {
    private Context mContext;
    private static final String MODULE_NAME = "FaceMegModule";
    private int REQUEST_CODE = 1; // 银行卡识别
    private int REQUEST_IDCARDFRONT = 2; // 身份证正面识别
    private int REQUEST_IDCARDBACK = 3; // 身份证反面识别
    private int REQUEST_FACELIVENESS = 4; // 人脸识别成功结果

    private Promise mPromise;
    private String strImage; // 身份证正反面照
    private String strPortraitImg; // 身份证正面头照
    private String image_best; //人脸识别最清楚照片
    private String image_env; //人脸识别全景照片
    // 人脸识别动作过程中照片
    private String image_action1;
    private String image_action2;
    private String image_action3;
    private String imagePath; //人脸识别图片保存路径


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
            } else if (requestCode == REQUEST_IDCARDFRONT && resultCode == Activity.RESULT_OK) {
                byte[] idcardImgData = data.getByteArrayExtra("idcardImg");
                byte[] portraitImg = data.getByteArrayExtra("portraitImg");
                try {

                    strImage = new String(Base64.encode(idcardImgData), "utf-8");
                    strPortraitImg = new String(Base64.encode(portraitImg), "utf-8");
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                WritableArray writableArray = new WritableNativeArray();
                writableArray.pushString(strImage);
                writableArray.pushString(strPortraitImg);
                WritableNativeMap writableNativeMap = new WritableNativeMap();
                writableNativeMap.putString("value", "");
                writableNativeMap.putArray("images", writableArray);
                mPromise.resolve(writableNativeMap);
            } else if (requestCode == REQUEST_IDCARDBACK && resultCode == Activity.RESULT_OK) {
                byte[] idcardImgData = data.getByteArrayExtra("idcardImg");
                try {
                    strImage = new String(Base64.encode(idcardImgData), "utf-8");
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                WritableArray writableArray = new WritableNativeArray();
                writableArray.pushString(strImage);
                WritableNativeMap writableNativeMap = new WritableNativeMap();
                writableNativeMap.putString("value", "");
                writableNativeMap.putArray("images", writableArray);
                mPromise.resolve(writableNativeMap);
            } else if (requestCode == REQUEST_FACELIVENESS && resultCode == Activity.RESULT_OK) {
                try {
                    imagePath = BitmapUtils.initPath();
                    image_best = imagePath + "/image_best.jpg";
                    image_env = imagePath + "/image_env.jpg";
                    image_action1 = imagePath + "/image_action1.jpg";
                    image_action2 = imagePath + "/image_action2.jpg";
                    image_action3 = imagePath + "/image_action3.jpg";
                    WritableArray writableArray = new WritableNativeArray();
                    writableArray.pushString(BitmapUtils.getImageByPath(image_best));
                    writableArray.pushString(BitmapUtils.getImageByPath(image_env));
                    writableArray.pushString(BitmapUtils.getImageByPath(image_action1));
                    writableArray.pushString(BitmapUtils.getImageByPath(image_action2));
                    writableArray.pushString(BitmapUtils.getImageByPath(image_action2));
                    WritableNativeMap writableNativeMap = new WritableNativeMap();
                    writableNativeMap.putString("value", "");
                    writableNativeMap.putArray("images", writableArray);
                    mPromise.resolve(writableNativeMap);
                } catch (Exception e) {
                    e.printStackTrace();
                }


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
        mPromise = promise;
        try {
            Intent intent = new Intent(mContext,
                    FaceIDCardScanActivity.class);
            // 身份证正面
            intent.putExtra("side", 0);
            intent.putExtra("isvertical", false);
            getCurrentActivity().startActivityForResult(intent, REQUEST_IDCARDFRONT);
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException("Could not open the activity : " + e.getMessage());
        }

    }

    @ReactMethod
    public void idCardVerifyFromBack(Promise promise) {
        mPromise = promise;
        try {
            Intent intent = new Intent(mContext,
                    FaceIDCardScanActivity.class);
            // 身份证反面
            intent.putExtra("side", 1);
            intent.putExtra("isvertical", false);
            getCurrentActivity().startActivityForResult(intent, REQUEST_IDCARDBACK);
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

    @ReactMethod
    public void megLiveVerify(Promise promise) {
        mPromise = promise;
        try {
            Intent intent = new Intent(mContext,
                    FaceLivenessActivity.class);
            getCurrentActivity().startActivityForResult(intent, REQUEST_FACELIVENESS);
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException("Could not open the activity : " + e.getMessage());
        }
    }
}
