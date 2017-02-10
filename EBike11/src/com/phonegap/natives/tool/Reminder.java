package com.phonegap.natives.tool;

import android.content.Context;
import android.os.Handler;
import android.os.Message;

import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by Trust on 2016/12/20.
 */
public class Reminder {
    Timer timer;
    Context context;
    int seconds;
    int i = 0;
    Handler handler;


    public int getI() {
        return i;
    }

    public void setI(int i) {
        this.i = i;
    }

    public Reminder(int seconds, Context context,Handler handler) {
        timer = new Timer();
        this.seconds =seconds;
        this.context =context;
        this.handler = handler;
    }
    public void stopReminder ()
    {
        timer.cancel();
    }
    public void startReminder()
    {
        timer.schedule(new RemindTask(), seconds * 1000);
    }

    public void sendHandler ()
    {
        Message message = new Message();
        message.what = EBikeConstant.ALWAYS_TRACKING_LINE;
        message.obj = true;
        handler.sendMessage(message);


    }

    class RemindTask extends TimerTask {





        public void run() {
//            Toast.makeText(context, "定时器时间到了 提示一下:", Toast.LENGTH_SHORT).show();

            L.i("15s 到了");
            Message message = new Message();
            message.what = 1;
            handler.sendMessage(message);
                timer.cancel(); //Terminate the timer thread




        }
    }
}
