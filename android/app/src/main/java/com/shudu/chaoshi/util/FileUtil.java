package com.shudu.chaoshi.util;

import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.os.Environment;

import java.io.File;

/**
 * Created by ysr on 16/12/29.
 */
public class FileUtil {
    private static final File parentPath = Environment.getExternalStorageDirectory();
    private static String storagePath = "";
    private static final String DST_FOLDER_NAME = "pic_temp";
    public static String tmpPath = "";

    /**
     * @return
     */
    private static String initPath() throws Exception {
        if (storagePath.equals("")) {
            storagePath = parentPath.getAbsolutePath() + "/" + DST_FOLDER_NAME;
            File f = new File(storagePath);
            if (!f.exists()) {
                f.mkdir();
            }
        }
        return storagePath;
    }

    /**
     *
     * @param b
     */
    public static String saveBitmap(Bitmap b) {
        String path = "";
        try {
            path = initPath();
        } catch (Exception e) {
        }

		long dataTake = System.currentTimeMillis();
        String imgCaptureFace = dataTake+"";
        String jpegName = path + "/" + imgCaptureFace + ".jpg";

        BitmapUtils.saveBmpToFile(b, jpegName, CompressFormat.JPEG);
        tmpPath = jpegName;
        return jpegName;

    }


    public static String saveBitmap(Bitmap b, String name) {

        String path = "";
        try {
            path = initPath();
        } catch (Exception e) {
        }
        long dataTake = System.currentTimeMillis();
        String jpegName = path + "/" + name + "_" + dataTake + ".jpg";
        BitmapUtils.saveBmpToFile(b, jpegName, CompressFormat.JPEG);
        return jpegName;
    }


}
