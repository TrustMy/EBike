package com.phonegap.natives.activity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.PopupWindow;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.amap.api.maps.AMap;
import com.amap.api.maps.CameraUpdateFactory;
import com.amap.api.maps.MapView;
import com.amap.api.maps.model.LatLng;
import com.amap.api.trace.LBSTraceClient;
import com.amap.api.trace.TraceListener;
import com.amap.api.trace.TraceLocation;
import com.amap.api.trace.TraceOverlay;
import com.google.gson.Gson;
import com.phonegap.ebike.R;
import com.phonegap.natives.bean.CarLocationHistorical;
import com.phonegap.natives.bean.TestBean;
import com.phonegap.natives.bean.TestCheckBean;
import com.phonegap.natives.bean.TestGpsBean;
import com.phonegap.natives.httptool.GetHttpRequest;
import com.phonegap.natives.httptool.PostHttpRequest;
import com.phonegap.natives.locaction.GPSHistory;
import com.phonegap.natives.tool.CoordinateTransformation;
import com.phonegap.natives.tool.EBikeConstant;
import com.phonegap.natives.tool.EBikeSever;
import com.phonegap.natives.tool.ErrorPopopWindow;
import com.phonegap.natives.tool.L;
import com.phonegap.natives.tool.MenyPopupWindow;
import com.phonegap.natives.tool.NetWorkeAvailable;
import com.phonegap.natives.tool.TimeTool;
import com.phonegap.natives.tool.ToastUtil;
import com.phonegap.natives.tool.TraceAsset;
import com.phonegap.natives.tool.WaitPopopWindow;

import java.io.File;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.zip.GZIPOutputStream;

public class GPSHistoryActivity extends Activity implements TraceListener {
    private MapView mapView;
    private AMap aMap;

    private ImageView updateBtn;
    private Context context = GPSHistoryActivity.this;
    private List<LatLng> latLngs;
    private CarLocationHistorical carLocationHistorical;
    private int uid, operationType, operation, seq, seconds, durationtime;
    private long startTime, endTime;
    private String startName, endName;
    NetWorkeAvailable netWorkeAvailable;
    private CoordinateTransformation coordinateTransformation;
    private View mMenuLayout;

    private ImageView historyMenu;
    private MenyPopupWindow menyPopupWindow;
    private ListView mMenuListView;
    private PopupWindow mPopupWindowMenu;
    private ImageButton extBtn;
    private RelativeLayout rlTopBar;
    private List<TestCheckBean> mMenuList = new ArrayList<TestCheckBean>();

    private List<TraceLocation> ml = new ArrayList<TraceLocation>();

    //test
    private ConcurrentMap<Integer, TraceOverlay> mOverlayList = new ConcurrentHashMap<Integer, TraceOverlay>();


    private List<TraceLocation> mTraceList;
    private WaitPopopWindow waitPopopWindow;

    private GetHttpRequest getHttpRequest;

    private ErrorPopopWindow errorPopopWindow;

    private PostHttpRequest postHttpRequest;

    private String termId,token;

    private int mapType = 0;//0 是GPS   1是基站

    private ImageView ext;
    private Handler handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case EBikeConstant.CAR_LOCATION_HISTORICAL:

