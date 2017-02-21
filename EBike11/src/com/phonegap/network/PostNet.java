package com.phonegap.network;

import android.content.Context;
import android.graphics.Color;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;

import com.amap.api.maps.AMap;
import com.amap.api.maps.CameraUpdateFactory;
import com.amap.api.maps.model.CameraPosition;
import com.amap.api.maps.model.LatLng;
import com.amap.api.maps.model.MarkerOptions;
import com.google.gson.Gson;
import com.phonegap.ebike.R;
import com.phonegap.natives.bean.BuzzerBean;
import com.phonegap.natives.bean.CarGPSBean;
import com.phonegap.natives.bean.CarLocationHistorical;
import com.phonegap.natives.bean.CarStatusBean;
import com.phonegap.natives.bean.Error;
import com.phonegap.natives.bean.TrackingBean;
import com.phonegap.natives.locaction.GPSHistory;
import com.phonegap.natives.tool.CoordinateTransformation;
import com.phonegap.natives.tool.EBikeConstant;
import com.phonegap.natives.tool.L;
import com.phonegap.natives.tool.TimeTool;
import com.phonegap.natives.tool.ToastUtil;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by Trust on 17/1/3.
 */
public class PostNet extends Handler {
    private CarStatusBean carStatusBean;
    private BuzzerBean buzzerBean;
    private Handler handler;
    private String res;

    private Context context;

    private String GpsLocation = "GpsLocation";

    private int GpsIcon = R.drawable.battery_car;

    private int GpsColor = Color.parseColor("#ff0000");

    private Error error;

    private AMap aMap;

    private boolean isFirst = false;//GPS数据为0时  是否是第一次数据 如果是 不显示 后面都显示

    private CoordinateTransformation coordinateTransformation;

    private GPSHistory gpsHistory;

    private TimeTool timeTool;

    private String dataType;
    public PostNet (Context context, Handler handler, AMap aMap , GPSHistory gpsHistory)
    {
        timeTool = new TimeTool();
        this.gpsHistory = gpsHistory;
        this.context = context;
        this.aMap = aMap;
        this.handler = handler;
        coordinateTransformation = new CoordinateTransformation(context);
    }


    @Override
    public void handleMessage(Message msg) {
        Gson gson = new Gson();
        Message message = new Message();
        res = (String) msg.obj;
        L.i("res:"+res);

        boolean isJson = true;
        try {
            new JSONObject(res);
        } catch (JSONException e) {
            e.printStackTrace();
            isJson = false;
        }

        if(msg.arg2 != 100 && isJson == true)
        {
            error = gson.fromJson(res,Error.class);
        }else
        {
            L.i("服务器返回的不是json :"+res);
        }

        switch (msg.what)
        {
            case EBikeConstant.CAR_STATUS:

                if(msg.arg1 == EBikeConstant.HTTP_SUCCESS)
                {
                    toDealWithCAR_STATUS(gson,message,res,EBikeConstant.CAR_STATUS);
                }else
                {
//                    commitTimeOut(EBikeConstant.CAR_STATUS);
                    commitTimeOutHandler(EBikeConstant.CAR_STATUS, (String) msg.obj);
                }
            break;

            case EBikeConstant.BUZZER:

                if(msg.arg1 == EBikeConstant.HTTP_SUCCESS)
                {
                    toDealWithBUZZER(gson, message,EBikeConstant.BUZZER);
                }else
                {
//                    commitTimeOut(EBikeConstant.BUZZER);
//                    errorSend(EBikeConstant.BUZZER);
                    commitTimeOutHandler(EBikeConstant.BUZZER,(String) msg.obj);
                }

            break;

            case EBikeConstant.CAR_LOCATIOM:

                if(msg.arg1 == EBikeConstant.HTTP_SUCCESS) {
                    toDealWithCAR_Location(msg, gson, message, res,EBikeConstant.CAR_LOCATIOM);
                }else
                {
//                    commotTimeOut(EBikeConstant.CAR_LOCATIOM);
                    commitTimeOutHandler(EBikeConstant.CAR_LOCATIOM,(String) msg.obj);
                }

                break;



            case EBikeConstant.ALWAYS_TRACKING:
                if(msg.arg1 == EBikeConstant.HTTP_SUCCESS)
                {
                    doCarStartTrackingLocation(msg,gson,EBikeConstant.ALWAYS_TRACKING);
                }else
                {
                    //超时
                    commitTimeOutHandler(EBikeConstant.ALWAYS_TRACKING,(String) msg.obj);
                }
                break;


            case EBikeConstant.ALWAYS_TRACKING_LINE:

//                aMap.clear();


                if (msg.arg1 == EBikeConstant.HTTP_SUCCESS)
                {
                    toDealWithALWAYS_TRACKING_LINE(EBikeConstant.ALWAYS_TRACKING_LINE,gson,res);
                }else
                {
//                    commotTimeOut(EBikeConstant.ALWAYS_TRACKING_LINE);

//                    errorSend(EBikeConstant.ALWAYS_TRACKING_LINE);
                    commitTimeOutHandler(EBikeConstant.ALWAYS_TRACKING_LINE,(String) msg.obj);
                }
                break;

            case EBikeConstant.CAR_LOCATION_HISTORICAL:
                if (msg.arg1 == EBikeConstant.HTTP_SUCCESS)
                {
                    doCarHistoryLocation(msg,gson,EBikeConstant.CAR_LOCATION_HISTORICAL);
                }else
                {
//
                    commitTimeOutHandler(EBikeConstant.CAR_LOCATION_HISTORICAL,(String) msg.obj);
                }

            break;
            case EBikeConstant.ERROR:
                Message message1 = new Message();
                message1.what = EBikeConstant.ERROR;
                message1.obj = msg.obj;
                handler.sendMessage(message1);
                break;



        }
    }


