package com.phonegap.natives.tool.dialog;

import android.content.Context;
import android.content.DialogInterface;
import android.support.v7.app.AlertDialog;

/**
 * Created by Trust on 2017/3/13.
 */
public class DialogTool {

    public static void showDialog(Context context,String title,String msg)
    {
        synchronized (context)
        {


        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle(title);
        builder.setMessage(msg);
        builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                    dialog.dismiss();
            }
        });
        AlertDialog dialog = builder.create();
        dialog.show();
        }
    }
}