                    if (msg.arg1 == EBikeConstant.HTTP_SUCCESS) {
                        latLngs = new ArrayList<LatLng>();
                        L.i("start");
//                        endLat = new LatLonPoint(carGPSBean.getGps().getLat()/1000000.0,carGPSBean.getGps().getLng()/1000000.0);
//                        GPSHistory mHistory = new GPSHistory(aMap, context);
                        if (latLngs != null && latLngs.size() == 0) {


                            if (msg.obj != null) {
                                aMap.clear();
                                carLocationHistorical = (CarLocationHistorical) msg.obj;


                                //-------------->
//
//                                for (int i = 0; i < carLocationHistorical.getAlarmLists().size(); i++) {
//                                    if (carLocationHistorical.getAlarmLists().get(i).getLat() / 1000000.0 == 0.0) {
//                                        continue;
//                                    } else {
//
//                                        LatLng latLng =coordinateTransformation.transformation(new LatLng(carLocationHistorical.getAlarmLists().get(i).getLat() / 1000000.0,carLocationHistorical.getAlarmLists().get(i).getLng() / 1000000.0));
//                                        LatLng oldlatLng = new LatLng(carLocationHistorical.getAlarmLists().get(i).getLat() / 1000000.0,carLocationHistorical.getAlarmLists().get(i).getLng() / 1000000.0);
//                                        latLngs.add(latLng);
//
//                                    }
//
//                                }
//                                L.i("start guiJiJiuPian");
                                //--------------->
                                if(carLocationHistorical.getContent().getGps().size() == 0)
                                {
                                    if(waitPopopWindow != null)
                                    {
                                        waitPopopWindow.stopPopopWindow();
                                    }
                                    Toast.makeText(context, "服务器返回的json GPS 坐标点为0", Toast.LENGTH_SHORT).show();
                                }else
                                {
                                    guiJiJiuPian(carLocationHistorical);
                                }



                                //------------------>
//                                mHistory.setLatLngs(latLngs);
//                                mHistory.setName(startName,endName);
//                                mHistory.startHistory();
                            }
                        } else {
                            Toast.makeText(context, "历史记录错了1111", Toast.LENGTH_SHORT).show();
                        }
                    }else
                    {
                        L.i("gps histoey "+(String) msg.obj);
                        waitPopopWindow.stopPopopWindow();
                        startErrorPopopWindow((String) msg.obj);
                    }

                    break;


                case EBikeConstant.ERROR:
                    if (msg.obj != null) {
                        String message = (String) msg.obj;
//                        Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
                        waitPopopWindow.stopPopopWindow();
                        startErrorPopopWindow(message);
                    }
                    break;

                case 100:
                    waitPopopWindow = new WaitPopopWindow();
                    waitPopopWindow.setMsg("正在加载历史轨迹,请耐心等待!");
                    waitPopopWindow.showPopopWindow(context, extBtn);
                    postHttpRequest.doPostCheckCarHistoryLocation(EBikeSever.server_url+EBikeSever.car_history_location_url,termId,token,startTime,endTime,EBikeConstant.CAR_LOCATION_HISTORICAL);
                    break;

                case EBikeConstant.REQUEST_TYPE://切换基站或者GPS数据轨迹
                    if(waitPopopWindow != null)
                    {
                        waitPopopWindow.setMsg("正在加载历史轨迹,请耐心等待!");
                        waitPopopWindow.showPopopWindow(context, extBtn);
                    }

                    if(msg.arg1 == 0)
                    {
                        L.i("GPS 数据");

                        mapType = 0;

//                        if(checkIntent())
//                        {
//                            initLocation();
//                        }else
//                        {
//                            ToastUtil.showToast(context,"请检查网络!");
//                        }
                        checkCoordinate();

                    }else
                    {
                        mapType = 1;
                        L.i("基站 数据");
                        Toast.makeText(context, "基站接口未开通,请耐心等待!", Toast.LENGTH_SHORT).show();
//                        checkCoordinate();
                        stopPopopuwindow();
                    }

