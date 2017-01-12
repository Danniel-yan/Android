package com.shudu.chaoshi.util;

import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.media.ExifInterface;
import android.net.Uri;
import android.os.Environment;
import android.text.TextUtils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

/**
 * Created by ysr on 16/12/29.
 */
public class BitmapUtils {
    private static final File parentPath = Environment.getExternalStorageDirectory();
    private static String storagePath = "";
    private static final String DST_FOLDER_NAME = "pic_temp";
    public static String tmpPath = "";


    //（根据路径获取图片压缩并按比例大小压缩方法）：
    public static String getImageByPath(String srcPath) throws Exception {
        //开始读入图片，此时把options.inJustDecodeBounds 设回true了
        BitmapFactory.Options newOpts = new BitmapFactory.Options();
        newOpts.inJustDecodeBounds = true;
        //打开图片获取分辨率
        Bitmap bitmap = BitmapFactory.decodeFile(srcPath, newOpts);
        newOpts.inJustDecodeBounds = false;
        //传过来图片分辨率的宽度和高度
        int w = newOpts.outWidth;
        int h = newOpts.outHeight;
        //这里设置高度为800f
        //这里设置宽度为480f
        float hh = 240.0F;
        float ww = 320.0F;
        //缩放比。由于是固定比例缩放，只用高或者宽其中一个数据进行计算即可
        //be=1表示不缩放
        int be = 1;
        //如果宽度大的话根据宽度固定大小缩放
        if ((w > h) && (w > ww))
            be = (int) (newOpts.outWidth / ww);
            //如果高度高的话根据宽度固定大小缩放
        else if ((w < h) && (h > hh)) {
            be = (int) (newOpts.outHeight / hh);
        }
        if (be <= 0)
            be = 1;
        //设置缩放比例
        newOpts.inSampleSize = be;
        //重新读入图片，注意此时已经把options.inJustDecodeBounds 设回false了
        bitmap = BitmapFactory.decodeFile(srcPath, newOpts);
        //压缩好比例大小后再进行质量压缩
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        //质量压缩方法，这里100表示不压缩，把压缩后的数据存放到baos中
        int options = 100;
        bitmap.compress(Bitmap.CompressFormat.JPEG, options, baos);
        //循环判断如果压缩后图片是否大于80kb,大于继续压缩
        while (Base64.encode(baos.toByteArray()).length / 1024 > 90) {
            //重置baos即清空baos
            baos.reset();
            //每次都减少5
            options -= 5;
            //这里压缩options%，把压缩后的数据存放到baos中
            bitmap.compress(Bitmap.CompressFormat.JPEG, options, baos);
        }
        return new String(Base64.encode(baos.toByteArray()), "utf-8");
    }

