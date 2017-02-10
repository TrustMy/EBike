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
public class GetHttpRequest {

    private OkHttpClient okHttpClient ;
    private Request.Builder builder;
    private Handler handler;
    private Context context;
    private GetNet getNet;
    private AMap aMap;


    public GetHttpRequest (Context context , Handler handler , AMap aMap ,GPSHistory gpsHistory)
    {
        this.aMap = aMap;
        this.context = context;
        this.handler = handler;
        this.okHttpClient = new OkHttpClient.Builder()
                .connectTimeout(10, TimeUnit.SECONDS)
                .readTimeout(10, TimeUnit.SECONDS)
                .build();
        builder = new Request.Builder();
        getNet = new GetNet(context,handler,aMap,gpsHistory);
    }

    public void setIsCarLocation (boolean isCarLocation)
    {
        getNet.setIsShowCarLocation(isCarLocation);
    }

    public void setIsMapLiner(boolean isMapLiner)
    {
        getNet.isMapLiner(isMapLiner);
    }


    public void doGet (String url ,int type) throws IOException
    {
        Request request = builder.get().url(url).build();

        executeResponse(request,type);
    }

    public void doALWAYS_TRACKING_LINE(String url , int type, boolean isShowMap, GPSHistory gpsHistory)
    {
        Request request = builder.get().url(url).build();
        executeResponse(request,type);
    }



    public synchronized void executeResponse(final Request request , final int type) {

        Call call = okHttpClient.newCall(request);
//        call.execute()
        //SocketTimeoutException连接超时



        call.enqueue( new Callback() {

            @Override
            public void onFailure(Call call, IOException e) {
                Message message = new Message();
                L.i("Get :"+e.toString());//
                message.what = type;
                message.arg1 = EBikeConstant.HTTP_EROOR;
                getNet.sendMessage(message);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                Message message = new Message();
                message.what = type;
                String json = response.body().string();
                    L.i("Get json :"+json);
                    message.arg1 = EBikeConstant.HTTP_SUCCESS;
                    message.obj = json;
                    getNet.sendMessage(message);
            }



        });



    }

}
