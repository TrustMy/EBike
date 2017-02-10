package com.phonegap.natives.httptool;

import android.content.Context;
import android.os.Handler;
import android.os.Message;

import com.amap.api.maps.AMap;
import com.phonegap.natives.locaction.GPSHistory;
import com.phonegap.natives.tool.EBikeConstant;
import com.phonegap.natives.tool.L;
import com.phonegap.network.GetNet;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by Trust on 17/1/3.
 */
public class LwaysTrackingLine {
    private OkHttpClient okHttpClient ;
    private Request.Builder builder;
    private Handler handler;
    private Context context;
    private GetNet getNet;
    private AMap aMap;
    private Message message;
    private boolean isExt = false;


    public void setIsMapLiner (boolean isMapLiner)
    {
        getNet.isMapLiner(isMapLiner);
    }

    public LwaysTrackingLine (Context context , Handler handler , AMap aMap ,GPSHistory gpsHistory)
    {
        this.aMap = aMap;
        this.context = context;
        this.handler = handler;
        this.okHttpClient = new OkHttpClient.Builder()
                .connectTimeout(3, TimeUnit.SECONDS)
                .readTimeout(3, TimeUnit.SECONDS)
                .build();
        builder = new Request.Builder();
        getNet = new GetNet(context,handler,aMap,gpsHistory);
    }

    public void doGet (String url ,int type) throws IOException {
        Request request = builder.get().url(url).build();
        synchronized (context) {

            L.i("Get LwaysTrackingLine  请求  实时追踪数据");//

            executeResponse(request, type);

        }
    }

    public void setIsExt (boolean isExt)
    {
        this.isExt = isExt;
    }

    public void stopOkHttpClient()
    {
        okHttpClient.dispatcher().cancelAll();
    }


    public synchronized void executeResponse(final Request request , final int type) {
        message = new Message();
        Call call = okHttpClient.newCall(request);
//        call.execute()
        //SocketTimeoutException连接超时



        call.enqueue( new Callback() {

            @Override
            public void onFailure(Call call, IOException e) {
                L.i("Get LwaysTrackingLine:"+e.toString());//
                if(!isExt)
                {

                    try {
                        message.what = type;
                        message.arg1 = EBikeConstant.HTTP_EROOR;
                        Thread.sleep(100);
                        getNet.sendMessage(message);
                    } catch (InterruptedException e1) {
                        e1.printStackTrace();
                    }

                }

            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {

                if(!isExt)
                {

                    try {
                        Message messages = new Message();
                        messages.what = type;
                        String json = response.body().string();
                        L.i("Get LwaysTrackingLine json :" + json);
                        messages.arg1 = EBikeConstant.HTTP_SUCCESS;
                        messages.obj = json;
                        Thread.sleep(100);
                        getNet.sendMessage(messages);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                }
            }



        });



    }


}