                break;
            }
        }
    };


    public void checkCoordinate()
    {

        if(checkIntent())
        {

            if(carLocationHistorical == null)
            {
                initLocation();
            }else if(carLocationHistorical.getContent().getGps().size() == 0)
            {
                ToastUtil.showToast(context,"本次行程坐标点为空");
                stopPopopuwindow();
            }else
            {
                aMap.clear();
                guiJiJiuPian(carLocationHistorical);
            }




        }else
        {
            ToastUtil.showToast(context,"请检查当前网络!");
            stopPopopuwindow();
        }



    }

    public void stopPopopuwindow()
    {
        if(waitPopopWindow != null)
        {
            waitPopopWindow.stopPopopWindow();
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setRequestedOrientation(ActivityInfo
                .SCREEN_ORIENTATION_PORTRAIT);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_gpshistory);
        mapView = (MapView) findViewById(R.id.history_map);
        mapView.onCreate(savedInstanceState);// 此方法必须重写
    //18621579338
        init();
        Intent intent = getIntent();
        uid = intent.getIntExtra("uid", 0);
        startTime = intent.getLongExtra("startTime", 0);
        endTime = intent.getLongExtra("endTime", 0);
        startName = intent.getStringExtra("startName");
        endName = intent.getStringExtra("endName");
        seq = intent.getIntExtra("seq", 0);
        termId = intent.getStringExtra("termId");
        token = intent.getStringExtra("token");

        TimeTool time = new TimeTool();
        String st = startTime+"";
        String et = endTime+"";
        try {
            startTime =time.getTime(st);
            endTime = time.getTime(et);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Log.d("GPSHistoryActivity", "GPS 参数 " + uid + "|" + startTime + "|" + endTime + "|" + seq);
        initDate();

        if ( seq != 0 && startTime != 0 && !termId.equals("") && !token.equals("")) {
            if (checkIntent()) {
                initLocation();

            } else {
                Toast.makeText(context, "网络异常,请检查网络!", Toast.LENGTH_SHORT).show();
                aMap.moveCamera(CameraUpdateFactory.zoomTo(3));
            }
        } else {
            Toast.makeText(context, "获取历史记录失败,请重新获取。", Toast.LENGTH_SHORT).show();
        }


    }

    private boolean checkIntent() {
        netWorkeAvailable = new NetWorkeAvailable();
//        netWorkeAvailable.isMobile(context);

//        netWorkeAvailable.isWiFi(context);

//        Log.d("MapActivity", "检查手机网络 : " + netWorkeAvailable.isMobile(context) + "|" + netWorkeAvailable.isNetworkAvailable(context) + "|" + netWorkeAvailable.isWiFi(context));
        return netWorkeAvailable.isNetworkAvailable(context);
    }


    private void initDate() {
//        uid = 7;/
        operationType = 3;
        operation = 1;
//        seq = 739616;
        durationtime = EBikeConstant.STOP_ALWAYS_TRACKING;
        seconds = EBikeConstant.TIME;
        coordinateTransformation = new CoordinateTransformation(context);
//        startTime = "20161221112334";
//        endTime = "20161221112545";


    }

    private void initLocation() {

//        getHttpRequest = new GetHttpRequest(context, handler, aMap, new GPSHistory(aMap, context,null));
        Toast.makeText(context, "正在获取历史行程,请稍后!", Toast.LENGTH_SHORT).show();

        handler.sendEmptyMessageDelayed(100, 10);
    }

    /**
     * 初始化AMap对象
     */
    private void init() {


        if (aMap == null) {
            aMap = mapView.getMap();
            aMap.moveCamera(CameraUpdateFactory.zoomTo(3));
//            aMap.moveCamera(CameraUpdateFactory.zoomOut());
//            LatLng latLng = new LatLng(39.9043964220,116.3944447341);
//            LatLng latLng1 = new LatLng(39.9188321862,116.3448242973);
//            LatLngBounds bounds = new LatLngBounds(latLng,latLng1);
//            aMap.moveCamera(CameraUpdateFactory.newLatLngBounds(bounds, 100, 100, 2));
        }
        historyMenu = (ImageView) findViewById(R.id.history_menu);
        extBtn = (ImageButton) findViewById(R.id.history_ext);
        rlTopBar = (RelativeLayout) findViewById(R.id.history_titles);

        mMenuList.add(new TestCheckBean(0,"GPS定位"));
        mMenuList.add(new TestCheckBean(1,"基站定位"));

        menyPopupWindow = new MenyPopupWindow(this,mMenuLayout, mMenuListView, mPopupWindowMenu, handler,EBikeConstant.REQUEST_TYPE);
        menyPopupWindow.showPopupWidow( historyMenu, getLayoutInflater(), extBtn, rlTopBar, mMenuList);

        updateBtn = (ImageView)findViewById(R.id.update);


        mTraceList = TraceAsset.parseLocationsData(this.getAssets(),
                "traceRecord" + File.separator + "AMapTrace.txt");


        postHttpRequest = new PostHttpRequest(context,handler,aMap,new GPSHistory(aMap,context,null));
    }

    /**
     * 方法必须重写
     */
    @Override
    protected void onResume() {
        super.onResume();
        mapView.onResume();
    }

    /**
     * 方法必须重写
     */
    @Override
    protected void onPause() {
        super.onPause();
        mapView.onPause();
    }

    /**
     * 方法必须重写
     */
    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        mapView.onSaveInstanceState(outState);
    }

    /**
     * 方法必须重写
     */
    @Override
    protected void onDestroy() {
        super.onDestroy();
        mapView.onDestroy();

    }

    public void closeGPSHistoryActivity(View v) {
        finish();
    }


    public void guiJiJiuPian(CarLocationHistorical carLocationHistorical) {
        LBSTraceClient mTraceClient = new LBSTraceClient(this.getApplicationContext());
        L.i("guiJiJiuPian  carLocationHistorical.size ():"+carLocationHistorical.getContent().getGps().size());
       if(latLngs.size() == 0)
       {


        for (int i = carLocationHistorical.getContent().getGps().size() -1; i >=0 ; i--) {
            if (carLocationHistorical.getContent().getGps().get(i).getLat() == 0.0 || carLocationHistorical.getContent().getGps().get(i).getType() != 0) {
                continue;
            }else
            {
                LatLng latLng =coordinateTransformation.transformation(new LatLng(carLocationHistorical.getContent().getGps().get(i).getLat() ,carLocationHistorical.getContent().getGps().get(i).getLng() ));
                LatLng GPS = new LatLng(carLocationHistorical.getContent().getGps().get(i).getLat(),carLocationHistorical.getContent().getGps().get(i).getLng() );
//                ml.add(new TraceLocation(GPS.latitude,GPS.longitude, 1, 1, 1));
                latLngs.add(latLng);
            }

        }
       }
        if(latLngs.size() != 0)
        {
            huaLiner(new GPSHistory(aMap,context,null));
        }else
        {
            stopPopopuwindow();
            ToastUtil.showToast(context,"坐标点为0");
        }




        L.i("mTraceList.size() :"+mTraceList.size());
//        mTraceClient.queryProcessedTrace(1, ml,LBSTraceClient.TYPE_AMAP, this);


        //------------------>
//        List<CarLocationHistorical.AlarmListsBean> newList;
//        for (int i=0;i<carLocationHistorical.getAlarmLists().size();i+= 100)
//        {
//            List<TraceLocation> mTraceLocation = new ArrayList<TraceLocation>();
//            if(i < (carLocationHistorical.getAlarmLists().size() / 100)* 100)
//            {
//                newList =  carLocationHistorical.getAlarmLists().subList(i,i+99);
//            }else
//            {
//                newList =  carLocationHistorical.getAlarmLists().subList(i,carLocationHistorical.getAlarmLists().size());
//            }
//
//            for(int j = 0 ; j<newList.size();j++)
//            {
//                if(newList.get(j).getLat() / 1000000.0 == 0.0)
//                {
//                    continue;
//                }else
//                {
//                    mTraceLocation.add(new TraceLocation(newList.get(j).getLat()/1000000.0,newList.get(j).getLng()/1000000.0,1,1,1));
//                }
//            }
//            mTraceClient.queryProcessedTrace(1, mTraceLocation, 3, this);
//
//        }
        //------->
//        List<String> mlist = new ArrayList<String>();
//        for (int i = 0; i < 1001; i++) {
//            mlist.add(i+"");
//        }
//
//        for (int i = 0; i < mlist.size(); i+=100) {
//
//            L.i("mlist.size() :"+mlist.size()+"| i:"+i);
//            if(i < (mlist.size() / 100)* 100)
//            {
//                L.i("mlist.size():"+mlist.size());
//                List<String> mls =  mlist.subList(i,i+99);
//                L.i("mls .size ():"+mls.size());
//            }else
//            {
//                List<String> mls =  mlist.subList(i,mlist.size());
//                L.i("end mls .size ():"+mls.size());
//            }
//
//        }

    }

    @Override
    public void onRequestFailed(int num, String s) {
        /*
        GPSHistory mHistory = new GPSHistory(aMap, context,null);
        int listSize = 0;
        L.i("onRequestFailed   num:"+num+"| s:"+s);
        Toast.makeText(context,s,Toast.LENGTH_SHORT).show();
//        L.i("carLocationHistorical.getAlarmLists().size():"+carLocationHistoricalgetContent().getGps().size());
            for (int i = 0; i < carLocationHistorical.getContent().getGps().size(); i++) {
                L.i("carLocationHistorical 坐标:"+carLocationHistorical.getContent().getGps().get(i).getLat()+"|"+carLocationHistorical.getContent().getGps().get(i).getLng());
                                    if (carLocationHistorical.getContent().getGps().get(i).getLat() == 0.0) {
                                        listSize++;
                                        if(listSize == carLocationHistorical.getContent().getGps().size())
                                        {
//                                            Toast.makeText(context,"本次行程坐标无效:0.0",Toast.LENGTH_SHORT).show();
                                            waitPopopWindow.stopPopopWindow();
                                            startErrorPopopWindow("本次行程坐标全部为:0.0");
                                            listSize = 0;
                                        }
                                        continue;
                                    } else {

                                        LatLng latLng =coordinateTransformation.transformation(new LatLng(carLocationHistorical.getContent().getGps().get(i).getLat(),carLocationHistorical.getContent().getGps().get(i).getLng()));
                                        LatLng oldlatLng = new LatLng(carLocationHistorical.getContent().getGps().get(i).getLat(),carLocationHistorical.getContent().getGps().get(i).getLng());
                                        latLngs.add(latLng);

                                    }

                                }

        if(latLngs.size() != 0)
        {
            huaLiner(mHistory);
        }else
        {
            ToastUtil.showToast(context,"坐标点为空");
        }

    */
    }

    @Override
    public void onTraceProcessing(int i, int i1, List<LatLng> list) {


    }

    @Override
    public void onFinished(int i, List<LatLng> list, int i1, int i2) {
        L.i("onFinished  list.size ():"+list.size());

        /*

        GPSHistory mHistory = new GPSHistory(aMap, context,null);




        for (int nums = 0; nums <list.size(); nums ++)
        {
            LatLng latLng = coordinateTransformation.transformation(new LatLng(list.get(nums).latitude, list.get(nums).longitude));
            LatLng oldlatLng = new LatLng(carLocationHistorical.getContent().getGps().get(i).getLat(), carLocationHistorical.getContent().getGps().get(i).getLng());
            latLngs.add(latLng);
        }


        huaLiner(mHistory);

    */


    }

    public void huaLiner (GPSHistory mHistory)
    {
        L.i("huaLiner:"+latLngs.size());
        mHistory.setLatLngs(latLngs);
        mHistory.setName(startName, endName);
        mHistory.startHistory();

        waitPopopWindow.stopPopopWindow();
    }


    /**
     * 轨迹纠偏点转换为地图LatLng
     *
     * @param traceLocationList
     * @return
     */
    public List<LatLng> traceLocationToMap(List<TraceLocation> traceLocationList) {
        List<LatLng> mapList = new ArrayList<LatLng>();
        for (TraceLocation location : traceLocationList) {
            LatLng latlng = new LatLng(location.getLatitude(),
                    location.getLongitude());
            mapList.add(latlng);
        }
        return mapList;
    }



    /**
     * 设置显示总里程和等待时间
     *
     * @param overlay
     */
    private void setDistanceWaitInfo(TraceOverlay overlay) {
        int distance = -1;
        int waittime = -1;
        if (overlay != null) {
            distance = overlay.getDistance();
            waittime = overlay.getWaitTime();
        }
        DecimalFormat decimalFormat = new DecimalFormat("0.0");
        ;
//        mResultShow.setText(mDistanceString
//                + decimalFormat.format(distance / 1000d) + DISTANCE_UNIT_DES);
//        mLowSpeedShow.setText(mStopTimeString
//                + decimalFormat.format(waittime / 60d) + TIME_UNIT_DES);
    }


    public void startErrorPopopWindow(String msg) {
        try {
            Thread.sleep(100);
            errorPopopWindow = new ErrorPopopWindow();
            errorPopopWindow.setMsg(msg);
            errorPopopWindow.showPopopWindow(context, mapView);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    public void updateDate(View v)
    {
        synchronized (this) {

            checkCoordinate();
        }
    }

}
