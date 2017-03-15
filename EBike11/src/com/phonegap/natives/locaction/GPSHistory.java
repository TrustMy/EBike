package com.phonegap.natives.locaction;


import android.content.Context;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;

import com.amap.api.maps.AMap;
import com.amap.api.maps.CameraUpdateFactory;
import com.amap.api.maps.model.BitmapDescriptor;
import com.amap.api.maps.model.BitmapDescriptorFactory;
import com.amap.api.maps.model.CameraPosition;
import com.amap.api.maps.model.LatLng;
import com.amap.api.maps.model.Marker;
import com.amap.api.maps.model.MarkerOptions;
import com.amap.api.maps.model.PolylineOptions;
import com.amap.api.services.core.LatLonPoint;
import com.amap.api.services.geocoder.RegeocodeQuery;
import com.phonegap.ebike.R;
import com.phonegap.natives.activity.MapActivity;
import com.phonegap.natives.tool.EBikeConstant;
import com.phonegap.natives.tool.L;
import com.phonegap.natives.tool.TimeTool;

import java.security.NoSuchAlgorithmException;
import java.security.spec.MGF1ParameterSpec;
import java.util.ArrayList;
import java.util.List;

import javax.crypto.KeyGenerator;

/**
 * Created by Trust on 2016/12/18.
 */
public class GPSHistory {
    private AMap aMap;
    private List<LatLng> latLngs = new ArrayList<LatLng>();
    private List<LatLng> GpslatLngs = new ArrayList<LatLng>();
    private List<LatLng> MaplatLngs = new ArrayList<LatLng>();
    private static final int START = 0;
    private static final int END = 1;

    private String titleMessage,bodyMessage;

//    private List<LatLng> cacheGPS = new ArrayList<LatLng>();

//    private List<LatLng> cacheMap = new ArrayList<LatLng>();
    private Context context;

    private TimeTool timeTool;
    private   RegeocodeQuery query;
    private static  String  name;
    private  List<BitmapDescriptor> texTuresList;
    private String startName,endName;
    private boolean  isStop = false;

    public  String GPSAddresName = "";

    public String getGPSAddresName() {
        return GPSAddresName;
    }

    public void setGPSAddresName(String GPSAddresName) {
        this.GPSAddresName = GPSAddresName;
    }


    public void setIsStop(boolean isStop)
    {
        this.isStop = isStop;
    }
    public Handler getHandler() {
        return handler;
    }

    public void setHandler(Handler handler) {
        this.handler = handler;
    }

    private MapActivity mapActivity;

