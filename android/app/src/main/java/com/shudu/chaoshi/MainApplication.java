package com.shudu.chaoshi;

import android.app.Application;
import android.content.Context;
import android.text.TextUtils;

import com.alibaba.sdk.android.feedback.impl.FeedbackAPI;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.growingio.android.sdk.collection.Configuration;
import com.growingio.android.sdk.collection.GrowingIO;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.shudu.chaoshi.util.ChannelUtil;
import com.shudu.chaoshi.util.Constants;
import com.shudu.chaoshi.util.FaceLivenessInit;
import com.shudu.chaoshi.util.IdCardInit;
import com.shudu.chaoshi.util.JpushUtil;
import com.shudu.chaoshi.util.ShareUtil;
import com.shudu.chaoshi.util.ToastHelper;
import com.tencent.bugly.crashreport.CrashReport;
import com.umeng.analytics.MobclickAgent;

import java.util.Arrays;
import java.util.List;

import cn.jpush.reactnativejpush.JPushPackage;
import cn.sharesdk.framework.ShareSDK;

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
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new RNDeviceInfo(),
                    new MainReactPackage(),
                    new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG),
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
        String channel = ChannelUtil.getChannel(mContext);
        if (!TextUtils.isEmpty(channel))
            MobclickAgent.startWithConfigure(new MobclickAgent.UMAnalyticsConfig(mContext, Constants.UMENG_APPKEY, channel));
        JpushUtil.init(mContext);
        ShareSDK.initSDK(mContext, "19f8ff0f510f0");
        FeedbackAPI.init(this, "23579028");
        ShareUtil.setAppKey();
        ToastHelper.init(mContext);
        IdCardInit.netWorkWarranty(mContext);
        FaceLivenessInit.netWorkWarranty(mContext);
        GrowingIO.startWithConfiguration(this, new Configuration()
                .useID()
                .trackAllFragments()
                .setChannel(channel));
    }

    public static final Context getMyApplicationContext() {
        return mContext;
    }
}
