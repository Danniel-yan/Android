package com.shudu.chaoshi;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.shudu.chaoshi.module.ChannelModule;
import com.shudu.chaoshi.module.JpushModule;
import com.shudu.chaoshi.module.NativeWebViewModule;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by speakJ on 2016/11/24.
 */

public class AppReactPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.asList(new NativeModule[]{
                new UmengModule(reactContext),
                new JpushModule(reactContext),
                new ChannelModule(reactContext),
                new NativeWebViewModule(reactContext)
        });
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
