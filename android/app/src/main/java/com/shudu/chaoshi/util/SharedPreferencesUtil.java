package com.shudu.chaoshi.util;

import android.content.Context;
import android.content.SharedPreferences;

import com.shudu.chaoshi.MainApplication;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;


public class SharedPreferencesUtil {

    private static SharedPreferencesUtil instance;
    private SharedPreferences settings;

    private SharedPreferencesUtil(Context context) {
        settings = context.getSharedPreferences(Constants.DATABASE_NAME, Context.MODE_PRIVATE);
    }

    public static SharedPreferencesUtil getInstance(Context context) {

        if (null == context)
            context = MainApplication.getMyApplicationContext();

        if (null == context)
            throw new NullPointerException("MyApplication 未初始化?");
        if (instance == null) {
            synchronized (SharedPreferencesUtil.class) {
                if (instance == null)
                    instance = new SharedPreferencesUtil(
                            context.getApplicationContext());
            }
        }

        return instance;

    }

    public boolean saveString(String key, String value) {
        return settings.edit().putString(key, value).commit();
    }

    public void applyString(String key, String value) {
        settings.edit().putString(key, value).apply();
    }

    public String getString(String key) {
        return settings.getString(key, "");
    }

    public void saveInt(String key, int value) {
        settings.edit().putInt(key, value).commit();
    }

    public void applyInt(String key, int value) {
        settings.edit().putInt(key, value).apply();
    }

    public int getInt(String key, int defaultValue) {
        return settings.getInt(key, defaultValue);
    }

    public Double getOptDouble(String key) {
        String retStr = settings.getString(key, null);
        Double ret = null;
        try {
            ret = Double.parseDouble(retStr);
        } catch (Exception e) {
        }
        return ret;
    }

    public Boolean getOptBoolean(String key) {
        String retStr = settings.getString(key, null);
        Boolean ret = null;
        try {
            ret = Boolean.parseBoolean(retStr);
        } catch (Exception e) {
        }
        return ret;
    }

    public Double getDouble(String key) {
        String retStr = settings.getString(key, null);
        Double ret = null;
        try {
            if (retStr != null) {
                ret = Double.parseDouble(retStr);
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
        return ret;
    }

    public void saveHashMap(final String key, HashMap<String, String> map) {
        final JSONObject ret = new JSONObject(map);
        settings.edit().putString(key, ret.toString()).commit();
    }

    public HashMap<String, String> getHashMapByKey(String key) {
        HashMap<String, String> ret = new HashMap<String, String>();
        String mapStr = settings.getString(key, "{}");
        JSONObject mapJson = null;
        try {
            mapJson = new JSONObject(mapStr);
        } catch (Exception e) {
            return ret;
        }

        if (mapJson != null) {
            Iterator<String> it = mapJson.keys();
            while (it.hasNext()) {
                String theKey = it.next();
                String theValue = mapJson.optString(theKey);
                ret.put(theKey, theValue);
            }
        }
        return ret;
    }

    public void saveBoolean(String key, boolean bool) {
        settings.edit().putBoolean(key, bool).commit();
    }

    public void applyBoolean(String key, boolean bool) {
        settings.edit().putBoolean(key, bool).apply();
    }

    public boolean getBoolean(String key) {
        return settings.getBoolean(key, false);
    }

    public boolean getBoolean(String key, boolean is) {
        return settings.getBoolean(key, is);
    }

//    public void saveArrayList(String key, ArrayList<String> list) {
//        settings.edit().putString(key, GsonHelper.getGson().toJson(list)).commit();
//    }

    public ArrayList<String> getArrayList(String key) {
        ArrayList<String> ret = new ArrayList<String>();
        String listStr = settings.getString(key, "{}");
        JSONArray listJson = null;
        try {
            listJson = new JSONArray(listStr);
        } catch (Exception e) {
            return ret;
        }

        if (listJson != null) {
            for (int i = 0; i < listJson.length(); i++) {
                String temp = listJson.optString(i);
                ret.add(temp);
            }
        }
        return ret;
    }

    public void removeByKey(String key) {
        settings.edit().remove(key).commit();
    }

    public boolean contains(String alarmHour) {
        return settings.contains(alarmHour);
    }
}
