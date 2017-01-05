package com.shudu.chaoshi.util;

import android.content.Context;
import android.graphics.BitmapFactory;
import android.text.TextUtils;

import com.shudu.chaoshi.R;
import com.shudu.chaoshi.model.ShareContentModel;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;

import cn.sharesdk.framework.Platform;
import cn.sharesdk.framework.PlatformActionListener;
import cn.sharesdk.framework.ShareSDK;
import cn.sharesdk.sina.weibo.SinaWeibo;
import cn.sharesdk.tencent.qq.QQ;
import cn.sharesdk.tencent.qzone.QZone;
import cn.sharesdk.wechat.friends.Wechat;
import cn.sharesdk.wechat.moments.WechatMoments;

/**
 * Created by speakJ on 16/9/20.
 */
public class ShareUtil {

    private Context context;
    private String site;

    public ShareUtil(Context context) {
        this.context = context;
        site = context.getResources().getString(R.string.app_name);
    }

    public void sina(ShareContentModel contentModel, PlatformActionListener mPlatformActionListener) {
        SinaWeibo.ShareParams sp = new SinaWeibo.ShareParams();
        sp.setText(formatUrlEncode(contentModel.content, "%") + contentModel.url);
        if (TextUtils.isEmpty(contentModel.icon_url))
            sp.setImageData(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_logo));
        else
            sp.setImageUrl(contentModel.icon_url);
        Platform weibo = ShareSDK.getPlatform(SinaWeibo.NAME);
        weibo.setPlatformActionListener(mPlatformActionListener);
        weibo.share(sp);
    }

    public void qq(ShareContentModel contentModel, PlatformActionListener mPlatformActionListener) {
        QQ.ShareParams sp = new QQ.ShareParams();
        sp.setTitle(contentModel.title);
        sp.setTitleUrl(contentModel.url);
        sp.setText(formatUrlEncode(contentModel.content, "%"));
        sp.setSite(site);
        if (TextUtils.isEmpty(contentModel.icon_url))
            sp.setImageData(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_logo));
        else
            sp.setImageUrl(contentModel.icon_url);
        Platform qq = ShareSDK.getPlatform(QQ.NAME);
        qq.setPlatformActionListener(mPlatformActionListener);
        qq.share(sp);
    }

    public void qzone(ShareContentModel contentModel, PlatformActionListener mPlatformActionListener) {
        QZone.ShareParams sp = new QZone.ShareParams();
        sp.setTitle(contentModel.title);
        sp.setTitleUrl(contentModel.url);
        sp.setText(formatUrlEncode(contentModel.content, "%"));
        sp.setSite(site);
        if (TextUtils.isEmpty(contentModel.icon_url))
            sp.setImageData(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_logo));
        else
            sp.setImageUrl(contentModel.icon_url);
        Platform qzone = ShareSDK.getPlatform(QZone.NAME);
        qzone.setPlatformActionListener(mPlatformActionListener);
        qzone.share(sp);
    }

    public void weixin(ShareContentModel contentModel, PlatformActionListener mPlatformActionListener) {
        Wechat.ShareParams sp = new Wechat.ShareParams();
        sp.setTitle(contentModel.title);
        sp.setShareType(Platform.SHARE_WEBPAGE);
        sp.setText(formatUrlEncode(contentModel.content, "%"));
        if (TextUtils.isEmpty(contentModel.icon_url))
            sp.setImageData(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_logo));
        else
            sp.setImageUrl(contentModel.icon_url);
        sp.setUrl(contentModel.url);
        Platform weixin = ShareSDK.getPlatform(Wechat.NAME);
        weixin.setPlatformActionListener(mPlatformActionListener);
        weixin.share(sp);
    }

    public void circle(ShareContentModel contentModel, PlatformActionListener mPlatformActionListener) {
        WechatMoments.ShareParams sp = new WechatMoments.ShareParams();
        sp.setTitle(formatUrlEncode(contentModel.content, "%"));
        sp.setShareType(Platform.SHARE_WEBPAGE);
        sp.setText(formatUrlEncode(contentModel.content, "%"));
        if (TextUtils.isEmpty(contentModel.icon_url))
            sp.setImageData(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_logo));
        else
            sp.setImageUrl(contentModel.icon_url);
        sp.setUrl(contentModel.url);
        Platform circle = ShareSDK.getPlatform(WechatMoments.NAME);
        circle.setPlatformActionListener(mPlatformActionListener);
        circle.share(sp);
    }

    private String formatUrlEncode(String str, String stripChars) {
        if (str.contains(stripChars)) {
            try {
                str = str.replace(stripChars, URLEncoder.encode(stripChars, "UTF-8"));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
        return str;
    }

    public static void setAppKey(){
        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("Id", "1");
        hashMap.put("SortId", "1");
        hashMap.put("AppKey", "4196267309");
        hashMap.put("AppSecret", "dba57736a8362bc047184cd46dc0e3e0");
        hashMap.put("RedirectUrl", "http://shudu99.com/");
        hashMap.put("ShareByAppClient", "true");
        hashMap.put("Enable", "true");
        ShareSDK.setPlatformDevInfo(SinaWeibo.NAME, hashMap);

        hashMap.clear();
        hashMap.put("Id", "1");
        hashMap.put("SortId", "1");
        hashMap.put("AppId", "1105790933");
        hashMap.put("AppKey", "U29ACaOevpRqoMLc");
        hashMap.put("ShareByAppClient", "true");
        hashMap.put("Enable", "true");
        ShareSDK.setPlatformDevInfo(QQ.NAME, hashMap);
        ShareSDK.setPlatformDevInfo(QZone.NAME, hashMap);

        hashMap.clear();
        hashMap.put("Id", "1");
        hashMap.put("SortId", "1");
        hashMap.put("AppId", "wx81813cd157b8aed4");
        hashMap.put("AppSecret", "5c631b7903e33a4996913d31aad4e59d");
        hashMap.put("BypassApproval", "false");
        hashMap.put("Enable", "true");
        ShareSDK.setPlatformDevInfo(Wechat.NAME, hashMap);
        ShareSDK.setPlatformDevInfo(WechatMoments.NAME, hashMap);
    }
}