    //（根据路径获取图片并按比例大小压缩方法）：
    public static String getImageByPathNew(String srcPath) throws Exception {
        //打开图片获取分辨率
        Bitmap bitmap = BitmapFactory.decodeFile(srcPath);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);
        return new String(Base64.encode(baos.toByteArray()), "utf-8");
    }

    /**
     * 保存图片到文件
     */
    public static boolean saveBmpToFile(Bitmap bmp, String path, Bitmap.CompressFormat format) {
        if (bmp == null || bmp.isRecycled())
            return false;

        OutputStream stream = null;
        try {
            File file = new File(path);
            File filePath = file.getParentFile();
            if (!filePath.exists()) {
                filePath.mkdirs();
            }
            if (!file.exists()) {
                try {
                    file.createNewFile();
                } catch (IOException e) {
                    e.printStackTrace();
                    return false;
                }
            }
            stream = new FileOutputStream(path);
            return bmp.compress(format, 80, stream);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return false;
        } finally {
            if (null != stream) {
                try {
                    stream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
//        return bmp.compress(format, 80, stream);
    }

    /**
     * 获取图片旋转角度
     */
    public static int getRotateDegree(Context context, Uri uri) {
        if (uri == null) {
            return 0;
        }
        String file = uri.getPath();
        if (TextUtils.isEmpty(file)) {
            return 0;
        }
        ExifInterface exif;
        try {
            exif = new ExifInterface(file);
        } catch (IOException e) {
            e.printStackTrace();
            return 0;
        }
        int orientation = exif.getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_UNDEFINED);
        int degree = 0;
        if (orientation != ExifInterface.ORIENTATION_UNDEFINED) {
            switch (orientation) {
                case ExifInterface.ORIENTATION_ROTATE_90:
                    degree = 90;
                    break;
                case ExifInterface.ORIENTATION_ROTATE_180:
                    degree = 180;
                    break;
                case ExifInterface.ORIENTATION_ROTATE_270:
                    degree = 270;
                    break;
                default:
                    degree = 0;
                    break;
            }
        } else {
            ContentResolver cr = context.getContentResolver();
            Cursor cursor = cr.query(uri, null, null, null, null);
            if (cursor != null) {
                cursor.moveToFirst();
                String orientationDb = cursor.getString(cursor.getColumnIndex("orientation"));
                cursor.close();
                if (!TextUtils.isEmpty(orientationDb)) {
                    degree = Integer.parseInt(orientationDb);
                }
            }
        }
        return degree;
    }

    /**
     * 旋转图片
     */
    public static Bitmap rotateBitmap(Bitmap b, int degrees) {
        if (degrees != 0 && b != null) {
            Matrix m = new Matrix();
            m.setRotate(degrees, (float) b.getWidth() / 2, (float) b.getHeight() / 2);
            try {
                Bitmap b2 = Bitmap.createBitmap(b, 0, 0, b.getWidth(), b.getHeight(), m, true);
                if (b != b2) {
                    b.recycle();
                    b = b2;
                }
            } catch (OutOfMemoryError ex) {

            }
        }
        return b;
    }

    /**
     * 压缩图片
     *
     * @param options   BitmapFactory.Options
     * @param reqWidth  要求的宽度
     * @param reqHeight 要求的高度
     * @return 返回 bitmap
     */
    public static int calculateInSampleSize(BitmapFactory.Options options, int reqWidth, int reqHeight) {
        final int height = options.outHeight;
        final int width = options.outWidth;
        int inSampleSize = 1;
        if (height > reqHeight || width > reqWidth) {
            final int heightRatio = (int) Math.ceil((float) height / (float) reqHeight);
            final int widthRatio = (int) Math.ceil((float) width / (float) reqWidth);
            inSampleSize = heightRatio < widthRatio ? heightRatio : widthRatio;
        }
        return inSampleSize;
    }

    /**
     * @param b
     */
    public static String saveBitmap(Bitmap b) {
        String path = "";
        try {
            path = initPath();
        } catch (Exception e) {
        }

        long dataTake = System.currentTimeMillis();
        String imgCaptureFace = dataTake + "";
        String jpegName = path + "/" + imgCaptureFace + ".jpg";

        BitmapUtils.saveBmpToFile(b, jpegName, Bitmap.CompressFormat.JPEG);
        tmpPath = jpegName;
        return jpegName;

    }


    public static String saveBitmap(Bitmap b, String name) {

        String path = "";
        try {
            path = initPath();
        } catch (Exception e) {
        }
//        long dataTake = System.currentTimeMillis();
        String jpegName = path + "/" + name + ".jpg";
        BitmapUtils.saveBmpToFile(b, jpegName, Bitmap.CompressFormat.JPEG);
        return jpegName;
    }

    /**
     * @return
     */
    public static String initPath() throws Exception {
        if (storagePath.equals("")) {
            storagePath = parentPath.getAbsolutePath() + "/" + DST_FOLDER_NAME;
            File f = new File(storagePath);
            if (!f.exists()) {
                f.mkdir();
            }
        }
        return storagePath;
    }
}
