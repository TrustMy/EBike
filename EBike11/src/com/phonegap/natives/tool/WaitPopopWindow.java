package com.phonegap.natives.tool;

import android.content.Context;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.view.animation.LinearInterpolator;
import android.widget.ImageView;
import android.widget.PopupWindow;
import android.widget.TextView;

import com.phonegap.ebike.R;

/**
 * Created by Trust on 2016/12/20.
 */
public class WaitPopopWindow {
    private Context context;
    private PopupWindow popupWindow;
    private TextView tv;
    private String msg ;
    private Handler handler = new Handler(){
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what)
            {
                case 1:
                    if(popupWindow != null)
                    {
                        popupWindow.dismiss();
                    }
                break;
            }
        }
    };

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public void showPopopWindow (Context context, View v)
    {
        // 一个自定义的布局，作为显示的内容
        View contentView = LayoutInflater.from(context).inflate(
                R.layout.popopwindow, null);
        // 设置按钮的点击事件


        popupWindow = new PopupWindow(contentView,
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, true);

        popupWindow.setTouchable(true);




        popupWindow.setTouchInterceptor(new View.OnTouchListener() {

            @Override
            public boolean onTouch(View v, MotionEvent event) {

                Log.i("mengdd", "onTouch : ");
//                popupWindow.dismiss();

                return false;
                // 这里如果返回true的话，touch事件将被拦截
                // 拦截后 PopupWindow的onTouchEvent不被调用，这样点击外部区域无法dismiss
            }
        });


        Animation rotateAnimation = AnimationUtils.loadAnimation(context,R.anim.animators);
        LinearInterpolator lir = new LinearInterpolator();
        rotateAnimation.setInterpolator(lir);
        rotateAnimation.setRepeatCount(1000);




         ImageView imageView = (ImageView) contentView.findViewById(R.id.loading);
        tv = (TextView) contentView.findViewById(R.id.popupwindow_tv);

        if(msg != null && !msg.equals(""))
        {
            tv.setText(msg);
        }
        imageView.startAnimation(rotateAnimation);
        imageView.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
//                popupWindow.dismiss();
            }
        });

//         如果不设置PopupWindow的背景，无论是点击外部区域还是Back键都无法dismiss弹框
//         我觉得这里是API的一个bug
//        popupWindow.setBackgroundDrawable(getResources().getDrawable(
//                R.drawable.selectmenu_bg_downward));
//
//         设置好参数之后再show
        popupWindow.showAtLocation(v, Gravity.CENTER,0,0);
        new Reminder(15,context,handler).startReminder();
        L.i("开始计时");
    }



    public void stopPopopWindow()
    {
        popupWindow.dismiss();
    }


}
