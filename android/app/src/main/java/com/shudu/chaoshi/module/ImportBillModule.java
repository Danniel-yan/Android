package com.shudu.chaoshi.module;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.moxie.client.model.MxParam;
import com.shudu.chaoshi.BuildConfig;
import com.shudu.chaoshi.activity.ImportBillResultActivity;
import com.shudu.chaoshi.util.Constants;

import org.json.JSONObject;


/**
 * Created by yshr on 2017/5/3.
 */
public class ImportBillModule extends ReactContextBaseJavaModule {
    private Context mContext;
    private static final String MODULE_NAME = "ImportBillModule";
    private Promise mPromise;
    private String actName;


    private final ActivityEventListener myActivityEventListener = new ActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if(requestCode == Constants.REQUEST_ALIPAYJINGDONG && resultCode == Activity.RESULT_OK){
                Bundle b = data.getExtras();              //data为B中回传的Intent
                String result = b.getString("result");    //result即为回传的值(JSON格式)
                /**
                 *  result的格式如下：
                 *  1.1.没有进行账单导入(后台没有通知)
                 *      {"code" : -1, "function" : "mail", "searchId" : "", "taskId" : "}
                 *  1.2.服务不可用(后台没有通知)
                 *      {"code" : -2, "function" : "mail", "searchId" : "", "taskId" : "}
                 *  1.3.任务创建失败(后台没有通知)
                 *      {"code" : -3, "function" : "mail", "searchId" : "", "taskId" : "}
                 *  2.账单导入失败(后台有通知)
                 *      {"code" : 0, "function" : "mail", "searchId" : "3550622685459407187", "taskId" : "ce6b3806-57a2-4466-90bd-670389b1a112"}
                 *  3.账单导入成功(后台有通知)
                 *      {"code" : 1, "function" : "mail", "searchId" : "3550622685459407187", "taskId" : "ce6b3806-57a2-4466-90bd-670389b1a112"}
                 *  4.账单导入中(后台有通知)
                 *      {"code" : 2, "function" : "mail", "searchId" : "3550622685459407187", "taskId" : "ce6b3806-57a2-4466-90bd-670389b1a112"}
                 */
                String taskId = "";
                if (!TextUtils.isEmpty(result)) {
                    try {
                        int code = 0;
                        JSONObject jsonObject = new JSONObject(result);
                        code = jsonObject.getInt("code");
                        if (code == -1) {
                        } else if (code == 0) {
                            Intent intent = new Intent(mContext,
                                    ImportBillResultActivity.class);
                            intent.putExtra("actName", actName);
                            intent.putExtra("result", 0);
                            getCurrentActivity().startActivity(intent);
                        } else if (code == 1) {
                            switch (jsonObject.getString("function")) {
                                case "alipay":
                                case "jingdong":
                                    //支付宝、京东导入
                                    taskId = jsonObject.optString("taskId");
                                    break;
                                default:
                                    break;
                            }
                            Intent intent = new Intent(mContext,
                                    ImportBillResultActivity.class);
                            intent.putExtra("actName", actName);
                            intent.putExtra("result", 1);
                            getCurrentActivity().startActivity(intent);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                mPromise.resolve(taskId);
            }
//            switch (resultCode) {
//                case Activity.RESULT_OK:
//                    Bundle b = data.getExtras();              //data为B中回传的Intent
//                    String result = b.getString("result");    //result即为回传的值(JSON格式)
//                    /**
//                     *  result的格式如下：
//                     *  1.1.没有进行账单导入(后台没有通知)
//                     *      {"code" : -1, "function" : "mail", "searchId" : "", "taskId" : "}
//                     *  1.2.服务不可用(后台没有通知)
//                     *      {"code" : -2, "function" : "mail", "searchId" : "", "taskId" : "}
//                     *  1.3.任务创建失败(后台没有通知)
//                     *      {"code" : -3, "function" : "mail", "searchId" : "", "taskId" : "}
//                     *  2.账单导入失败(后台有通知)
//                     *      {"code" : 0, "function" : "mail", "searchId" : "3550622685459407187", "taskId" : "ce6b3806-57a2-4466-90bd-670389b1a112"}
//                     *  3.账单导入成功(后台有通知)
//                     *      {"code" : 1, "function" : "mail", "searchId" : "3550622685459407187", "taskId" : "ce6b3806-57a2-4466-90bd-670389b1a112"}
//                     *  4.账单导入中(后台有通知)
//                     *      {"code" : 2, "function" : "mail", "searchId" : "3550622685459407187", "taskId" : "ce6b3806-57a2-4466-90bd-670389b1a112"}
//                     */
//                    String taskId = "";
//                    if (!TextUtils.isEmpty(result)) {
//                        try {
//                            int code = 0;
//                            JSONObject jsonObject = new JSONObject(result);
//                            code = jsonObject.getInt("code");
//                            if (code == -1) {
//                            } else if (code == 0) {
//                                Intent intent = new Intent(mContext,
//                                        ImportBillResultActivity.class);
//                                intent.putExtra("actName", actName);
//                                intent.putExtra("result", 0);
//                                getCurrentActivity().startActivity(intent);
//                            } else if (code == 1) {
//                                switch (jsonObject.getString("function")) {
//                                    case "alipay":
//                                    case "jingdong":
//                                        //支付宝、京东导入
//                                        taskId = jsonObject.optString("taskId");
//                                        break;
//                                    default:
//                                        break;
//                                }
//                                Intent intent = new Intent(mContext,
//                                        ImportBillResultActivity.class);
//                                intent.putExtra("actName", actName);
//                                intent.putExtra("result", 1);
//                                getCurrentActivity().startActivity(intent);
//                            }
//                        } catch (Exception e) {
//                            e.printStackTrace();
//                        }
//                    }
//                    mPromise.resolve(taskId);
//                    break;
//                default:
//                    break;
//            }
        }

        @Override
        public void onNewIntent(Intent intent) {

        }
    };

    public ImportBillModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext.getBaseContext();
        reactContext.addActivityEventListener(myActivityEventListener);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void importJingdongBill(int userId, Promise promise) {
        String uuserId = String.valueOf(userId);
        mPromise = promise;
        actName = MxParam.PARAM_FUNCTION_JINGDONG;
        toActivity(uuserId);
    }

    @ReactMethod
    public void importAlipayBill(int userId, Promise promise) {
        String uuserId = String.valueOf(userId);
        mPromise = promise;
        actName = MxParam.PARAM_FUNCTION_ALIPAY;
        toActivity(uuserId);
    }

    private void toActivity(String userId) {
        String mUserId = userId;
        String mAgreementUrl = "https://api.51datakey.com/h5/agreement.html"; //SDK里显示的用户使用协议

        MxParam mxParam = new MxParam();
        mxParam.setUserId(mUserId);
        mxParam.setApiKey(BuildConfig.MOXIE_APIKEY);
        mxParam.setAgreementUrl(mAgreementUrl); // SDK里显示的用户使用协议
        mxParam.setFunction(actName); // 功能名
        mxParam.setQuitOnFail(MxParam.PARAM_COMMON_YES); // 爬取失败时是否退出SDK(登录阶段之后)

        Bundle bundle = new Bundle();
        bundle.putParcelable("param", mxParam);
        try {
            Intent intent = new Intent(mContext, com.moxie.client.MainActivity.class);
            intent.putExtras(bundle);
            getCurrentActivity().startActivityForResult(intent, Constants.REQUEST_ALIPAYJINGDONG);
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException("Could not open the activity : " + e.getMessage());
        }
    }
}
