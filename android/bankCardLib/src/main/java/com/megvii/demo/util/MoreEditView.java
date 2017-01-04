package com.megvii.demo.util;

import android.content.Context;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Gravity;
import android.view.inputmethod.EditorInfo;
import android.widget.EditText;
import android.widget.LinearLayout;

import com.megvii.demo.R;

/**
 * Created by yuchenwen on 16/2/18.
 */
public class MoreEditView extends LinearLayout {

    private static final String TAG = MoreEditView.class.toString();
    private static final int editID = 123456789;
    private String str;
    private String[] strs;
    private int strsNum, strNum;
    private Context mContext;
    private int width, height;

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        super.onLayout(changed, l, t, r, b);
        width = r - l;
        height = b - t;
//        Log.w(TAG, "onLayout: l===" + l + ", t==" + t + ", r===" + r + ", b===" + b + ", width===" + width + ", height==" + height);
//        Log.w(TAG, "setStr: strsNum==" + strsNum + ", strNum===" + strNum);
        for (int i = 0; i < strsNum; i++) {
            int editEidth = width * strs[i].length() / strNum - 4;
            Log.w(TAG, "setStr: editEidth==" + editEidth + ", strs[i].length()===" + strs[i].length() + ", width * strs[i].length()===" + width * strs[i].length());
            LayoutParams params = new LayoutParams(editEidth, height);
            EditText edittext = new EditText(mContext);
            edittext.setId(editID + i);
            edittext.setText(strs[i]);
            edittext.setPadding(0, 0, 0, 0);
            edittext.setTextColor(0XFFFFFFFF);
            edittext.setTextSize(21);
            edittext.setInputType(EditorInfo.TYPE_CLASS_PHONE);
            edittext.setSingleLine();
            edittext.setGravity(Gravity.CENTER);
            edittext.setBackgroundResource(R.drawable.bg_nothing);
            params.setMargins(2, 0, 2, 0);
            addView(edittext, params);

        }
    }

    public void setStr(String str) {
        this.str = str;
        strs = str.split(" ");
        strsNum = strs.length;
        strNum = str.length() - strsNum + 1;

    }

    public MoreEditView(Context context) {
        super(context);

        init(context);
    }

    public MoreEditView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }

    private void init(Context context) {
        this.mContext = context;
    }

    public String getNumText(){
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < strsNum; i++){
            EditText edit = (EditText) findViewById(editID + i);
            String str = edit.getText().toString();
            sb.append(str);
        }

        return sb.toString();
    }
}
