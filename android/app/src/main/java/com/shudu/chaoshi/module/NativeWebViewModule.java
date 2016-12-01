package com.shudu.chaoshi.module;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.webkit.DownloadListener;
import android.webkit.WebView;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;

/**
 * Created by speakJ on 2016/12/1.
 */
@ReactModule(name = NativeWebViewModule.MODULE_NAME)
public class NativeWebViewModule extends com.facebook.react.views.webview.ReactWebViewManager {
    private Context mContext;
    protected static final String MODULE_NAME = "NativeWebViewModule";

    public NativeWebViewModule(ReactApplicationContext reactContext) {
        mContext = reactContext.getBaseContext();
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @Override
    protected void addEventEmitters(ThemedReactContext reactContext, WebView view) {
        super.addEventEmitters(reactContext, view);
        view.setDownloadListener(new DownloadListener() {
            @Override
            public void onDownloadStart(String url, String userAgent, String contentDisposition, String mimetype, long contentLength) {
                mContext.startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
            }
        });
    }
}
