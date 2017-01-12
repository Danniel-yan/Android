package com.shudu.chaoshi.util;

import android.content.Context;

import com.megvii.licensemanager.Manager;
import com.megvii.livenessdetection.LivenessLicenseManager;
import com.megvii.livenesslib.util.ConUtil;

/**
 * Created by yshr on 17/01/12.
 */

public class FaceLivenessInit {

        public static void netWorkWarranty ( final Context context){
            final String uuid = ConUtil.getUUIDString(context);
            new Thread(new Runnable() {
                @Override
                public void run() {
                    Manager manager = new Manager(context);
                    LivenessLicenseManager licenseManager = new LivenessLicenseManager(context);
                    manager.registerLicenseManager(licenseManager);
                    manager.takeLicenseFromNetwork(uuid);

                }
            }).start();
        }
        ;
    }