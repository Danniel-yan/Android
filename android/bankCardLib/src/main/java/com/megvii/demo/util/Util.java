package com.megvii.demo.util;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.hardware.Camera;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.telephony.TelephonyManager;
import android.util.Base64;
import android.util.Log;
import android.view.inputmethod.InputMethodManager;

import com.megvii.demo.R;

/**
 * Created by binghezhouke on 15-8-12.
 */
public class Util {
	
	/**
	 * 隐藏软键盘
	 */
	public static void isGoneKeyBoard(Activity activity) {
		if (activity.getCurrentFocus() != null) {
			// 隐藏软键盘
			((InputMethodManager) activity
					.getSystemService(activity.INPUT_METHOD_SERVICE))
					.hideSoftInputFromWindow(activity.getCurrentFocus()
							.getWindowToken(),
							InputMethodManager.HIDE_NOT_ALWAYS);
		}
	}

	public static final String KEY_TITLE = "key_title";
	public static final String KEY_ISDEBUGE = "key_isdebuge";
	public static final String KEY_ISALLCARD = "key_isallcard";
	
	public static String getUUIDString(Context mContext) {
		String KEY_UUID = "key_uuid";
		SharedUtil sharedUtil = new SharedUtil(mContext);
		String uuid = sharedUtil.getStringValueByKey(KEY_UUID);
		if (uuid != null)
			return uuid;

		uuid = getPhoneNumber(mContext);
		Log.w("ceshi", "uuid====" + uuid);
		if (uuid == null || uuid.trim().length() == 0) {
			uuid = getMacAddress(mContext);
			if (uuid == null || uuid.trim().length() == 0) {
				uuid = getDeviceID(mContext);
				if (uuid == null || uuid.trim().length() == 0) {
					uuid = UUID.randomUUID().toString();
					uuid = Base64.encodeToString(uuid.getBytes(), Base64.DEFAULT);
				}
			}
		}
		sharedUtil.saveStringValue(KEY_UUID, uuid);
		return uuid;
	}

	public static String getPhoneNumber(Context mContext) {
		TelephonyManager phoneMgr = (TelephonyManager) mContext
				.getSystemService(Context.TELEPHONY_SERVICE);
		return phoneMgr.getLine1Number();
	}

	public static String getDeviceID(Context mContext) {
		TelephonyManager tm = (TelephonyManager) mContext
				.getSystemService(Context.TELEPHONY_SERVICE);
		return tm.getDeviceId();
	}

	public static String getMacAddress(Context mContext) {
		WifiManager wifi = (WifiManager) mContext
				.getSystemService(Context.WIFI_SERVICE);
		WifiInfo info = wifi.getConnectionInfo();
		String address = info.getMacAddress();
		if(address != null && address.length() > 0){
			address = address.replace(":", "");
		}
		return address;
	}
	
	public static Camera.Size getNearestRatioSize(Camera.Parameters para,
			final int screenWidth, final int screenHeight) {
		List<Camera.Size> supportedSize = para.getSupportedPreviewSizes();
		for (Camera.Size tmp : supportedSize) {
			if (tmp.width == 1280 && tmp.height == 720) {
				return tmp;
			}
		}
		Collections.sort(supportedSize, new Comparator<Camera.Size>() {
			@Override
			public int compare(Camera.Size lhs, Camera.Size rhs) {
				int diff1 = (((int) ((1000 * (Math.abs(lhs.width
						/ (float) lhs.height - screenWidth
						/ (float) screenHeight))))) << 16)
						- lhs.width;
				int diff2 = (((int) (1000 * (Math.abs(rhs.width
						/ (float) rhs.height - screenWidth
						/ (float) screenHeight)))) << 16)
						- rhs.width;

				return diff1 - diff2;
			}
		});

		return supportedSize.get(0);
	}
	
	
//    public static Camera.Size getNearestRatioSize(Camera.Parameters para, final int screenWidth, final int screenHeight) {
//        List<Camera.Size> supportedSize = para.getSupportedPreviewSizes();
//        Collections.sort(supportedSize, new Comparator<Camera.Size>() {
//            @Override
//            public int compare(Camera.Size lhs, Camera.Size rhs) {
//                int diff1 = (((int) ((1000 * (Math.abs(lhs.width / (float) lhs.height -
//                        screenWidth / (float) screenHeight))))) << 16) + lhs.width;
//                int diff2 = (((int) (1000 * (Math.abs(rhs.width / (float) rhs.height -
//                        screenWidth / (float) screenHeight)))) << 16) + rhs.width;
//
//                return diff1 - diff2;
//            }
//        });
//
//        return supportedSize.get(0);
//    }

