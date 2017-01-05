/**
 * Copyright (c) 2013 Cangol
 * <p/>
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p/>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p/>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.shudu.chaoshi.util;

import android.app.ActivityManager;
import android.app.ActivityManager.RunningAppProcessInfo;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.Signature;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.WindowManager;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.lang.reflect.Field;
import java.security.MessageDigest;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

public class DeviceInfo {
    public static final String SPECIAL_IMEI = "000000000000000";
    public static final String SPECIAL_ANDROID_ID = "9774d56d682e549c";
    public static final String ANTEATER = "ANTEATER";

    public static String getOS() {
        return "Android";
    }

    public static String getOSVersion() {
        return Build.VERSION.RELEASE;
    }

    public static String getManufacturer() {
        return Build.MANUFACTURER;
    }

    public static String getDeviceModel() {
        return Build.MODEL;
    }

    public static String getDeviceBrand() {
        return Build.BRAND;
    }

    public static String getMobileInfo() {
        StringBuilder sb = new StringBuilder();
        try {

            Field[] fields = Build.class.getDeclaredFields();
            for (Field field : fields) {
                field.setAccessible(true);
                String name = field.getName();
                String value = field.get(null).toString();
                sb.append(name).append("=").append(value);
                sb.append("\n");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sb.toString();
    }

    public static String getCPUInfo() {
        try {
            byte[] bs = new byte[1024];
            RandomAccessFile reader = new RandomAccessFile("/proc/cpuinfo", "r");
            reader.read(bs);
            String ret = new String(bs);
            int index = ret.indexOf(0);
            if (index != -1) {
                return ret.substring(0, index);
            } else {
                return ret;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }

    public static String getResolution(Context context) {
        WindowManager wm = (WindowManager) context
                .getSystemService(Context.WINDOW_SERVICE);

        Display display = wm.getDefaultDisplay();

        DisplayMetrics metrics = new DisplayMetrics();
        display.getMetrics(metrics);

        return metrics.heightPixels + "x" + metrics.widthPixels;
    }

    public static DisplayMetrics getDisplayMetrics(Context context) {
        return context.getResources().getDisplayMetrics();
    }

    public static float getFloatDensity(Context context) {
        DisplayMetrics displayMetrics = context.getResources().getDisplayMetrics();
        return displayMetrics.density;
    }

    public static String getOperator(Context context) {
        TelephonyManager manager = (TelephonyManager) context
                .getSystemService(Context.TELEPHONY_SERVICE);
        return manager.getNetworkOperatorName();
    }

    public static String getLocale() {
        Locale locale = Locale.getDefault();
        return locale.getLanguage() + "_" + locale.getCountry();
    }

    public static String getLanguage() {
        Locale locale = Locale.getDefault();
        return locale.getLanguage();
    }

    public static String getCountry() {
        Locale locale = Locale.getDefault();
        return locale.getCountry();
    }

    public static String getAppVersion(Context context) {
        String result = "";
        try {
            result = context.getPackageManager().getPackageInfo(
                    context.getPackageName(), 0).versionName;
        } catch (NameNotFoundException e) {
        }
        return result;
    }

    public static int getAppVersionCode(Context context) {
        int result = 0;
        try {
            result = context.getPackageManager().getPackageInfo(
                    context.getPackageName(), 0).versionCode;
        } catch (NameNotFoundException e) {
        }
        return result;
    }


    public static String getAppMetaData(Context context, String key) {
        String data = null;
        ApplicationInfo appInfo;
        try {
            appInfo = context.getPackageManager().getApplicationInfo(
                    context.getPackageName(), PackageManager.GET_META_DATA);
            data = appInfo.metaData.getString(key);
        } catch (NameNotFoundException e) {
        }
        return data;
    }

    public static String getPhoneModel() {
        return Build.MODEL;
    }

    public static String getMacAddress(Context context) {
        WifiManager manager = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
        WifiInfo wifiInfo = manager.getConnectionInfo();
        String macAddress = wifiInfo.getMacAddress();
        if (TextUtils.isEmpty(macAddress) || "00:00:00:00:00:00".equals(macAddress)) {
            macAddress = getIMEI(context);
        }
        return macAddress;
    }

    public static int getIpAddress(Context context) {
        int ipAddress = 0;
        WifiManager wifiManager = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
        WifiInfo wifiInfo = wifiManager.getConnectionInfo();
        if (wifiInfo == null || wifiInfo.equals("")) {
            return ipAddress;
        } else {
            ipAddress = wifiInfo.getIpAddress();
        }
        return ipAddress;
    }

//    public static String getIpStr(Context context) {
//        int ipAddress = getIpAddress(context);
//        return String.format(context.getString(R.string.common_ip_format), (ipAddress & 0xff),
//                (ipAddress >> 8 & 0xff), (ipAddress >> 16 & 0xff),
//                (ipAddress >> 24 & 0xff));
//    }

    public static String getCharset() {
        return System.getProperty("file.encoding");
    }

    public static String getIMEI(Context context) {
        String imei = ((TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE))
                .getDeviceId();
        if (null == imei || imei.trim().equals("")) {
            imei = getDeviceId(context);
        }
        return imei;
    }

    public static String getDeviceId(Context pContext) {

        if (pContext == null)
            return "";

        String deviceToken = null;


        TelephonyManager telephonyManager = (TelephonyManager) pContext
                .getSystemService(Context.TELEPHONY_SERVICE);


        String tmDevice = "" + telephonyManager.getDeviceId();
        String tmSerial = "" + telephonyManager.getSimSerialNumber();
        String androidId = ""
                + android.provider.Settings.Secure.getString(
                pContext.getContentResolver(),
                android.provider.Settings.Secure.ANDROID_ID);
        UUID deviceUuid = new UUID(androidId.hashCode(),
                ((long) tmDevice.hashCode() << 32) | tmSerial.hashCode()
                        | ANTEATER.hashCode());

        String uniqueId = deviceUuid.toString();

        deviceToken = uniqueId;// 00000000-7a48-5a0a-22a5-c1db1d04d453

        return deviceToken;
    }

    public static String getNetworkType(Context context) {
        ConnectivityManager connMgr = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        if (networkInfo != null) {
            return networkInfo.getTypeName();
        } else {
            return "UNKNOWN";
        }
    }

    public static boolean isWifiConnection(Context context) {
        final ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        final NetworkInfo networkInfo = cm.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
        return networkInfo != null && networkInfo.isConnected();
    }

    public static boolean isConnection(Context context) {
        final ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        final NetworkInfo networkInfo = cm.getActiveNetworkInfo();
        return !(networkInfo == null || !networkInfo.isConnectedOrConnecting());
    }

    public static boolean isGPSLocation(Context context) {
        LocationManager locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        return locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
    }

    public static boolean isNetworkLocation(Context context) {
        LocationManager locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        return locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
    }

//	public static String getMD5Fingerprint(Context context) {
//	    PackageInfo info;
//	    try {
//	        info = context.getPackageManager().getPackageInfo(context.getPackageName(), PackageManager.GET_SIGNATURES);
//	        for (Signature signature : info.signatures) {
//	        	String something=StringUtils.md5(signature.toByteArray());
//	            return something;
//	        }
//	    } catch (NameNotFoundException e1) {
//            Logger.e("name not found", e1.toString());
//	    } catch (Exception e) {
//            Logger.e("exception", e.toString());
//	    }
//		return null;
//	}

    public static String getSHA1Fingerprint(Context context) {
        PackageInfo info;
        try {
            info = context.getPackageManager().getPackageInfo(context.getPackageName(), PackageManager.GET_SIGNATURES);
            for (Signature signature : info.signatures) {
                MessageDigest md = MessageDigest.getInstance("SHA1");
                md.update(signature.toByteArray());
                String something = new String(md.digest());
                return something;
            }
        } catch (NameNotFoundException e1) {
            Log.e("name not found", e1.toString());
        } catch (Exception e) {
            Log.e("exception", e.toString());
        }
        return null;
    }

    /**
     * return application is background
     *
     * @param context
     * @return
     */
    public static boolean isBackground(Context context) {

        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<RunningAppProcessInfo> appProcesses = activityManager.getRunningAppProcesses();
        if (appProcesses == null) {
            return false;
        }
        for (RunningAppProcessInfo appProcess : appProcesses) {
            if (appProcess.processName.equals(context.getPackageName())) {
                return appProcess.importance == RunningAppProcessInfo.IMPORTANCE_BACKGROUND || appProcess.importance == RunningAppProcessInfo.IMPORTANCE_PERCEPTIBLE;
            }
        }
        return false;
    }
}
