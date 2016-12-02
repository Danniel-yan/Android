package com.shudu.chaoshi.util;

import android.content.Context;
import android.text.TextUtils;

import java.util.Set;

import cn.jpush.android.api.JPushInterface;
import cn.jpush.android.api.TagAliasCallback;

/**
 * Created by speakJ on 2016/11/28.
 */

public class JpushUtil {
    public static void init(final Context context) {
        JPushInterface.init(context);
        JPushInterface.setDebugMode(false);
    }

    public static void setAlias(final Context context, final String alias) {
        if (!TextUtils.isEmpty(alias)) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    JPushInterface.setAlias(context, alias, new TagAliasCallback() {
                        @Override
                        public void gotResult(int i, String s, Set<String> set) {

                        }
                    });
                }
            }).start();
        }
    }

    public static void setAliasAndTags(final Context context, final String alias, final Set<String> tags) {
        if (!TextUtils.isEmpty(alias) || (tags != null && tags.size() > 0)) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    JPushInterface.setAliasAndTags(context, alias, tags, new TagAliasCallback() {
                        @Override
                        public void gotResult(int i, String s, Set<String> set) {

                        }
                    });
                }
            }).start();
        }
    }
}