    public static String getTimeStr() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddhhmmss");
        return simpleDateFormat.format(new Date());
    }

    public static void closeStreamSilently(OutputStream os) {
        if (os != null) {
            try {
                os.close();
            } catch (IOException e) {

            }
        }
    }

    public static byte[] bmp2byteArr(Bitmap bmp) {
        if (bmp == null || bmp.isRecycled())
            return null;
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bmp.compress(Bitmap.CompressFormat.JPEG, 80, byteArrayOutputStream);
        Util.closeStreamSilently(byteArrayOutputStream);
        return byteArrayOutputStream.toByteArray();
    }

//    public static String errorType2HumanStr(IDCardQualityResult.IDCardFailedType type, IDCardAttr.IDCardSide side) {
//        String result = null;
//        switch (type) {
//            case QUALITY_FAILED_TYPE_NOIDCARD:
//                result = "未检测到身份证";
//                break;
//            case QUALITY_FAILED_TYPE_BLUR:
//                result = "模糊";
//                break;
//            case QUALITY_FAILED_TYPE_BRIGHTNESSTOOHIGH:
//                result = "太亮";
//                break;
//            case QUALITY_FAILED_TYPE_BRIGHTNESSTOOLOW:
//                result = "太暗";
//                break;
//            case QUALITY_FAILED_TYPE_OUTSIDETHEROI:
//                result = "请将身份证摆到提示框内";
//                break;
//            case QUALITY_FAILED_TYPE_SIZETOOLARGE:
//                result = "请离远些拍摄";
//                break;
//            case QUALITY_FAILED_TYPE_SIZETOOSMALL:
//                result = "请靠近些拍摄";
//                break;
//            case QUALITY_FAILED_TYPE_SPECULARHIGHLIGHT:
//                result = "请调整拍摄位置，以去除光斑";
//                break;
//            case QUALITY_FAILED_TYPE_TILT:
//                result = "请将身份证摆正";
//                break;
//            case QUALITY_FAILED_TYPE_SHADOW:
//    			result = "有阴影";
//    			break;
//            case QUALITY_FAILED_TYPE_WRONGSIDE:
//                if (side == IDCardAttr.IDCardSide.IDCARD_SIDE_BACK)
//                    result = "请翻到反面";
//                else {
//                    result = "请翻到正面";
//                }
//                break;
//        }
//        return result;
//    }

    public static byte[] readModel(Context context) {
        InputStream inputStream = null;
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int count = -1;
        try {
            inputStream = context.getResources().openRawResource(R.raw.bankcardmodel);
            while ((count = inputStream.read(buffer)) != -1) {
                byteArrayOutputStream.write(buffer, 0, count);
            }
            byteArrayOutputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        
        byte[] bytes = byteArrayOutputStream.toByteArray();
        return bytes;
    }
    
    /**
	 * 保存bitmap至指定Picture文件夹
	 */
	public static String saveBitmap(Context mContext, Bitmap bitmaptosave) {
		if (bitmaptosave == null)
			return null;

		File mediaStorageDir = mContext
				.getExternalFilesDir("bankcardimage");

		if (!mediaStorageDir.exists()) {
			if (!mediaStorageDir.mkdirs()) {
				return null;
			}
		}
		String bitmapFileName = System.currentTimeMillis() + ""
				+ new Random().nextInt(1000000) + ".jpg";
		// String bitmapFileName = System.currentTimeMillis() + "";
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(mediaStorageDir + "/" + bitmapFileName);
			boolean successful = bitmaptosave.compress(
					Bitmap.CompressFormat.JPEG, 75, fos);

			if (successful)
				return mediaStorageDir.getAbsolutePath() + "/" + bitmapFileName;
			else
				return null;
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return null;
		} finally {
			try {
				fos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
