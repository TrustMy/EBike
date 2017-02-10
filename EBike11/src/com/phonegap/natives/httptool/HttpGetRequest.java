package com.phonegap.natives.httptool;

import android.os.AsyncTask;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

import com.phonegap.natives.bean.Error;
import com.phonegap.natives.tool.EBikeConstant;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by Trust on 2016/12/19.
 */
public class HttpGetRequest extends AsyncTask {
    private int  type ;
    InputStream stream = null;
    HttpURLConnection httpURLConnection = null;
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

        try {
            URL url = new URL((String) params[0]);
            httpURLConnection = (HttpURLConnection) url.openConnection();
            httpURLConnection.setRequestMethod("GET");
            httpURLConnection.setReadTimeout(10000);
            httpURLConnection.setConnectTimeout(10000);
            httpURLConnection.connect();

            if(httpURLConnection.getResponseCode()==200){
                //接收响应回来的InputStream
                stream = httpURLConnection.getInputStream();
                // 下面对获取到的输入流进行读取
                String json = StringUtils.getStringByInputStream(stream, "UTF-8");

                Log.d("HttpGetRequest", "json :    " + json);

                return json;
            }


        }  catch (IOException e) {
            e.printStackTrace();
            Log.d("HttpGetRequest", "2222 e :" + e.toString());
            error = new Error();
//            error.setReason(e.toString());
            message = new Message();
            message.what = EBikeConstant.ERROR;
            message.obj = "网络连接超时或网络不稳定!";
            message.arg2 = -1;
            handler.sendMessage(message);
        }finally {
            httpURLConnection.disconnect();
        }

        return "error";
    }
}
