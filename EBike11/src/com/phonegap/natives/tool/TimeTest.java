package com.phonegap.natives.tool;

import android.content.Context;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by Trust on 16/12/29.
 */
public class TimeTest {
    Timer timer;
    Handler handler;
    static boolean isStop = true;
    TimeClasa timeClasa;
    public TimeTest(int seconds, Context context, Handler handler)
    {

        this.handler=handler;
    }

    public void startTime ()
    {

        isStop = true;
        timeClasa = new TimeClasa();

        timer = new Timer();
        timer.schedule(timeClasa,0,5*1000);
        L.i("timeTools  success!");
    }
    public void stopTime()
    {


        isStop = false;
//            timer.cancel();
//            L.i("停止计时器   timeClasa:");
//            System.gc();
    }




    class  TimeClasa extends TimerTask
    {

        @Override
        public void run() {

            if(TimeTest.isStop)
            {
                Message message = new Message();
                message.what = EBikeConstant.ALWAYS_TRACKING_LINE;
                message.obj = true;
                handler.sendMessage(message);
            }else
            {
                timer.cancel();
            }




            L.i("isStop  in"+isStop);
        }


    }

}
