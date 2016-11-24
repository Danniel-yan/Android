package com.shudu.chaoshi.util;

import android.content.Context;

import com.umeng.analytics.MobclickAgent;

import java.util.Map;

/**
 * Created by speakJ on 16/9/19.
 */
public class AnalysisUtil {
    public static final int TYPE_UMENG = 0;
    private final int mCurType;
    private Context mContext;

    private AnalysisUtil(int type) {
        mCurType = type;
    }

    private AnalysisUtil(Context context) {
        mCurType = 0;
        mContext = context;
    }

    public void sendEvent(String eventName) {
        try {
            switch (mCurType) {
                case TYPE_UMENG:
                    MobclickAgent.onEvent(mContext, eventName);
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendEvent(String eventName, Map<String, String> map) {
        try {
            switch (mCurType) {
                case TYPE_UMENG:
                    MobclickAgent.onEventValue(mContext, eventName, map, 1);
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static AnalysisUtil create(int type) {
        return new AnalysisUtil(type);
    }

    public static AnalysisUtil create(Context context) {
        return new AnalysisUtil(context);
    }

}
