package com.phonegap.natives.httptool;

import android.os.AsyncTask;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

import com.phonegap.natives.bean.Error;
import com.phonegap.natives.tool.EBikeConstant;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by Trust on 2016/12/19.
 */
public class HttpPostRequest extends AsyncTask{
    private int  type = EBikeConstant.CAR_STATUS;
    private int Fitst = 0;
    HttpURLConnection connection;
    Error error;
    Handler handler;
    Message message;

    public void setHandler(Handler handler) {
        this.handler = handler;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    @Override
    protected Object doInBackground(Object[] params) {
        //创建一个Url,传入请求的地址，必须写
        try {
            URL url = new URL((String) params[0]);
            //创建一个url的连接对象，必须写
            connection = (HttpURLConnection) url.openConnection();
            //设置请求方式，必须写
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);// 是否输入参数
            connection.setUseCaches(false);
            connection.setDoInput(true);
            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
//            connection.setRequestProperty("Connection", "Keep-Alive");// 维持长连接
            connection.setRequestProperty("Charset", "UTF-8");
            //封装请求参数
                  //设置请求时间和读取内容时间，可选择
            connection.setConnectTimeout(10000);
            connection.setReadTimeout(10000);

            //发起连接，可选
            connection.connect();



            DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());

            switch (getType())
            {
                case EBikeConstant.BUZZER:
                    outputStream.writeBytes("uid="+params[1]+"&operationType="+params[2]+"&operation="+params[3]+"&seq="+params[4]);
//                    outputStream.writeBytes("cellphone="+params[1]+"&passWord="+params[2]);
                    break;
                case EBikeConstant.CAR_STATUS:
                    outputStream.writeBytes("seq="+params[1]+"&uid="+params[2]);

                    break;
            }

            if(connection.getResponseCode()==200){
                //接收响应回来的InputStream
                InputStream stream = connection.getInputStream();
                //connection.disconnect();
                // 下面对获取到的输入流进行读取
                String msg = StringUtils.getStringByInputStream(stream,"UTF-8");
                Log.d("HttpPostRequest", "msg"+msg);
                return msg;
            }

        }  catch (IOException e) {
            // TODO Auto-generated catch block

            e.printStackTrace();
            error = new Error();
            error.setErr(e.toString());
            message = new Message();
            message.what = EBikeConstant.ERROR;
            message.obj = "网络连接超时或网络不稳定!";
            message.arg2 = -1;
            handler.sendMessage(message);
        }finally {
            connection.disconnect();
        }


        return "error";
    }
}
