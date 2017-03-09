package com.phonegap.natives.tool;

import android.content.Context;
import android.os.Handler;
import android.os.Message;

import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by Trust on 2016/11/3.
 */
public class WartTime {
    private Timer timer;
    private Context context;
    private int seconds;
    private boolean isStartRanging = false;
    private Handler handler;
    private int type;

    public WartTime(int seconds, Context context , Handler handler, int type) {
        timer = new Timer();
       this.seconds =seconds;
        this.context =context;
        this.handler = handler;
        this.type = type;
    }
    public void stopReminder ()
    {
        timer.cancel();
    }
    public void startReminder()
    {
        timer.schedule(new RemindTask(), seconds * 1000);
    }

    public boolean getIsStartRanging (){return isStartRanging;};
    public void setIsStartRanging (boolean isStartRanging){this.isStartRanging = isStartRanging;};



    class RemindTask extends TimerTask {
        public void run() {
            L.i("warTime 15 succes");

            Message message = new Message();
            message.what = type;
            handler.sendMessage(message);
            timer.cancel(); //Terminate the timer thread
        }
    }



}