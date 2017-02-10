package com.phonegap.natives.httptool.PostRequest;

import android.content.Context;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

import com.google.gson.Gson;
import com.phonegap.natives.bean.BuzzerBean;
import com.phonegap.natives.bean.CarStatusBean;
import com.phonegap.natives.bean.Error;
import com.phonegap.natives.httptool.HttpPostRequest;
import com.phonegap.natives.tool.EBikeConstant;

/**
 * Created by Trust on 2016/12/19.
 *
 *
 *
 *
 */
public class PostRequestClasz extends HttpPostRequest {
    private BuzzerBean buzzerBean;
    private CarStatusBean carStatusBean;
    private int type;
    private static boolean buzzerStatus = false;
    private Context context;
    private Handler handler;
    private Error error;
    private Message message;

    public PostRequestClasz(Context context, int type ,Handler handler) {
        this.context =context;
        this.handler = handler;
        this.type = type;
        setType(type);
        setHandler(handler);
    }

    public static boolean getBuzzerStatus() {
        return buzzerStatus;
    }

    public void setBuzzerStatus(boolean buzzerStatus) {
        this.buzzerStatus = buzzerStatus;
    }

    @Override
    protected void onPostExecute(Object o) {
        super.onPostExecute(o);
        String msg = (String) o;
        if(msg != null && !msg.equals("error"))
        {
            checkType(getType(),msg);
        }else
        {
//            Message message = new Message();
//            message.what = EBikeConstant.ERROR;
//            message.obj = "网络异常,请稍后再试!";
//            handler.sendMessage(message);
        }


    }

    private void checkType(int type, String msg) {
        Gson gson = new Gson();
        Message message = new Message();
        error = gson.fromJson(msg,Error.class);
        switch (type)
        {
            case EBikeConstant.BUZZER:
//                buzzerBean = gson.fromJson(msg,BuzzerBean.class);
//                Log.d("PostRequestClasz", "post  db1 = "+buzzerBean.getDb1());
//                if(buzzerBean.getStatus())
//                {
//                    if(buzzerBean.getDb1() == 0)
//                    {
//
//
//                        message.what=EBikeConstant.BUZZER;
//                        message.arg1 = EBikeConstant.HTTP_SUCCESS;
////                        message.obj = true;
//                        handler.sendMessage(message);
//                    }
//
//
//                }else
//                {
//                    errorSend(EBikeConstant.BUZZER);
//                }
//
//
//                break;


            case EBikeConstant.CAR_STATUS:
                carStatusBean = gson.fromJson(msg,CarStatusBean.class);
                int num =carStatusBean.getContent().getBuzzerStatus();
                Log.d("PostRequestClasz", "num :" + num);
                if(carStatusBean.getStatus())
                {


                    if(carStatusBean.getContent().getBuzzerStatus() == EBikeConstant.BUZZER_STATUS_CLOSE)
                    {
                        message.what = EBikeConstant.CAR_STATUS;
                        message.obj = error.getErr();
                        message.arg2 = EBikeConstant.CLOSE_BUZZER;
                        message.arg1= EBikeConstant.HTTP_SUCCESS;
                        handler.sendMessage(message);
                        Log.d("PostRequestClasz", "蜂鸣器状态关闭");
                    }
                    else
                    {
                        message.what = EBikeConstant.CAR_STATUS;
                        message.obj =  error.getErr();
                        message.arg2 = EBikeConstant.OPEN_BUZZER;
                        message.arg1= EBikeConstant.HTTP_SUCCESS;
                        handler.sendMessage(message);
                        Log.d("PostRequestClasz", "蜂鸣器状态开启");
                    }
                }else
                {
                    errorSend(EBikeConstant.CAR_STATUS);
                }

                break;
        }

//        if(!error.getStatus())
//        {
//            if(First != 0)
//            {
//                message.what = EBikeConstant.ERROR;
//                message.obj= error.getReason();
//                message.arg2 = 0;
//                handler.sendMessage(message);
//            }else
//            {
//                message.what = EBikeConstant.ERROR;
//                message.obj= error.getReason();
//                message.arg2 = -1;
//                handler.sendMessage(message);
//            }
//
//        }


    }

    public void errorSend(int type)
    {
        message = new Message();
        message.what = type;
        message.arg1 = EBikeConstant.HTTP_EROOR;//失败
        message.obj = error.getErr();
        handler.sendMessage(message);
    }





}
