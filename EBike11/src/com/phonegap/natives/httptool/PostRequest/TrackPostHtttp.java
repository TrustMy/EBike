package com.phonegap.natives.httptool.PostRequest;

import android.content.Context;
import android.os.AsyncTask;
import android.os.Handler;
import android.os.Message;
import android.widget.Toast;

import com.amap.api.maps.AMap;
import com.google.gson.Gson;
import com.phonegap.natives.httptool.StringUtils;
import com.phonegap.natives.locaction.GPSHistory;
import com.phonegap.natives.tool.EBikeConstant;
import com.phonegap.natives.tool.EBikeSever;
import com.phonegap.natives.tool.L;
import com.phonegap.natives.tool.ToastUtil;
import com.phonegap.network.PostNet;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by Li Hao on 2017/1/14 0014.
 */
public class TrackPostHtttp extends AsyncTask {
    private PostNet postGet;
    private Message message;
    private Context context;
    private String token;
    private String termId;
    public TrackPostHtttp(Handler handler , Context context , AMap aMap , String termId , String token, GPSHistory gpsHistory) {
        this.context = context;
        this.token = token;
        this.termId = termId;
        postGet = new PostNet(context,handler,aMap,gpsHistory);
    }

    @Override
    protected Object doInBackground(Object[] params) {
        URL url;
        InputStream stream = null;
        try {
            url = new URL(EBikeSever.server_url+EBikeSever.car_location_url);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setConnectTimeout(4500);
            connection.setReadTimeout(4500);

            connection.setRequestProperty("Content-Type", "application/json;charset=UTF-8");

            connection.setRequestProperty("token",token);

            String termIds = termId;
            String json  ="{\"termId\":"+termIds+"};";
            //参数
            DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());
            outputStream.writeBytes(json);
            connection.connect();
            if(connection.getResponseCode()==200){
                //响应成功
                stream = connection.getInputStream();
                String jsons = StringUtils.getStringByInputStream(stream,"utf-8");
                L.i("TrackPostHtttp"+jsons);
                if(json != null  && !json.equals(""))
                {
                    message = new Message();
                    Gson gson = new Gson();
                    message.what = EBikeConstant.ALWAYS_TRACKING_LINE;
                        message.arg1 = EBikeConstant.HTTP_SUCCESS;
                        message.obj = jsons;
                    postGet.sendMessage(message);


                    return jsons;
                }
                }else
            {
                ToastUtil.showToast(context,"错误码:"+connection.getResponseCode());
            }



        }  catch (MalformedURLException e) {
            // TODO Auto-generated catch block
            L.i("超时");
            message = new Message();
            message.what = EBikeConstant.ALWAYS_TRACKING_LINE;
            message.arg1 = EBikeConstant.HTTP_EROOR;
            message.arg2 = 100;
            message.obj = "连接超时!";
            postGet.sendMessage(message);
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            L.i("超时");
            message = new Message();
            message.what = EBikeConstant.ALWAYS_TRACKING_LINE;
            message.arg1 = EBikeConstant.HTTP_EROOR;
            message.arg2 = 100;
            message.obj = "连接超时!";
            postGet.sendMessage(message);
            e.printStackTrace();
        } finally{
            if(stream!=null){
                try {
                    stream.close();
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        }

        return null;
    }
}
