package com.shudu.chaoshi.util;

import android.content.Context;
import android.graphics.BitmapFactory;

import com.megvii.livenessdetection.bean.FaceIDDataStruct;

import java.util.HashMap;

/**
 * 代码参考
 * <p>
 * 这里写了一些代码帮助（仅供参考）
 */
public class CodeHelp {

    /**
     * 获取活体检测的BestImage和Delta 注意：需要在活体检测成功后调用
     * <p>
     * 如何获取idDataStruct： （从活体检测器中获取） FaceIDDataStruct idDataStruct =
     * detector.getFaceIDDataStruct();
     */
    public static void getBestImageAndDelta(FaceIDDataStruct idDataStruct) {
        String delta = idDataStruct.delta; // 获取delta；
        HashMap<String, byte[]> images = (HashMap<String, byte[]>) idDataStruct.images;// 获取所有图片
        for (final String key : idDataStruct.images.keySet()) {
            final byte[] data = idDataStruct.images.get(key);
            new Thread(new Runnable() {
                @Override
                public void run() {
                    BitmapUtils.saveBitmap(BitmapFactory.decodeByteArray(data, 0, data.length), key);
                }
            }).start();
            if (key.equals("image_best")) {
                byte[] imageBestData = data;// 这是最好的一张图片
            } else if (key.equals("image_env")) {
                byte[] imageEnvData = data;// 这是一张全景图
            } else {
                // 其余为其他图片，根据需求自取
//				image_action1
//				image_action2
//				image_action3
            }
        }
    }

}