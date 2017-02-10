package com.phonegap.natives.httptool.GetRequest;

import android.content.Context;
import android.graphics.Color;
import android.os.Handler;
import android.os.Message;

import com.amap.api.maps.AMap;
import com.amap.api.maps.model.LatLng;
import com.google.gson.Gson;
import com.phonegap.ebike.R;
import com.phonegap.natives.bean.CarGPSBean;
import com.phonegap.natives.bean.CarLocationHistorical;
import com.phonegap.natives.bean.Error;
import com.phonegap.natives.bean.TrackingBean;
import com.phonegap.natives.httptool.HttpGetRequest;
import com.phonegap.natives.locaction.GPSHistory;
import com.phonegap.natives.tool.CoordinateTransformation;
import com.phonegap.natives.tool.EBikeConstant;
import com.phonegap.natives.tool.TimeTool;

/**
 * Created by Trust on 2016/12/19.
 *
 *
 *
 *
 *
 */
public class GetRequestClasz extends HttpGetRequest {
    private Handler handler;
    private int type;
    private Context context;
    private AMap aMap;
    private GPSHistory gpsHistory;
    private CarLocationHistorical carLocationHistorical;
    private Error error;
    private Message message;
    private String GpsLocation = "GpsLocation";
    private String MapLocation = "MapLocation";
    private int GpsColor = Color.parseColor("#ff0000");
    private int MapColor =  Color.parseColor("#0000ff");
    private int GpsIcon = R.drawable.bike;
    private int MapIcon = R.drawable.bike2;
    private int firstTime = 0;
    private boolean  isMapLiner = true;
    private CoordinateTransformation coordinateTransformation;
    private LatLng desLatLng;
    private boolean isShowCarLocation = false;

    public boolean isMapLiner() {
        return isMapLiner;
    }

    public void setMapLiner(boolean mapLiner) {
        isMapLiner = mapLiner;
    }

    public void setFirstTime(int firstTime) {
        this.firstTime = firstTime;

    }

    private CarGPSBean carGPSBean;
    private TrackingBean trackingBean;
    TimeTool timeTool;
    public CarGPSBean getCarGPSBean() {
        return carGPSBean;
    }

    public GetRequestClasz(Handler handler,int type , Context context , AMap aMap ,boolean isShowCarLocation) {
        this.type = type;
        this.handler = handler;
        this.context = context;
        timeTool = new TimeTool();
        this.aMap = aMap;
        this.isShowCarLocation = isShowCarLocation;
        setHandler(handler);
        coordinateTransformation = new CoordinateTransformation(context);
    }

    public void setGpsHistory(GPSHistory gpsHistory) {
        this.gpsHistory = gpsHistory;
    }
    @Override
    protected void onPostExecute(Object o) {
        super.onPostExecute(o);
        String msg = (String) o;
//        aMap.clear();
        if(msg != null && !msg.equals("error"))
        {
            checkType(type,msg);
        }else{
//            Message message = new Message();
//            message.what = EBikeConstant.ERROR;
//            message.obj = "网络异常,请稍后再试!";
//            if(EBikeConstant.CAR_LOCATIOM != type)
//            {
//               message.arg2 = -1;
//            }
//
//
//            handler.sendMessage(message);
        }
    }