    private void doCarHistoryLocation(Message msg, Gson gson, int type) {
        Gson gson1 = new Gson();
        L.i("res:"+res);
        CarLocationHistorical carLocationHistorical = gson1.fromJson(res,CarLocationHistorical.class);

        L.i("toDealWithCAR_LOCATION_HISTORICAL :"+carLocationHistorical.toString());
        if(carLocationHistorical.getStatus())
        {
            Message message = new Message();
            message.what = type;
            message.arg1 = EBikeConstant.HTTP_SUCCESS;
            message.obj = carLocationHistorical;
            Log.d("post ", "log  carLocationHistorical  res" + carLocationHistorical.toString()+res);
            handler.sendMessage(message);
        }else
        {
            //返回错误信息
            errorSend(type);
        }
    }



    private void toDealWithALWAYS_TRACKING_LINE(int type, Gson gson,String res) {
        CarGPSBean carGPSBean = gson.fromJson(res, CarGPSBean.class);
        if (carGPSBean.getStatus()) {



                LatLng GPSlatLng = coordinateTransformation.transformation(new LatLng(carGPSBean.getContent().getLat(),carGPSBean.getContent().getLng()));

                if (GPSlatLng != null) {
//                    L.i("实时追踪,GPS坐标:"+GPSlatLng.latitude+"|"+GPSlatLng.longitude+"|基站坐标:"+MapLatLng.latitude+"|"+MapLatLng.longitude);

                    if ( carGPSBean.getContent().getType() ==  0) {
                        if(GPSlatLng.longitude != 0.0 )
                        {
                            gpsHistory.addGPSLocation(GPSlatLng, true, carGPSBean.getContent().getGpsTime(), GpsColor, GpsIcon);
                        }else
                        {
                            ToastUtil.showToast(context,"GPS数据为0.0");
                        }


                        Log.d("MapActivity", "GPSlatLng.longitude != 0.0 && MapLatLng.longitude != 0.0");
                    }else
                    {

//                            Toast.makeText(context, "未获取到实时追踪GPS数据(Type != 0)", Toast.LENGTH_SHORT).show();
                            ToastUtil.showToast(context,"未获取到实时追踪GPS数据(Type != 0)");

                    }


            }else
            {
//                Toast.makeText(context,"接收服务器返回的坐标数据超过40s",Toast.LENGTH_SHORT).show();
            }
        }else
        {
            //返回错误信息
            errorSend(type);
        }
    }



    private void doCarStartTrackingLocation(Message msg, Gson gson, int type) {
        TrackingBean trackingBean = gson.fromJson(res,TrackingBean.class);
        Message message = new Message();
         message.what = type;

        if (trackingBean.getStatus()) {
            if(isFirst)
            {
                isFirst = false;
            }
            //实时定位开启成功
            message.arg1 = EBikeConstant.HTTP_SUCCESS;
            message.obj = trackingBean;
            handler.sendMessage(message);

        }else
        {

            //返回错误信息
            errorSend(type);
        }
    }



