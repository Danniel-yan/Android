package com.shudu.chaoshi.util;

import android.content.Context;
import android.graphics.BitmapFactory;

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

    public ShareUtil(Context context){
        this.context = context;
    }

    public void sina(ShareContentModel contentModel) {
        SinaWeibo.ShareParams sp = new SinaWeibo.ShareParams();
        sp.setText(formatUrlEncode(contentModel.content, "%") + contentModel.url);
        sp.setImageData(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_logo));
        Platform weibo = ShareSDK.getPlatform(SinaWeibo.NAME);
        weibo.setPlatformActionListener(mPlatformActionListener);
        weibo.share(sp);
    }

    public void qq(ShareContentModel contentModel) {
        QQ.ShareParams sp = new QQ.ShareParams();
        sp.setTitle(contentModel.title);
        sp.setTitleUrl(contentModel.url);
        sp.setText(formatUrlEncode(contentModel.content, "%"));
        sp.setSite("账单日");
        sp.setImageData(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_logo));
        Platform qq = ShareSDK.getPlatform(QQ.NAME);
        qq.setPlatformActionListener(mPlatformActionListener);
        qq.share(sp);
    }

    public void qzone(ShareContentModel contentModel) {
        QZone.ShareParams sp = new QZone.ShareParams();
        sp.setTitle(contentModel.title);
        sp.setTitleUrl(contentModel.url);
        sp.setText(formatUrlEncode(contentModel.content, "%"));
        sp.setSite("账单日");
        sp.setImageData(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_logo));
        Platform qzone = ShareSDK.getPlatform(QZone.NAME);
        qzone.setPlatformActionListener(mPlatformActionListener);
        qzone.share(sp);
    }

    public void weixin(ShareContentModel contentModel) {
        Wechat.ShareParams sp = new Wechat.ShareParams();
        sp.setTitle(contentModel.title);
        sp.setShareType(Platform.SHARE_WEBPAGE);
        sp.setText(formatUrlEncode(contentModel.content, "%"));
        sp.setImageData(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_logo));
        sp.setUrl(contentModel.url);
        Platform weixin = ShareSDK.getPlatform(Wechat.NAME);
        weixin.setPlatformActionListener(mPlatformActionListener);
        weixin.share(sp);
    }

    public void circle(ShareContentModel contentModel) {
        WechatMoments.ShareParams sp = new WechatMoments.ShareParams();
        sp.setTitle(formatUrlEncode(contentModel.content, "%"));
        sp.setShareType(Platform.SHARE_WEBPAGE);
        sp.setText(formatUrlEncode(contentModel.content, "%"));
        sp.setImageData(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_logo));
        sp.setUrl(contentModel.url);
        Platform circle = ShareSDK.getPlatform(WechatMoments.NAME);
        circle.setPlatformActionListener(mPlatformActionListener);
        circle.share(sp);
    }

    PlatformActionListener mPlatformActionListener = new PlatformActionListener() {
        @Override
        public void onComplete(Platform platform, int i, HashMap<String, Object> hashMap) {
            ToastHelper.getInstance().showToast("分享成功");

        }

        @Override
        public void onError(Platform platform, int i, Throwable throwable) {
            ToastHelper.getInstance().showToast("分享失败");

        }

        @Override
        public void onCancel(Platform platform, int i) {
            ToastHelper.getInstance().showToast("分享取消");

        }
    };

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
}
