package com.phonegap.network;

import android.content.Context;
import android.graphics.Color;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;

import com.amap.api.maps.AMap;
import com.amap.api.maps.model.LatLng;
import com.google.gson.Gson;
import com.phonegap.ebike.R;
import com.phonegap.natives.bean.CarGPSBean;
import com.phonegap.natives.bean.CarLocationHistorical;
import com.phonegap.natives.bean.Error;
import com.phonegap.natives.bean.TrackingBean;
import com.phonegap.natives.locaction.GPSHistory;
import com.phonegap.natives.tool.CoordinateTransformation;
import com.phonegap.natives.tool.EBikeConstant;
import com.phonegap.natives.tool.L;
import com.phonegap.natives.tool.TimeTool;

/**
 * Created by Trust on 17/1/3.
 */
public class GetNet extends Handler{
    private Context context;
    private Handler handler;

    private CarGPSBean carGPSBean;
    private TrackingBean trackingBean;
    private CarLocationHistorical carLocationHistorical;

    private LatLng desLatLng;
    private boolean isShowCarLocation = false;
    private CoordinateTransformation coordinateTransformation;

    private AMap aMap;
    private String res;
    private GPSHistory gpsHistory;

    private Error error;

    private TimeTool timeTool;

    private int GpsColor = Color.parseColor("#ff0000");
    private int MapColor =  Color.parseColor("#0000ff");
    private int GpsIcon = R.drawable.bike;
    private int MapIcon = R.drawable.bike2;
    private String GpsLocation = "GpsLocation";
    private String MapLocation = "MapLocation";
    private boolean isMapLiner = true;


    private Message message;

    public void isMapLiner(boolean isMapLiner)
    {
            this.isMapLiner = isMapLiner;
    }

    public boolean getIsMapLiner()
    {
        return this.isMapLiner;
    }


    public GetNet (Context context , Handler handler ,AMap aMap ,GPSHistory gpsHistory)
    {
        this.aMap = aMap;
        this.context = context;
        this.handler = handler;
        timeTool = new TimeTool();
        this.coordinateTransformation = new CoordinateTransformation(context);
        this.gpsHistory = gpsHistory;
    }

    public void setIsShowCarLocation (boolean isShowCarLocation)
    {
        this.isShowCarLocation = isShowCarLocation;
    }


    @Override
    public void handleMessage(Message msg) {
        Gson gson = new Gson();
        Message message = new Message();
        res = (String) msg.obj;
        error = gson.fromJson(res,Error.class);
        switch (msg.what) {
            case EBikeConstant.CAR_LOCATIOM:

                if(msg.arg1 == EBikeConstant.HTTP_SUCCESS) {
                    toDealWithCAR_Location(msg, gson, message, res,EBikeConstant.CAR_LOCATIOM);
                }else
                {
//                    commotTimeOut(EBikeConstant.CAR_LOCATIOM);
                    commitTimeOutHandler(EBikeConstant.CAR_LOCATIOM);
                }
                break;

            case EBikeConstant.ALWAYS_TRACKING:

                if(msg.arg1 == EBikeConstant.HTTP_SUCCESS)
                {
                    toDealWithALWAYS_TRACKING(gson, message,EBikeConstant.ALWAYS_TRACKING);
                }else
                {
//                    commotTimeOut(EBikeConstant.ALWAYS_TRACKING);

                    commitTimeOutHandler(EBikeConstant.ALWAYS_TRACKING);
                }
                break;

            case EBikeConstant.ALWAYS_TRACKING_LINE:

//                aMap.clear();
                carGPSBean = gson.fromJson(res, CarGPSBean.class);

                if (msg.arg1 == EBikeConstant.HTTP_SUCCESS)
                {
                    toDealWithALWAYS_TRACKING_LINE(EBikeConstant.ALWAYS_TRACKING_LINE);
                }else
                {
                    commotTimeOut(EBikeConstant.ALWAYS_TRACKING_LINE);

//                    errorSend(EBikeConstant.ALWAYS_TRACKING_LINE);
                    commitTimeOutHandler(EBikeConstant.ALWAYS_TRACKING_LINE);
                }
            break;

            case EBikeConstant.CAR_LOCATION_HISTORICAL:

                if(msg.arg1 == EBikeConstant.HTTP_SUCCESS)
                {
                    toDealWithCAR_LOCATION_HISTORICAL(gson, message,EBikeConstant.CAR_LOCATION_HISTORICAL);
                }else
                {
                    commotTimeOut(EBikeConstant.CAR_LOCATION_HISTORICAL);
                    commitTimeOutHandler(EBikeConstant.CAR_LOCATION_HISTORICAL);
                }

            break;


        }

        isShowCarLocation = false;
    }

