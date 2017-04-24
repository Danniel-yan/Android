package com.shudu.chaoshi.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.moxie.client.model.MxParam;
import com.shudu.chaoshi.util.Constants;

import org.json.JSONObject;

/**
 * Created by speakJ on 2017/3/30.
 */

public class ImportBillActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        init();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (resultCode){
            case RESULT_OK:

                Bundle b = data.getExtras();              //data为B中回传的Intent
                String result = b.getString("result");    //result即为回传的值(JSON格式)
                Log.e("123", "result=" + result);
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

                if(TextUtils.isEmpty(result)) {
                    Toast.makeText(ImportBillActivity.this, "用户没有进行导入操作!", Toast.LENGTH_SHORT).show();
                } else {
                    try {
                        int code = 0;
                        String token = "8e289372f9f34c8fad6827a58a6f54b6";
                        JSONObject jsonObject = new JSONObject(result);

                        code = jsonObject.getInt("code");
                        if(code == -1) {
                            Toast.makeText(ImportBillActivity.this, "用户没有进行导入操作!", Toast.LENGTH_SHORT).show();
                        } else if(code == 0) {
                            Toast.makeText(ImportBillActivity.this, "导入失败!", Toast.LENGTH_SHORT).show();
                        } else if(code == 1) {
                            switch (jsonObject.getString("function")) {
                                case "alipay":
                                case "taobao":
                                case "jingdong":
                                    //支付宝、淘宝、京东导入
                                    openWebViewResult("https://api.51datakey.com/h5/result/" + jsonObject.getString("function") + "/?mappingId=" + jsonObject.getString("searchId") + "&token=" + token);
                                    break;
                                default:
                                    break;
                            }
                        }
                    } catch (Exception e){
                        e.printStackTrace();
                    }
                }
                break;
            default:
                break;
        }
    }

    private void init() {
        String mUserId = "userid_test";

        String mAgreementUrl = "https://api.51datakey.com/h5/agreement.html"; //SDK里显示的用户使用协议

        MxParam mxParam = new MxParam();
        mxParam.setUserId(mUserId);
        mxParam.setApiKey(Constants.MOXIE_APIKEY);
        mxParam.setAgreementUrl(mAgreementUrl); // SDK里显示的用户使用协议
        mxParam.setFunction(getIntent().getStringExtra("name")); // 功能名
        mxParam.setQuitOnFail(MxParam.PARAM_COMMON_YES); // 爬取失败时是否退出SDK(登录阶段之后)

        Bundle bundle = new Bundle();
        bundle.putParcelable("param", mxParam);
        Intent intent = new Intent(ImportBillActivity.this, com.moxie.client.MainActivity.class);
        intent.putExtras(bundle);
        startActivityForResult(intent, 0);

    }

    private void openWebViewResult(String str){
        Log.d("123",str);
    }

}
