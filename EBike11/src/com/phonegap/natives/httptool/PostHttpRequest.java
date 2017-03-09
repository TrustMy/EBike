package com.phonegap.natives.httptool;


import android.content.Context;
import android.os.Handler;
import android.os.Message;

import com.amap.api.maps.AMap;
import com.phonegap.natives.httptool.ssl.TrustAllCerts;
import com.phonegap.natives.locaction.GPSHistory;
import com.phonegap.natives.tool.EBikeConstant;
import com.phonegap.natives.tool.L;
import com.phonegap.natives.tool.ToastUtil;
import com.phonegap.network.PostNet;

import java.io.IOException;
import java.net.SocketTimeoutException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * Created by Trust on 17/1/3.
 */
public class PostHttpRequest {

    private OkHttpClient okHttpClient ;
    private Request.Builder builder;

    private Message message;
    private AMap aMap;


    private PostNet postNet;

    private Context context;
    private Handler handler;

    public PostHttpRequest (Context context , Handler handler , AMap aMap , GPSHistory gpsHistory)
    {
        this.okHttpClient = new OkHttpClient.Builder()
                .sslSocketFactory(TrustAllCerts.createSSLSocketFactory(),new TrustAllCerts())
                .hostnameVerifier(new TrustAllCerts.TrustAllHostnameVerifier())
            .connectTimeout(15, TimeUnit.SECONDS)
            .readTimeout(15, TimeUnit.SECONDS)
            .build();

        this.context = context;
        this.postNet = new PostNet(context,handler,aMap ,gpsHistory);
    }


    public void doPostCheckCarStatus(String url,String termId,String token,String userPhone,long appSN,int type) throws IOException
    {
        String json  ="{\"termId\":"+termId+",\"userCellPhone\":"+userPhone+",\"appSN\":"+appSN+"};";
        doRequest(url, termId, token, type, json);
    }

    // 获取车辆最近一次GPS数据
    public void doPostCheckCarLcation(String url, String termId ,String token, int type) throws IOException {

        String json  ="{\"termId\":"+termId+"};";
        L.i("jsong"+json);
        doRequest(url, termId, token, type, json);

    }

    private void doRequest(String url, String termId, String token, int type, String json) {
        MediaType JSON = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(JSON, json);
        L.i("json:"+json);
        builder = new Request.Builder();
        Request request = builder.url(url).addHeader("Token", token).post(body).build();

        executeResponse(request, type);
    }

    //开蜂鸣
    public void doPostBUZZER(String url,String termId,String token,String userPhone,long appSN,boolean buzzerStatus,int type)
    {


        String json  ="{\"termId\":"+termId+",\"userCellPhone\":"+userPhone+",\"appSN\":"+appSN+",\"on\":"+buzzerStatus+"};";
        L.i("jsong"+json);
        doRequest(url, termId, token, type, json);


    }

    public void doTEstsadad(String url)
    {
        String utl = "350000000000001";
        FormBody body = new FormBody.Builder()
                .add("termId", utl)
                .build();
        Request request = builder.url(url).post(body).build();
        executeResponse(request , 10000);
    }



    //开启实时追踪18121100590
    public void doPostStartTracking(String url,String termId,String token,String userCellPhone,long appSN,int interval,int duration,int type)
    {
        String json = "{\"termId\":"+termId+",\"userCellPhone\":"+userCellPhone+",\"appSN\":"+appSN+",\"interval\":"+interval+",\"duration\":"+duration+"}";
        doRequest(url, termId, token, type, json);
    }

    //获取车辆历史轨迹
    public void doPostCheckCarHistoryLocation(String url,String termId,String token,long startTime,long endTime,int type)throws IOException
    {



        String json  ="{\"termId\":"+termId+",\"startTime\":"+startTime+",\"endTime\":"+endTime+"}";
        L.i("token"+token);
        doRequest(url, termId, token, type, json);
    }




    public void executeResponse(Request request , final int type) {
        message = new Message();
        Call call = okHttpClient.newCall(request);
//        call.execute()
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                L.i("post:"+e.getMessage());
                L.i("failure:"+e.toString());
                message.what = EBikeConstant.ERROR;
                message.arg1 = EBikeConstant.HTTP_EROOR;
                message.arg2 = 100;
                message.obj = "网络连接超时";

                postNet.sendMessage(message);

            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {

                String json = response.body().string();
                L.i("response.code() :"+response.code());

                if(response.code() == 200)
                {
                    L.i("post json :"+json);
                    Message message = new Message();
                    message.what = type;
                    message.arg1 = EBikeConstant.HTTP_SUCCESS;
                    message.obj = json;
                    postNet.sendMessage(message);
                }else
                {
//                    ToastUtil.showToast(context,"错误 返回码:"+response.code());
                    L.i("错误 返回码:"+response.toString());
                    Message message = new Message();
                    message.what = type;
                    message.what = EBikeConstant.ERROR;
                    message.arg1 = EBikeConstant.HTTP_EROOR;
                    message.arg2 = 100;
                    message.obj = response.code()+"";
                    postNet.sendMessage(message);
                }

            }
        });
    }


}