    private void toDealWithCAR_LOCATION_HISTORICAL(Gson gson, Message message,int type) {
        Gson gson1 = new Gson();
        carLocationHistorical = gson1.fromJson(res,CarLocationHistorical.class);
        message.what = type;
        L.i("toDealWithCAR_LOCATION_HISTORICAL :"+carLocationHistorical.toString());
        if(carLocationHistorical.getStatus())
        {
            message.arg1 = EBikeConstant.HTTP_SUCCESS;
            message.obj = carLocationHistorical;
            Log.d("Get ", "log  carLocationHistorical  res" + carLocationHistorical.toString()+res);
            handler.sendMessage(message);
        }else
        {
            //返回错误信息
            errorSend(type);
        }
    }

    private void toDealWithALWAYS_TRACKING_LINE(int type) {
//        if (carGPSBean.getStatus()) {
//
//
//            if (!timeTool.getStatusTime(timeTool.getGPSTime(carGPSBean.getGps().getGpsTime()))) {
//
//                LatLng GPSlatLng = coordinateTransformation.transformation(new LatLng(carGPSBean.getGps().getLat() / 1000000.0, carGPSBean.getGps().getLng() / 1000000.0));
//                LatLng MapLatLng = coordinateTransformation.transformation(new LatLng(carGPSBean.getMap().getLat(), carGPSBean.getMap().getLon()));
//                if (GPSlatLng != null) {
//                    L.i("实时追踪,GPS坐标:"+GPSlatLng.latitude+"|"+GPSlatLng.longitude+"|基站坐标:"+MapLatLng.latitude+"|"+MapLatLng.longitude);
//
//                    if (GPSlatLng.longitude != 0.0 && MapLatLng.longitude != 0.0) {
//
//                        gpsHistory.addGPSLocation(GPSlatLng, true, GpsLocation, GpsColor, GpsIcon);
//                        Log.d("MapActivity", "GPSlatLng.longitude != 0.0 && MapLatLng.longitude != 0.0 isMapLiner  :" + isMapLiner);
//
//                        if (getIsMapLiner()) {
//                            gpsHistory.addMapLocation(MapLatLng, false, MapLocation, MapColor, MapIcon);
//                        }
//
//                    } else if (GPSlatLng.longitude != 0.0 && MapLatLng.longitude == 0.0) {
//
//                        gpsHistory.addGPSLocation(GPSlatLng, true, GpsLocation, GpsColor, GpsIcon);
//                        gpsHistory.addMapLocation(MapLatLng, false, MapLocation, MapColor, MapIcon);
//                    } else if (GPSlatLng.longitude == 0.0 && MapLatLng.longitude != 0.0) {
//                        Log.d("MapActivity", "GPSlatLng.longitude == 0.0 && MapLatLng.longitude != 0.0 isMapLiner  :" + isMapLiner);
//
//                        gpsHistory.addGPSLocation(GPSlatLng, true, GpsLocation, GpsColor, GpsIcon);
//                        if (getIsMapLiner()) {
//                            gpsHistory.addMapLocation(MapLatLng, false, MapLocation, MapColor, MapIcon);
//                        }
//                    } else {
//                        Toast.makeText(context, "实时追踪:GPS和基站坐标有误!", Toast.LENGTH_SHORT).show();
//                    }
////                        else
////                        {
////                            errorSend(EBikeConstant.STOP_ALWAYS_TRACKING_LINE);
////                        }
//
//                }
//            }else
//            {
//                Toast.makeText(context,"接收服务器返回的坐标数据超过40s",Toast.LENGTH_SHORT).show();
//            }
//        }else
//        {
//            //返回错误信息
//            errorSend(type);
//        }
    }