    private void checkType(int type ,String msg) {
        Gson gson = new Gson();
        Message message = new Message();

        error = gson.fromJson(msg,Error.class);
        switch (type)
        {
//            case EBikeConstant.CAR_LOCATIOM:
//
//               carGPSBean  = gson.fromJson(msg,CarGPSBean.class);
//                if(carGPSBean.getStatus())
//                {
//                    desLatLng  = new LatLng((carGPSBean.getGps().getLat()/1000000.0)
//                            ,(carGPSBean.getGps().getLng()/1000000.0)
//                    );
//                    if(desLatLng.longitude != 0.0 && isShowCarLocation == false)
//                    {
//                        aMap.clear();
//
//                        LatLng update = coordinateTransformation.transformation(desLatLng);
//
//                        aMap.addMarker(new MarkerOptions().
//                                position(update).
//                                title("当前位置:").
//                                snippet("GPS定位")).showInfoWindow();
//
//                        aMap.animateCamera(CameraUpdateFactory.newCameraPosition(new CameraPosition(
//                                new LatLng(update.latitude,update.longitude),//新的中心点坐标
//                                500, //新的缩放级别
//                                0, //俯仰角0°~45°（垂直与地图时为0）
//                                0  ////偏航角 0~360° (正北方为0)
//                        )));
//                        message.what = EBikeConstant.CAR_LOCATIOM;
//                        message.arg1 = EBikeConstant.HTTP_SUCCESS;//代表成功;
//                        message.obj = carGPSBean;
//                        handler.sendMessage(message);
//
//                    }else if(carGPSBean.getMap().getLon() != 0.0 && desLatLng.latitude == 0.0 && isShowCarLocation == false)
//                     {
//
//                         aMap.clear();
//                        LatLng LatLng = new LatLng((carGPSBean.getMap().getLat())
//                                ,(carGPSBean.getMap().getLon())
//                        );
//                        LatLng updateLatilng =coordinateTransformation.transformation(LatLng);
//
//                        Log.d("lhh", "基站定位的坐标:"+carGPSBean.getMap().getLat()+"|"+carGPSBean.getMap().getLon());
//
//                        aMap.addMarker(new MarkerOptions().
//                                position(LatLng).
//                                title("当前位置:").
//                                snippet("基站定位位置")).showInfoWindow();
//
//                        aMap.animateCamera(CameraUpdateFactory.newCameraPosition(new CameraPosition(
//                                new LatLng(LatLng.latitude,LatLng.longitude),//新的中心点坐标
//                                500, //新的缩放级别
//                                0, //俯仰角0°~45°（垂直与地图时为0）
//                                0  ////偏航角 0~360° (正北方为0)
//                        )));
//                        message.what = EBikeConstant.CAR_LOCATIOM;
//                        message.arg1 = EBikeConstant.HTTP_SUCCESS;//代表成功;
//                        message.obj = carGPSBean;
//                        handler.sendMessage(message);
//
//                    }else if(carGPSBean.getMap().getLon() == 0.0 && desLatLng.latitude == 0.0)
//                    {
//                        Toast.makeText(context,"GPS和基站坐标点有误!",Toast.LENGTH_SHORT).show();
//                    }
//
//                }else
//                {
//                    Toast.makeText(context,"连接网络超时!T",Toast.LENGTH_SHORT).show();
//                   errorSend(EBikeConstant.CAR_LOCATIOM);
//                }
//            break;
//
//
//
//            case EBikeConstant.ALWAYS_TRACKING:
//                aMap.clear();
//                    trackingBean = gson.fromJson(msg,TrackingBean.class);
//                message.what = EBikeConstant.ALWAYS_TRACKING;
//                if(trackingBean.getStatus())
//                {
//                    //实时定位开启成功
//                    message.arg1 = EBikeConstant.HTTP_SUCCESS;
//                    message.obj = trackingBean;
//                    handler.sendMessage(message);
//                }else
//                {
//                   errorSend(EBikeConstant.ALWAYS_TRACKING);
//                }
//                break;
//
//
//            case EBikeConstant.ALWAYS_TRACKING_LINE:
//                aMap.clear();
//                carGPSBean = gson.fromJson(msg, CarGPSBean.class);
//                if(carGPSBean.getStatus()) {
//
//
//                    if (firstTime >= 0  && !timeTool.getStatusTime(timeTool.getGPSTime(carGPSBean.getGps().getGpsTime()))) {
//
//                    LatLng GPSlatLng = coordinateTransformation.transformation(new LatLng(carGPSBean.getGps().getLat() / 1000000.0, carGPSBean.getGps().getLng() / 1000000.0));
//                    LatLng MapLatLng = coordinateTransformation.transformation(new LatLng(carGPSBean.getMap().getLat(), carGPSBean.getMap().getLon()));
//                    if (GPSlatLng != null) {
//
//                        if (GPSlatLng.longitude != 0.0 && MapLatLng.longitude != 0.0) {
//                            gpsHistory.addGPSLocation(GPSlatLng, true, GpsLocation, GpsColor, GpsIcon);
//                            Log.d("MapActivity", "GPSlatLng.longitude != 0.0 && MapLatLng.longitude != 0.0 isMapLiner  :" + isMapLiner);
//
//                            if(isMapLiner())
//                            {
//                                gpsHistory.addMapLocation(MapLatLng, false, MapLocation, MapColor, MapIcon);
//                            }
//
//                        } else if (GPSlatLng.longitude != 0.0 && MapLatLng.longitude == 0.0) {
//                            gpsHistory.addGPSLocation(GPSlatLng, true, GpsLocation, GpsColor, GpsIcon);
//                        } else if (GPSlatLng.longitude == 0.0 && MapLatLng.longitude != 0.0) {
//                            Log.d("MapActivity", "GPSlatLng.longitude == 0.0 && MapLatLng.longitude != 0.0 isMapLiner  :" + isMapLiner);
//
//                            if(isMapLiner())
//                            {
//                                gpsHistory.addMapLocation(MapLatLng,true, MapLocation, MapColor, MapIcon);
//                            }
//                        }else
//                        {
//                            Toast.makeText(context,"实时追踪:GPS和基站坐标有误!",Toast.LENGTH_SHORT).show();
//                        }
////                        else
////                        {
////                            errorSend(EBikeConstant.STOP_ALWAYS_TRACKING_LINE);
////                        }
//
//                    }
//                }
//                }else
//                {
//
//                   errorSend(EBikeConstant.ALWAYS_TRACKING_LINE);
//                }
//                break;
//
//            // TODO: 17/1/3 这是个历史页面的请求
//            case EBikeConstant.CAR_LOCATION_HISTORICAL:
////                carLocationHistorical = gson.fromJson(msg,CarLocationHistorical.class);
////                message.what = EBikeConstant.CAR_LOCATION_HISTORICAL;
////                if(carLocationHistorical.getStatus())
////                {
////                    message.arg1 = EBikeConstant.HTTP_SUCCESS;
////                    message.obj = carLocationHistorical;
////                    Log.d("GetRequestClasz", "log  carLocationHistorical" + carLocationHistorical.toString());
////                    handler.sendMessage(message);
////                }else
////                {
////                   errorSend(EBikeConstant.CAR_LOCATION_HISTORICAL);
////                }
//                break;
//        }







//            if(!error.getStatus())
//            {
//                if(First != 0)
//                {
//                    message.what = EBikeConstant.ERROR;
//                    message.arg2 = First;
//                    message.obj = error.getReason();
//                    handler.sendMessage(message);
//                }else
//                {
//                    message.what = EBikeConstant.ERROR;
//                    message.arg2 = -1;
//                    message.obj = error.getReason();
//                    handler.sendMessage(message);
//                }
//
            }





    }




    public void errorSend(int type)
    {
        message = new Message();
        message.what = type;
        message.arg1 = EBikeConstant.HTTP_EROOR;//失败
//        message.obj = error.getReason();
        handler.sendMessage(message);
    }
    /*
    private LatLng CoordinateTransformation(int Lat, int Lng)
    {

        LatLng latLng = new LatLng(Lat,Lng);
//        CoordinateConverter converter  = new CoordinateConverter(context);
//    // CoordType.GPS 待转换坐标类型
//        converter.from(CoordinateConverter.CoordType.GPS);
//    // sourceLatLng待转换坐标点 LatLng类型
//        converter.coord(latLng);
//    // 执行转换操作
//        return converter.convert();
        return latLng;
    }
        */
}
