package com.phonegap.natives.tool;

import android.util.Log;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Trust on 2016/12/22.
 */
public class TimeTool {




    public String  getSystemTime()
    {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date dateTime = new Date(System.currentTimeMillis());//获取当前时间
        String systemTime = formatter.format(dateTime);
        return systemTime;
    }

    public long getTime(String s) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmmss");

        L.i("GPS 时间:"+s);
        long millionSeconds = sdf.parse(s).getTime();//毫秒
        return millionSeconds;
    }

    public String getGPSTime(long  time)
    {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date dateTime = new Date(time);//获取当前时间
        String GPSTime = formatter.format(dateTime);
        return GPSTime;
    }


    public boolean getStatusTime( String GPSTime)
    {
        try {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date d1 = df.parse(getSystemTime());
        Date d2 = df.parse(GPSTime);
            long num = (d1.getTime() - d2.getTime());

            long day = (int) (num / (24 * 60 * 60 * 1000));
            long shi = (int) (num / (60 * 60 * 1000) - day * 24);
            long fen = (int) ((num / (60 * 1000)) - day * 24 * 60 - shi * 60);
            long miao = (int) (num / 1000 - day * 24 * 60 * 60 - shi * 60 * 60 - fen * 60);

            Log.d("TimeTool", "相差秒数" + miao);
            if(miao >= 40)
            {
                return true;//大于
            }

        } catch (ParseException e) {
            e.printStackTrace();
        }

        return false;
    }




    public boolean getTrackingTime (String beforeTime,String nowTime)
    {
        try {
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date d1 = df.parse(nowTime);
            Date d2 = df.parse(beforeTime);
            long num = (d1.getTime() - d2.getTime());

            long day = (int) (num / (24 * 60 * 60 * 1000));
            long shi = (int) (num / (60 * 60 * 1000) - day * 24);
            long fen = (int) ((num / (60 * 1000)) - day * 24 * 60 - shi * 60);
            long miao = (int) (num / 1000 - day * 24 * 60 * 60 - shi * 60 * 60 - fen * 60);

            Log.d("TimeTool", "相差秒数" + miao);
            if(miao >= 300)
            {
                return true;//大于
            }

        } catch (ParseException e) {
            e.printStackTrace();
        }

        return false;
    }






}
