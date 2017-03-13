package com.phonegap.natives.tool.push;

import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AlertDialog;
import android.view.WindowManager;
import android.widget.Toast;

import com.baidu.android.pushservice.PushMessageReceiver;
import com.phonegap.ebike.MainActivity;
import com.phonegap.ebike.R;
import com.phonegap.natives.activity.GPSHistoryActivity;
import com.phonegap.natives.activity.MapActivity;
import com.phonegap.natives.tool.EBikeConstant;
import com.phonegap.natives.tool.L;
import com.phonegap.natives.tool.ToastUtil;

import java.util.List;

/**
 * Created by Trust on 2017/3/13.
 */
public class PushTool extends PushMessageReceiver {

    public static Handler handler;

    public Handler getHandler() {
        return handler;
    }



    @Override
    public void onBind(Context context, int i, String s, String s1, String s2, String s3) {

        L.i("onBin i:"+i+"| s:"+s+"| s1 :"+s1+"|s2:"+s2+"|s3:"+s3);
        if(i == 0 && s2 != null)
        {
            PushId.ID = s2;
        }
    }



    @Override
    public void onUnbind(Context context, int i, String s) {
        L.i("onUnbind");
    }

    @Override
    public void onSetTags(Context context, int i, List<String> list, List<String> list1, String s) {
        L.i("onSetTags");
    }

    @Override
    public void onDelTags(Context context, int i, List<String> list, List<String> list1, String s) {
        L.i("onDelTags");
    }

    @Override
    public void onListTags(Context context, int i, List<String> list, String s) {
        L.i("onListTags");
    }

    @Override
    public void onMessage(Context context, String s, String s1) {
        L.i("onMessage");
    }

    @Override
    public void onNotificationClicked(Context context, String s, String s1, String s2) {
        L.i("onNotificationClicked");
        Toast.makeText(context, "onNotificationClicked", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onNotificationArrived(Context context, String s, String s1, String s2) {
        L.i("onNotificationArrived"+handler);
        Toast.makeText(context, "onNotificationArrived", Toast.LENGTH_SHORT).show();
        Message message = new Message();
        message.what = EBikeConstant.DIALOG;
        handler.sendMessage(message);

    }
}
