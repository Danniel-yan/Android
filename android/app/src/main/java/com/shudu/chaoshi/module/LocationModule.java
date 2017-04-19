package com.shudu.chaoshi.module;

import android.content.Context;

import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeMap;

/**
 * Created by speakJ on 2017/4/1.
 */

public class LocationModule extends ReactContextBaseJavaModule {

    private Context mContext;
    private static final String MODULE_NAME = "LocationModule";
    private LocationClient mLocationClient;
    private Promise promise;

    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext.getBaseContext();
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void getLocation(Promise promise) {
        this.promise = promise;
        mLocationClient = new LocationClient(mContext);
        mLocationClient.registerLocationListener(new MyLocationListener());
        LocationClientOption option = new LocationClientOption();
        option.setCoorType("bd09ll");//可选，默认gcj02，设置返回的定位结果坐标系
        option.setOpenGps(true);//可选，默认false,设置是否使用gps
        mLocationClient.setLocOption(option);
        mLocationClient.start();
    }

    private class MyLocationListener implements BDLocationListener {

        @Override
        public void onReceiveLocation(BDLocation location) {
            if (mLocationClient != null) {
                mLocationClient.stop();
            }
            if (location != null) {
                WritableNativeMap writableNativeMap = new WritableNativeMap();
                String latitude = location.getLatitude() + "";
                String longitude = location.getLongitude() + "";
                if (latitude.contains("e") || latitude.contains("E") || longitude.contains("e") || longitude.contains("E")) {
                    writableNativeMap.putString("error", "请打开定位");
                } else {
                    writableNativeMap.putString("Latitude", latitude);
                    writableNativeMap.putString("Longitude", longitude);
                }
                promise.resolve(writableNativeMap);
            }
        }

        @Override
        public void onConnectHotSpotMessage(String s, int i) {

        }
    }
}