    AMap endAmap;
    AMap startAmap;
    private Handler handler = new Handler(){
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what)
            {
                case EBikeConstant.START_LOCATION:
                    if(startName.equals("获取地址失败"))
                    {
                        startName = (String) msg.obj;
//                        addStartResIcon(latLngs.get(0),"起点",R.drawable.my_location_3, (String) msg.obj);
                    }else
                    {

//                        addStartResIcon(latLngs.get(0),"起点",R.drawable.my_location_3,startName);
                    }



                    aMap.animateCamera(CameraUpdateFactory.newCameraPosition(new CameraPosition(
                            new LatLng(latLngs.get(0).latitude,latLngs.get(0).longitude),//新的中心点坐标
                            500, //新的缩放级别
                            0, //俯仰角0°~45°（垂直与地图时为0）
                            0  ////偏航角 0~360° (正北方为0)
                    )));
                    L.i("start");
                    break;
                case EBikeConstant.END_LOCATION:
                    if(endName.equals("获取地址失败"))
                    {
                        endName = (String) msg.obj;
                        addEndResIcon(latLngs.get(latLngs.size()-1),"终点",R.drawable.car_location_3, (String) msg.obj,END);
                    }else
                    {

                        addEndResIcon(latLngs.get(latLngs.size()-1),"终点",R.drawable.car_location_3,endName,END);
                    }
                    L.i("end");
                    break;

                case EBikeConstant.EMPTY_GPS_MAP_CACHE:
                    GpslatLngs.clear();
                    MaplatLngs.clear();
                    break;

                case EBikeConstant.GPS_ADDRES:
                    L.i("address  name:"+(String) msg.obj);
                    GPSAddresName = (String) msg.obj;
                    setGPSAddresName((String) msg.obj);
                    break;
            }


        }
    };

    public GPSHistory(AMap aMap , Context context , MapActivity mapActivity) {
        this.aMap = aMap;
        this.context = context;
        this.mapActivity = mapActivity;
        initLiner();

        timeTool = new TimeTool();

        texTuresList = new ArrayList<BitmapDescriptor>();
        texTuresList.add(BitmapDescriptorFactory.fromResource(R.drawable.map_alr));
    }

    public void setLatLngs(List<LatLng> latLngs) {


        this.latLngs = latLngs;
    }


    private void initLiner() {
        endAmap = aMap;
        startAmap = aMap;
    }



    public void startHistory()
    {
//        aMap.clear();


        aMap.addPolyline(new PolylineOptions().
                addAll(latLngs).width(30).color(Color.parseColor("#020176")).setCustomTextureList(texTuresList));



         for (int i = 0 ; i<latLngs.size(); i++)
         {
             Log.d("GPSHistory", "坐标  点   :" + latLngs.get(i).latitude + "|" + latLngs.get(i).longitude);
         }


        if(latLngs.size() != 0)
        {
//            new GPSAddressName(context,new LatLonPoint(latLngs.get(0).latitude,latLngs.get(0).longitude),handler,EBikeConstant.START_LOCATION);
//            new GPSAddressName(context,new LatLonPoint(latLngs.get(latLngs.size()-1).latitude,latLngs.get(latLngs.size()-1).longitude),handler,EBikeConstant.END_LOCATION);

            L.i("起点 :经度纬度:"+latLngs.get(latLngs.size()-1).latitude+"|"+latLngs.get(latLngs.size()-1).longitude);
            L.i("终点 :经度纬度:"+latLngs.get(0).latitude+"|"+latLngs.get(0).longitude);
            addEndResIcon(latLngs.get(latLngs.size()-1),"终点",R.drawable.car_location_3, endName,END);
            addEndResIcon(latLngs.get(0),"起点",R.drawable.my_location_3,startName,START);
            aMap.animateCamera(CameraUpdateFactory.newCameraPosition(new CameraPosition(
                    new LatLng(latLngs.get(0).latitude,latLngs.get(0).longitude),//新的中心点坐标
                    500, //新的缩放级别
                    0, //俯仰角0°~45°（垂直与地图时为0）
                    0  ////偏航角 0~360° (正北方为0)
            )));
//            try {
//                Thread.sleep(3000);
//                addStartResIcon(latLngs.get(0),"起点",R.drawable.my_location_3,startName);
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
        }



    }




    public void  addGPSLocation(LatLng latLng,boolean status,long name ,int color,int icon)
    {


        L.i("cacheGPS size :"+mapActivity.getCacheGPS().size()+"当前坐标点:"+latLng);
        if(latLng != null && isStop ==false)
        {
            if(mapActivity!= null &&mapActivity.getCacheGPS().size() != 0)
            {
                GpslatLngs = mapActivity.getCacheGPS();

            }


            if(latLng.latitude != 0.0)
            {
                GpslatLngs.add(latLng);
            }
            hiddenMarker();

//            Log.d("GPSHistory", "为添加新的坐标点之前的 集合的长度 0:" + GpslatLngs.size());


            Log.d("GPSHistory", "添加新的坐标点之后的 集合的长度 1:" + GpslatLngs.size());
//            aMap.clear();
            if(GpslatLngs.size() != 0)
            {
                aMap.addPolyline(new PolylineOptions().
                        addAll(GpslatLngs).width(30).color(color).setCustomTextureList(texTuresList));

                GpsIcon(GpslatLngs.get(GpslatLngs.size()-1),icon,name);

//            Log.d("GPSHistory", "最新点坐标 json " + latLngs.get(latLngs.size() - 1).latitude + "|" + latLngs.get(latLngs.size() - 1).longitude);
//            new GPSPoints(context,aMap,latLngs.get(latLngs.size()-1),name,R.drawable.bike);
                if(status)
                {
//                aMap.clear();
                    aMap.animateCamera(CameraUpdateFactory.newCameraPosition(new CameraPosition(
                            new LatLng(GpslatLngs.get(GpslatLngs.size()-1).latitude,GpslatLngs.get(GpslatLngs.size()-1).longitude),//新的中心点坐标
                            500, //新的缩放级别
                            0, //俯仰角0°~45°（垂直与地图时为0）
                            0  ////偏航角 0~360° (正北方为0)
                    )));
                }

            }


            for (int i = 0;i<GpslatLngs.size();i++)
            {
                Log.d("GPSHistory", "获取到集合的 坐标  :" + GpslatLngs.get(i).latitude + "|" + GpslatLngs.get(i).longitude);
            }




//            MarkerOptions markerOption = new MarkerOptions();
//            markerOption.position(latLngs.get(latLngs.size() - 1));
//            markerOption.title(name).snippet("描述:");
//
//            markerOption.draggable(true);
//            markerOption.icon(
//
//                    BitmapDescriptorFactory.fromBitmap(BitmapFactory
//                            .decodeResource(context.getResources(),
//                                    R.drawable.bike)));
//            // 将Marker设置为贴地显示，可以双指下拉看效果
//            markerOption.setGps(true);
//            aMap.addMarker(markerOption);




//            latLngs = null;
            if(mapActivity != null )
            {
                mapActivity.setCacheGPS(GpslatLngs);
            }


        }

    }

    public void  addMapLocation(LatLng latLng,boolean status,long name ,int color,int icon)
    {
        if(latLng != null && isStop == false)
        {
            L.i("map "+mapActivity.getCacheMAP().size());

        if(mapActivity != null&& mapActivity.getCacheMAP().size() != 0)
        {
            MaplatLngs = mapActivity.getCacheMAP();
        }



            if(latLng.latitude != 0.0)
            {
                MaplatLngs.add(latLng);

            }


//            aMap.clear();

            aMap.addPolyline(new PolylineOptions().
                    addAll(MaplatLngs).width(30).color(color).setCustomTextureList(texTuresList));

            for (int i = 0;i<MaplatLngs.size();i++)
            {
                Log.d("GPSHistory", "获取到集合的 坐标  :" + MaplatLngs.get(i).latitude + "|" + MaplatLngs.get(i).longitude);
            }




//            MarkerOptions markerOption = new MarkerOptions();
//            markerOption.position(latLngs.get(latLngs.size() - 1));
//            markerOption.title(name).snippet("描述:");
//
//            markerOption.draggable(true);
//            markerOption.icon(
//
//                    BitmapDescriptorFactory.fromBitmap(BitmapFactory
//                            .decodeResource(context.getResources(),
//                                    R.drawable.bike)));
//            // 将Marker设置为贴地显示，可以双指下拉看效果
//            markerOption.setGps(true);
//            aMap.addMarker(markerOption);


            GpsIcon(MaplatLngs.get(MaplatLngs.size()-1),icon,name);

            Log.d("GPSHistory", "最新点坐标 json " + MaplatLngs.get(MaplatLngs.size() - 1).latitude + "|" + MaplatLngs.get(MaplatLngs.size() - 1).longitude);
//            new GPSPoints(context,aMap,latLngs.get(latLngs.size()-1),name,R.drawable.bike);
            if(status)
            {
//                aMap.clear();
                aMap.animateCamera(CameraUpdateFactory.newCameraPosition(new CameraPosition(
                        new LatLng(mapActivity.getCacheMAP().get(mapActivity.getCacheMAP().size()-1).latitude,mapActivity.getCacheMAP().get(mapActivity.getCacheMAP().size()-1).longitude),//新的中心点坐标
                        500, //新的缩放级别
                        0, //俯仰角0°~45°（垂直与地图时为0）
                        0  ////偏航角 0~360° (正北方为0)
                )));
            }


//            latLngs = null;

            if(mapActivity != null)
            {
                mapActivity.setCacheMAP(MaplatLngs);
            }

        }

    }


    public void GpsIcon ( LatLng latLng , int Icon,long name)
    {

        MarkerOptions markerOptions =   new MarkerOptions().
                position(latLng).title(timeTool.getGPSTime(name)).icon(BitmapDescriptorFactory.fromBitmap(BitmapFactory.decodeResource(context.getResources(),Icon)));
        aMap.addMarker(markerOptions).showInfoWindow();
    }


    public void hiddenMarker ()
    {
        aMap.clear();
    }


    View infoWindowEnd = null;
    public void addEndResIcon (LatLng latLng , String title , int Icon , String msg , final int types)
    {
        final String titleEnd = title;
        final String msgEnd = msg;
        endAmap.setOnMarkerClickListener(onMarkerClickListener);
        endAmap.setInfoWindowAdapter(new AMap.InfoWindowAdapter() {
            @Override
            public View getInfoWindow(Marker marker) {
                if(infoWindowEnd == null) {
                    infoWindowEnd = LayoutInflater.from(context).inflate(
                            R.layout.info_window, null);
                }
                TextView titleTv = (TextView) infoWindowEnd.findViewById(R.id.info_window_title);
                TextView msgTv = (TextView) infoWindowEnd.findViewById(R.id.info_window_msg);
                titleTv.setText(titleMessage);
                msgTv .setText(bodyMessage);

                return infoWindowEnd;
            }

            @Override
            public View getInfoContents(Marker marker) {
                return null;
            }
        });
        L.i("addEndResIcon");
        endAmap.addMarker(new MarkerOptions().
                position(latLng).
                title(title).
                snippet(msg).icon(BitmapDescriptorFactory.
                fromBitmap(BitmapFactory.decodeResource(context.getResources(),Icon))));

    }


    public void setName (String startName,String endName)
    {
        this.startName = startName;
        this.endName = endName;
    }


    public void seachAddres (LatLng latLng)
    {
        new GPSAddressName(context,new LatLonPoint(latLng.latitude,latLng.longitude),handler,EBikeConstant.GPS_ADDRES);
    }

    public AMap.OnMarkerClickListener onMarkerClickListener = new AMap.OnMarkerClickListener() {
        @Override
        public boolean onMarkerClick(Marker marker) {
            L.i("markerid:"+marker.getId());
            String path = marker.getId();
            String newPath =path.substring(6);
            int a = Integer.parseInt(newPath);
            if(a%2 == 0)
            {
                titleMessage = "起点";
                bodyMessage = startName;
            }else if(a%2 == 1)
            {
                titleMessage = "终点";
                bodyMessage = endName;
            }
            marker.showInfoWindow(); // 显示改点对应 的infowindow
            return false;
        }
    };


}
