package com.shudu.chaoshi;

import android.app.Application;
import android.util.Log;
import cn.jpush.reactnativejpush.JPushPackage;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.tencent.bugly.crashreport.CrashReport;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private boolean SHUTDOWN_TOAST = false;
  private boolean SHUTDOWN_LOG = false;

  @Override
  public void onCreate() {
    super.onCreate();
    CrashReport.initCrashReport(getApplicationContext(), "900059966", false);

  }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
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
}