    private void toDealWithCAR_Location(Message msg, Gson gson, Message message, String res , int type) {
        CarGPSBean carGPSBean  = gson.fromJson(res,CarGPSBean.class);

        if(msg.arg1 == EBikeConstant.HTTP_SUCCESS)
        {
            aMap.clear();
            if(carGPSBean != null &&carGPSBean.getStatus())
            {


                LatLng desLatLng  = new LatLng((carGPSBean.getContent().getLat())
                        ,(carGPSBean.getContent().getLng())
                );
                if(desLatLng.longitude != 0.0 )
                {
//                    aMap.clear();

                    if(carGPSBean.getContent().getType() == 0)
                    {
                        dataType = "GPS定位:";
                    }else
                    {
                        dataType = "基站坐标:";
                    }


                    LatLng update = coordinateTransformation.transformation(desLatLng);
                    L.i("转换过后的 坐标  :"+update.latitude);
                    aMap.addMarker(new MarkerOptions().
                            position(update).
                            title(dataType).snippet(timeTool.getGPSTime(carGPSBean.getContent().getGpsTime()))).showInfoWindow();

                    aMap.animateCamera(CameraUpdateFactory.newCameraPosition(new CameraPosition(
                            new LatLng(update.latitude,update.longitude),//新的中心点坐标
                            500, //新的缩放级别
                            0, //俯仰角0°~45°（垂直与地图时为0）
                            0  ////偏航角 0~360° (正北方为0)
                    )));


                }
                message.what = type;
                message.arg1 = EBikeConstant.HTTP_SUCCESS;//代表成功;
                message.obj = carGPSBean;
                handler.sendMessage(message);
            }else
            {
                //返回错误信息
                errorSend(type);
            }

        }else
        {
            //返回错误信息
            errorSend(type);
        }
    }


    private void toDealWithBUZZER(Gson gson, Message message ,int type) {
        buzzerBean = gson.fromJson(res,BuzzerBean.class);
//        Log.d("PostRequestClasz", "post  db1 = "+buzzerBean.getDb1());
        if(buzzerBean.getStatus())
        {
            if(buzzerBean.getContent().getResult() == 0)
            {


                message.what= type;
                message.arg1 = EBikeConstant.HTTP_SUCCESS;
//                        message.obj = true;
                handler.sendMessage(message);
            }


        }else
        {
            //返回错误信息
            errorSend(type);

        }
    }

    private void toDealWithCAR_STATUS(Gson gson, Message message,String res ,int type) {
        carStatusBean = gson.fromJson(res,CarStatusBean.class);
//        int num =carStatusBean.getDb2();
        L.i("respons json :"+res);
        if(carStatusBean.getStatus())
        {

            if(carStatusBean.getContent().getBuzzerStatus() == EBikeConstant.BUZZER_STATUS_CLOSE)
            {
                message.what = type;
//                        message.obj = error.getReason();
                message.arg2 = EBikeConstant.CLOSE_BUZZER;
                message.arg1= EBikeConstant.HTTP_SUCCESS;
                handler.sendMessage(message);
                L.i("蜂鸣器状态关闭");
            }
            else
            {
                message.what = type;
//                        message.obj =  error.getReason();
                message.arg2 = EBikeConstant.OPEN_BUZZER;
                message.arg1= EBikeConstant.HTTP_SUCCESS;
                handler.sendMessage(message);
                L.i( "蜂鸣器状态开启");
            }
        }else
        {
            //返回错误信息
            errorSend(type);
        }
    }


    public void commitTimeOut(int type)
    {
        Toast.makeText(context,"Post type:"+type+"链接超时!",Toast.LENGTH_SHORT).show();
    }

    public void errorSend(int type)
    {
        Message message = new Message();
        message.what = type;
        message.arg1 = EBikeConstant.HTTP_EROOR;//失败
        message.obj = error.getErr();
        handler.sendMessage(message);
    }


    public void commitTimeOutHandler(int type , String msg)
    {
        Message message = new Message();
        message.what = type;
        message.arg1 = EBikeConstant.HTTP_EROOR;//失败
        message.obj = msg;
        handler.sendMessage(message);
    }

}