    private void toDealWithALWAYS_TRACKING(Gson gson, Message message,int type) {

        trackingBean = gson.fromJson(res,TrackingBean.class);
        message.what = type;


            if (trackingBean.getStatus()) {

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
//        carGPSBean  = gson.fromJson(res,CarGPSBean.class);
//
//            if(msg.arg1 == EBikeConstant.HTTP_SUCCESS)
//            {
//
//                if(carGPSBean != null &&carGPSBean.getStatus())
//                {
//
//            desLatLng  = new LatLng((carGPSBean.getGps().getLat()/1000000.0)
//                    ,(carGPSBean.getGps().getLng()/1000000.0)
//            );
//            if(desLatLng.longitude != 0.0 && isShowCarLocation == false)
//            {
//                aMap.clear();
//
//
//                LatLng update = coordinateTransformation.transformation(desLatLng);
//                L.i("转换过后的 坐标  :"+update.latitude);
//                aMap.addMarker(new MarkerOptions().
//                        position(update).
//                        title("当前位置:").
//                        snippet("GPS定位")).showInfoWindow();
//
//                aMap.animateCamera(CameraUpdateFactory.newCameraPosition(new CameraPosition(
//                        new LatLng(update.latitude,update.longitude),//新的中心点坐标
//                        500, //新的缩放级别
//                        0, //俯仰角0°~45°（垂直与地图时为0）
//                        0  ////偏航角 0~360° (正北方为0)
//                )));
//                message.what = type;
//                message.arg1 = EBikeConstant.HTTP_SUCCESS;//代表成功;
//                message.obj = carGPSBean;
//                handler.sendMessage(message);
//
//            }else if(carGPSBean.getMap().getLon() != 0.0 && desLatLng.latitude == 0.0 && isShowCarLocation == false)
//            {
//
//                aMap.clear();
//                LatLng LatLng = new LatLng((carGPSBean.getMap().getLat())
//                        ,(carGPSBean.getMap().getLon())
//                );
//                LatLng updateLatilng =coordinateTransformation.transformation(LatLng);
//
//                Log.d("lhh", "基站定位的坐标:"+carGPSBean.getMap().getLat()+"|"+carGPSBean.getMap().getLon());
//
//                aMap.addMarker(new MarkerOptions().
//                        position(LatLng).
//                        title("当前位置:").
//                        snippet("基站定位位置")).showInfoWindow();
//
//                aMap.animateCamera(CameraUpdateFactory.newCameraPosition(new CameraPosition(
//                        new LatLng(LatLng.latitude,LatLng.longitude),//新的中心点坐标
//                        500, //新的缩放级别
//                        0, //俯仰角0°~45°（垂直与地图时为0）
//                        0  ////偏航角 0~360° (正北方为0)
//                )));
//                message.what = type;
//                message.arg1 = EBikeConstant.HTTP_SUCCESS;//代表成功;
//                message.obj = carGPSBean;
//                handler.sendMessage(message);
//
//            }else if(carGPSBean.getMap().getLon() == 0.0 && desLatLng.latitude == 0.0)
//            {
//                Toast.makeText(context,"车辆位置,gps 基站坐标都为0.0",Toast.LENGTH_SHORT).show();
//            }else if((carGPSBean.getMap().getLon() != 0.0 || desLatLng.latitude != 0.0) && isShowCarLocation == true)
//            {
//                message.what = type;
//                message.arg1 = EBikeConstant.HTTP_SUCCESS;//代表成功;
//                message.obj = carGPSBean;
//                handler.sendMessage(message);
//            }
//            }else
//                {
//                    //返回错误信息
//                    errorSend(type);
//                }
//
//        }else
//            {
//                //返回错误信息
//                errorSend(type);
//            }
    }

    public void commotTimeOut(int type)
    {
        Toast.makeText(context,"Get type:"+type+"链接超时!",Toast.LENGTH_SHORT).show();
    }

    public void errorSend(int type)
    {
        message = new Message();
        message.what = type;
        message.arg1 = EBikeConstant.HTTP_EROOR;//失败
        message.obj = error.getErr();
        handler.sendMessage(message);
    }

    public void commitTimeOutHandler(int type)
    {
        message = new Message();
        message.what = type;
        message.arg1 = EBikeConstant.HTTP_EROOR;//失败
        message.obj = "链接超时!";
        handler.sendMessage(message);
    }



}
