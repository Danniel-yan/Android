package com.shudu.chaoshi.util;

import android.content.Context;

import com.megvii.idcardlib.util.Util;
import com.megvii.idcardquality.IDCardQualityLicenseManager;
import com.megvii.licensemanager.Manager;
import com.megvii.livenessdetection.LivenessLicenseManager;

/**
 * Created by yshr on 16/12/30.
 */

public class FaceInit {

    public static void netWorkWarranty(final Context context) {
        final String uuid = Util.getUUIDString(context);
        new Thread(new Runnable() {
            @Override
            public void run() {
                Manager manager = new Manager(context);
                IDCardQualityLicenseManager idCardLicenseManager = new IDCardQualityLicenseManager(
                        context);
                LivenessLicenseManager licenseManager = new LivenessLicenseManager(context);
                manager.registerLicenseManager(idCardLicenseManager);
                manager.registerLicenseManager(licenseManager);
                manager.takeLicenseFromNetwork(uuid);

            }
        }).start();
    }

    ;
}
