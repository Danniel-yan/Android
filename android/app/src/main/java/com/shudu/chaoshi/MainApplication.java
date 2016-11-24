package com.shudu.chaoshi;

import android.app.Application;
import android.content.Context;
import android.text.TextUtils;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.shudu.chaoshi.util.ChannelUtil;
import com.shudu.chaoshi.util.Constants;
import com.shudu.chaoshi.util.ToastHelper;
import com.tencent.bugly.crashreport.CrashReport;
import com.umeng.analytics.MobclickAgent;

import java.util.Arrays;
import java.util.List;

import cn.jpush.reactnativejpush.JPushPackage;

public class MainApplication extends Application implements ReactApplication {

    private boolean SHUTDOWN_TOAST = false;
    private boolean SHUTDOWN_LOG = false;
    public volatile static boolean isMainActivityRunning = true;
    private static Context mContext;

    @Override
    public void onCreate() {
        super.onCreate();
        mContext = getApplicationContext();
        CrashReport.initCrashReport(mContext, "900059966", false);
        init();
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new RNDeviceInfo(),
                    new MainReactPackage(),
                    new AppReactPackage(),
                    new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG)
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "src/index.android";
        }

    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    private void init() {
        String channel = ChannelUtil.getChannel(mContext, "neice");
        if (!TextUtils.isEmpty(channel))
            MobclickAgent.startWithConfigure(new MobclickAgent.UMAnalyticsConfig(mContext, Constants.UMENG_APPKEY, channel));
        ToastHelper.init(this);
    }

    public static final Context getMyApplicationContext() {
        return mContext;
    }
}
