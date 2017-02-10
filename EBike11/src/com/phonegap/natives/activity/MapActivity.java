package com.phonegap.natives.activity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.location.Location;
import android.location.LocationListener;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.PopupWindow;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationListener;
import com.amap.api.maps.AMap;
import com.amap.api.maps.CameraUpdateFactory;
import com.amap.api.maps.LocationSource;
import com.amap.api.maps.MapView;
import com.amap.api.maps.model.LatLng;
import com.amap.api.services.core.LatLonPoint;
import com.amap.api.services.route.BusRouteResult;
import com.amap.api.services.route.DriveRouteResult;
import com.amap.api.services.route.RideRouteResult;
import com.amap.api.services.route.RouteSearch;
import com.amap.api.services.route.WalkRouteResult;
import com.phonegap.ebike.R;
import com.phonegap.natives.bean.CarGPSBean;
import com.phonegap.natives.bean.TestCheckBean;
import com.phonegap.natives.httptool.GetHttpRequest;
import com.phonegap.natives.httptool.GetRequest.GetRequestClasz;
import com.phonegap.natives.httptool.LwaysTrackingLine;
import com.phonegap.natives.httptool.PostHttpRequest;
import com.phonegap.natives.httptool.PostRequest.PostRequestClasz;
import com.phonegap.natives.httptool.PostRequest.TrackPostHtttp;
import com.phonegap.natives.locaction.GPSHistory;
import com.phonegap.natives.locaction.GPSRoutePlanning;
import com.phonegap.natives.tool.AndroidCheckVersion;
import com.phonegap.natives.tool.CoordinateTransformation;
import com.phonegap.natives.tool.EBikeConstant;
import com.phonegap.natives.tool.EBikeSever;
import com.phonegap.natives.tool.ErrorPopopWindow;
import com.phonegap.natives.tool.L;
import com.phonegap.natives.tool.MenyPopupWindow;
import com.phonegap.natives.tool.NetWorkeAvailable;
import com.phonegap.natives.tool.Reminder;
import com.phonegap.natives.tool.StopTimeIntent;
import com.phonegap.natives.tool.TimeTest;
import com.phonegap.natives.tool.TimeTool;
import com.phonegap.natives.tool.WaitPopopWindow;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import cn.iwgang.countdownview.CountdownView;
import cn.iwgang.countdownview.DynamicConfig;


public class MapActivity extends AppCompatActivity implements View.OnClickListener, LocationSource, LocationListener, AMapLocationListener, RouteSearch.OnRouteSearchListener {
    private MapView mapView;
    private AMap aMap;
    private ImageButton alwaysSracking;
    private ImageButton openBuzzer;
    private ImageButton followMe;
    private ImageButton netWork;
    private ImageButton extBtn;

    private boolean buzzerStatus = false, trackStatus = false, followMeStatus = false, netWorkStatus = false;
    private static ImageView loading;

    private int uid, operationType, operation,  seconds, durationtime;
//    private String start  Time, endTime;


    private LatLonPoint startLat;
    private LatLonPoint endLat;


    public AMapLocationClient mLocationClient = null;
    //声明AMapLocationClientOption对象
    public AMapLocationClientOption mLocationOption = null;
    private OnLocationChangedListener mListener;

    private GPSRoutePlanning gpsRoutePlanning;

    private GPSHistory gpsHistory;

    private int TrackGPSNum = 0;

    private TimeTest timeTest;

    private PostRequestClasz postRequestClasz;
    private GetRequestClasz carGPSRequest;

    private Context context = MapActivity.this;

    private WaitPopopWindow popopWindow;

    private Reminder reminder;

    private CarGPSBean carGPSBean;
    private boolean isMapLiner = true;
    //    private Error error;
    private ErrorPopopWindow errorPopopWindow;

    private int trackFirstTiem = 0;

    private String beforeTime = null;
    private String nowTime = null;

    private TimeTool timeTool = new TimeTool();

    //计时器
    private boolean hasBackgroundCountdownView = false;
    private CountdownView mCvCountdownViewTest, mCvCountdownViewTestHasBg;
    //    private  long TIMES = (long)8 * 24 * 60 * 60 * 1000;
    private long TIMES = (long) 300 * 1000;
    private long ENDTIMES = 0;

    private NetWorkeAvailable netWorkeAvailable;

    private AndroidCheckVersion androidCheckVersion;

    private CoordinateTransformation coordinateTransformation;

    private boolean isShowCarLocation = false;

    private ImageView mMenu;
    private View mMenuLayout;
    private ListView mMenuListView;
    private PopupWindow mPopupWindowMenu;
    private RelativeLayout rlTopBar;
    private MenyPopupWindow menyPopupWindow;
    private List<TestCheckBean> mMenuList = new ArrayList<TestCheckBean>();

    private GetHttpRequest getHttpRequest;
    private PostHttpRequest postHttpRequest;
    private LwaysTrackingLine lwaysTrackingLine;

    private WaitPopopWindow waitPopopWindow;
    private RelativeLayout home;

    private StopTimeIntent stopTimeIntent;

    private List<LatLng> cacheGPS = new ArrayList<LatLng>();
    private List<LatLng> cacheMAP = new ArrayList<LatLng>();

    private String userPhone,token,termId,appSN = "1484897327",seq;

    private boolean isOpenBuzzerStatus  = false;

//    public boolean isMapLiner() {
//        return isMapLiner;
//    }


    public List<LatLng> getCacheMAP() {
        return cacheMAP;
    }

    public void setCacheMAP(List<LatLng> cacheMAP) {
        this.cacheMAP = cacheMAP;
    }

    public List<LatLng> getCacheGPS() {
        return cacheGPS;
    }

    public void setCacheGPS(List<LatLng> cacheGPS) {
        this.cacheGPS = cacheGPS;
    }

    private Handler handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {

            switch (msg.what) {


                case EBikeConstant.CAR_LOCATIOM:
                    if (msg.arg1 == EBikeConstant.HTTP_SUCCESS) {
                        //初始化成功  获取车辆成功
                        carGPSBean = (CarGPSBean) msg.obj;
                        L.i("followMeStatus:" + followMeStatus);
                        if (followMeStatus) {
                            L.i("跟我走");
                            doFollowMe();
                        }
                    } else {
//                        if (popopWindow != null) {
//                            popopWindow.stopPopopWindow();
//                        }
//                        Toast.makeText(context, , Toast.LENGTH_SHORT).show();
                        startErrorPopopWindow((String) msg.obj);

                    }
                    if (waitPopopWindow != null) {
                        waitPopopWindow.stopPopopWindow();
                    }


                    break;

                case EBikeConstant.BUZZER:

                    if (msg.arg1 == EBikeConstant.HTTP_SUCCESS) {
                        //执行成功
                        if (buzzerStatus) {
                            openBuzzer.setImageResource(R.drawable.bell_1);
                            buzzerStatus = false;
                        } else {
                            openBuzzer.setImageResource(R.drawable.bell_3);
                            buzzerStatus = true;
                        }

                        if (popopWindow != null) {
                            popopWindow.stopPopopWindow();
                        }
                    } else {
//                        errorPopopWindow = new ErrorPopopWindow();
////                        Toast.makeText(context,(String)msg.obj, Toast.LENGTH_SHORT).show();
//                        errorPopopWindow.setMsg((String)msg.obj);
//                        errorPopopWindow.showPopopWindow(context,mapView);
                        if (popopWindow != null) {
                            popopWindow.stopPopopWindow();
                        }
                        startErrorPopopWindow((String) msg.obj);
                    }


                    break;

                case EBikeConstant.ALWAYS_TRACKING:
                    synchronized (this) {


                        if (msg.arg1 == EBikeConstant.HTTP_SUCCESS) {
//                        Toast.makeText(context, "实时追踪返回成功", Toast.LENGTH_SHORT).show();

                            Log.i("lhh", "返回实时追踪操作成功后  trackStatus:" + trackStatus + "| TrackGPSNum :" + TrackGPSNum);
//                        reminder = new Reminder(EBikeConstant.TIME, context, handler);
                            L.i("gpsHistory :"+gpsHistory);
                            L.i("当前 保存的点:"+getCacheGPS().size()+"|map :"+getCacheMAP().size());
                            if (gpsHistory != null) {


                                if (trackStatus == false && TrackGPSNum == -1) {

//                                    aMap.clear();
                                    //关闭
                                    mCvCountdownViewTest.stop();
                                    mCvCountdownViewTest.start(ENDTIMES);
                                    mCvCountdownViewTest.stop();
                                    mCvCountdownViewTest.setVisibility(View.INVISIBLE);
//
                                    alwaysSracking.setImageResource(R.drawable.track_1);
//
                                    TrackGPSNum = 0;
//

                                    timeTest.stopTime();
//                                    gpsHistory.hiddenMarker();
//
                                    //lwaysTrackingLine http request All is Close!
                                    lwaysTrackingLine.stopOkHttpClient();

                                    durationtime = EBikeConstant.STOP_ALWAYS_TRACKING;

                                    followMeStatus = false;
                                    followMe.setClickable(true);
                                    followMe.setImageResource(R.drawable.walk);


                                    openBuzzer.setClickable(true);
                                    if(buzzerStatus)
                                    {
                                        openBuzzer.setImageResource(R.drawable.bell_3);
                                    }else
                                    {
                                        openBuzzer.setImageResource(R.drawable.bell_1);
                                    }




                                } else {
                                    //开始


                                    trackStatus = true;
                                    mCvCountdownViewTest.start(TIMES);
                                    mCvCountdownViewTest.setVisibility(View.VISIBLE);


                                    alwaysSracking.setImageResource(R.drawable.track_4);


                                    followMe.setClickable(false);
                                    followMe.setImageResource(R.drawable.walk_2);

                                    timeTest = new TimeTest(0, context, handler);
                                    timeTest.startTime();

                                    openBuzzer.setClickable(false);
                                    if(buzzerStatus)
                                    {
                                        openBuzzer.setImageResource(R.drawable.bell_4);
                                    }else
                                    {
                                        openBuzzer.setImageResource(R.drawable.bell_2);
                                    }

                                }


                            }
                        } else {

                            startErrorPopopWindow((String) msg.obj);

                        }
//                        Toast.makeText(context,(String)msg.obj, Toast.LENGTH_SHORT).show();
                        if (popopWindow != null) {
                            popopWindow.stopPopopWindow();
                        }


                    }
                    break;

                case EBikeConstant.ALWAYS_TRACKING_LINE:

                    if (checkIntent()) {

                        if (msg.arg1 == EBikeConstant.HTTP_SUCCESS) {
                            if (!trackStatus) {

//                                gpsHistory.hiddenMarker();
//                                aMap.clear();

                                break;
                            } else if (TrackGPSNum <= 300 && trackStatus) {


                                trackFirstTiem++;
                                TrackGPSNum++;

//                                try {
//                                    lwaysTrackingLine.setIsMapLiner(isMapLiner);
//                                    lwaysTrackingLine.doGet(EBikeSever.server_url + EBikeSever.car_location + "?userUid=" + uid, EBikeConstant.ALWAYS_TRACKING_LINE);
//                                } catch (IOException e) {
//                                    e.printStackTrace();
//                                }
                                 new TrackPostHtttp(handler,context,aMap,termId,token,gpsHistory).execute();

                            }

                        } else {
                        Toast.makeText(context, (String) msg.obj,Toast.LENGTH_SHORT).show();
//                            startErrorPopopWindow((String) msg.obj);

                        }
                        if (popopWindow != null) {
                            popopWindow.stopPopopWindow();
                        }
                    } else {
                        Toast.makeText(context, "当前网络异常,请检查网络!", Toast.LENGTH_SHORT).show();
                    }
                    break;


                case EBikeConstant.ERROR:

                    synchronized (this) {
                        if (msg.obj != null && context != null) {
                            String message = (String) msg.obj;
                            Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
                            errorPopopWindow = new ErrorPopopWindow();
                            errorPopopWindow.setMsg(message);
                            errorPopopWindow.showPopopWindow(context, mapView);
                            if (msg.arg2 == -1) {
                                if (popopWindow != null) {
                                    popopWindow.stopPopopWindow();

                                }

                            }
                        }
                    }
                    break;

                case EBikeConstant.STOP_ALWAYS_TRACKING_LINE:
                    if (msg.arg1 != EBikeConstant.HTTP_SUCCESS) {
//                        TrackGPSNum = -1;
//                        trackStatus = false;
//                        alwaysSracking.setImageResource(R.drawable.track_1);
////                        Toast.makeText(context, , Toast.LENGTH_SHORT).show();
//                        errorPopopWindow.setMsg("车辆位置信息错误!");
//                        errorPopopWindow.showPopopWindow(context,mapView);
                    }
                    break;

                case EBikeConstant.CAR_STATUS:
                    Log.d("MapActivity", "蜂鸣器状态 :" + msg.arg2);
                    if (msg.arg1 == EBikeConstant.HTTP_SUCCESS) {


//                        Toast.makeText(context, "status +arg2 :"+msg.arg2, Toast.LENGTH_SHORT).show();
                        if (msg.arg2 == EBikeConstant.CLOSE_BUZZER) {
                            openBuzzer.setImageResource(R.drawable.bell_1);
                            buzzerStatus = false;

                        } else {
                            openBuzzer.setImageResource(R.drawable.bell_3);
                            buzzerStatus = true;
                        }
                    } else {
//                        errorPopopWindow = new ErrorPopopWindow();
////                        Toast.makeText(context, , Toast.LENGTH_SHORT).show();
//                        errorPopopWindow.setMsg((String) msg.obj);
//                        errorPopopWindow.showPopopWindow(context,mapView);
                        startErrorPopopWindow((String) msg.obj);
                    }

                    try {
                        postHttpRequest.doPostCheckCarLcation(EBikeSever.server_url + EBikeSever.car_location_url, termId,token, EBikeConstant.CAR_LOCATIOM);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                    break;

                case 10:

                    gpsHistory.setIsStop(true);

                    Log.i("lhh", "5分钟到了 ");
                    //关闭
                    mCvCountdownViewTest.stop();
                    mCvCountdownViewTest.start(ENDTIMES);
                    mCvCountdownViewTest.stop();
                    mCvCountdownViewTest.setVisibility(View.INVISIBLE);
//
                    alwaysSracking.setImageResource(R.drawable.track_1);
                    trackStatus = false;
//
                    TrackGPSNum = 0;
//
                    if(timeTest!= null)
                    {
                        timeTest.stopTime();
//                        aMap.clear();
                    }
//                    gpsHistory.hiddenMarker();
//
////                                netWork.setClickable(false);
////                                netWork.setImageResource(R.drawable.locally_3);
////                                netWorkStatus = false;
//

                    durationtime = EBikeConstant.STOP_ALWAYS_TRACKING;
                    followMe.setClickable(true);
                    followMe.setImageResource(R.drawable.walk);

                   if(buzzerStatus)
                   {
                       openBuzzer.setImageResource(R.drawable.bell_3);
                   }else
                   {
                       openBuzzer.setImageResource(R.drawable.bell_1);
                   }
                    openBuzzer.setClickable(true);



                    break;


                case 12://更新实时追踪 基站定位 是否显示状态

                    Log.i("lhh", "update net work" + (Boolean) msg.obj);
                    if ((Boolean) msg.obj) {

                        isMapLiner = true;


                    } else {

                        isMapLiner = false;

                    }

                    break;

                case 100:
//                    waitPopopWindow = new WaitPopopWindow();
//                    waitPopopWindow.showPopopWindow(context, home);
                    break;
            }

        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setRequestedOrientation(ActivityInfo
                .SCREEN_ORIENTATION_PORTRAIT);
        setContentView(R.layout.activity_map);
        mapView = (MapView) findViewById(R.id.map);
        mapView.onCreate(savedInstanceState);// 此方法必须重写


        init();


        androidCheckVersion = new AndroidCheckVersion(context);


        Intent intent = getIntent();
        uid = intent.getIntExtra("uid", 0);
        termId = intent.getStringExtra("termId");
        token = intent.getStringExtra("token");
        userPhone = intent.getStringExtra("userPhone");
        seq = intent.getStringExtra("seq");

        L.i("termId:"+termId+"|token:"+token+"|userPhone:"+userPhone+"|seq:"+seq);
        if (termId == null) {
            Toast.makeText(context, "uid异常 请重新进入本页面", Toast.LENGTH_SHORT).show();
        } else {

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {


                if (androidCheckVersion.checkVersion()) {
                    if (checkIntent()) {
                        initLocation();
                    } else {
                        Toast.makeText(context, "当前网络异常,请检查网络!", Toast.LENGTH_SHORT).show();
                        aMap.moveCamera(CameraUpdateFactory.zoomTo(3));
                    }
                } else {

                    Toast.makeText(context, "你拒绝了定位请求", Toast.LENGTH_SHORT).show();

                }
            } else {
                if (checkIntent()) {
                    Toast.makeText(context, "正在定位请稍后!", Toast.LENGTH_SHORT).show();
                    initLocation();
//                    carGPSRequest = new GetRequestClasz(handler, EBikeConstant.CAR_LOCATIOM, MapActivity.this, aMap,isShowCarLocation);
//                    carGPSRequest.execute(EBikeSever.server_url + EBikeSever.car_location + "?userUid=" + uid);

//                    try {
//                        getHttpRequest.doGet(EBikeSever.server_url + EBikeSever.car_location + "?userUid=" + uid, EBikeConstant.CAR_LOCATIOM);
                        handler.sendEmptyMessageDelayed(100, 10);
//
//
//                    } catch (IOException e) {
//                        L.i(e.getMessage());
//                        e.printStackTrace();
//                    }
                    checkCarStatus();
                } else {
                    Toast.makeText(context, "当前网络异常,请检查网络!", Toast.LENGTH_SHORT).show();
                    aMap.moveCamera(CameraUpdateFactory.zoomTo(3));
                }
            }
//
        }


    }

    private boolean checkIntent() {
        netWorkeAvailable = new NetWorkeAvailable();
//        netWorkeAvailable.isMobile(context);

//        netWorkeAvailable.isWiFi(context);

//        Log.d("MapActivity", "检查手机网络 : " + netWorkeAvailable.isMobile(context) + "|" + netWorkeAvailable.isNetworkAvailable(context) + "|" + netWorkeAvailable.isWiFi(context));
        return netWorkeAvailable.isNetworkAvailable(context);
    }

    private void initLocation() {


        coordinateTransformation = new CoordinateTransformation(context);

        timeTool = new TimeTool();
        Log.d("MapActivity", "当前时间 " + timeTool.getSystemTime());


        errorPopopWindow = new ErrorPopopWindow();
//        popopWindow.showPopopWindow(get,alwaysSracking,loading);
        gpsHistory = new GPSHistory(aMap, context,this);
        getHttpRequest = new GetHttpRequest(context, handler, aMap, gpsHistory);
        lwaysTrackingLine = new LwaysTrackingLine(context, handler, aMap, gpsHistory);
        postHttpRequest = new PostHttpRequest(context, handler,aMap,gpsHistory);

//        uid = 7;
        operationType = 3;
        operation = 1;
//        seq = 739616;
        durationtime = EBikeConstant.STOP_ALWAYS_TRACKING;
        seconds = EBikeConstant.TIME;

//        startTime = "20161221112334";
//        endTime = "20161221112545";


    }


    /**
     * 初始化AMap对象
     */
    private void init() {
        if (aMap == null) {
            aMap = mapView.getMap();
            // 设置定位监听
            aMap.setLocationSource(this);
            // 设置为true表示显示定位层并可触发定位，false表示隐藏定位层并不可触发定位，默认是false
            aMap.setMyLocationEnabled(true);
            // 设置定位的类型为定位模式，有定位、跟随或地图根据面向方向旋转几种
//            AMap.moveCamera(CameraUpdateFactory. zoomIn())

            aMap.setMapType(AMap.MAP_TYPE_NORMAL);
        }

//        setMapCustomStyleFile(this);

        alwaysSracking = (ImageButton) findViewById(R.id.alwaysSracking);
        openBuzzer = (ImageButton) findViewById(R.id.openBuzzer);
        followMe = (ImageButton) findViewById(R.id.followMe);
//        netWork = (ImageButton) findViewById(R.id.network);
        extBtn = (ImageButton) findViewById(R.id.mapactivity_ext);
        home = (RelativeLayout) findViewById(R.id.home);


        alwaysSracking.setOnClickListener(this);
        openBuzzer.setOnClickListener(this);
        followMe.setOnClickListener(this);
//        netWork.setOnClickListener(this);


//        netWork.setImageResource(R.drawable.locally_3);
//        netWork.setClickable(false);


        mCvCountdownViewTestHasBg = (CountdownView) findViewById(R.id.cv_countdownViewTestHasBg);
        mCvCountdownViewTestHasBg.setHandler(handler);
        mCvCountdownViewTest = (CountdownView) findViewById(R.id.cv_countdownViewTest);
        mCvCountdownViewTest.setHandler(handler);

        mMenu = (ImageView) findViewById(R.id.map_menu);
        rlTopBar = (RelativeLayout) findViewById(R.id.titles);
        mMenuList.add(new TestCheckBean(0,"GPS定位"));
        mMenuList.add(new TestCheckBean(1,"基站定位"));


        menyPopupWindow = new MenyPopupWindow(this,mMenuLayout, mMenuListView, mPopupWindowMenu, handler);
        menyPopupWindow.showPopupWidow( mMenu, getLayoutInflater(), extBtn, rlTopBar, mMenuList);


        timeView();

    }

    /**
     * 方法必须重写
     */
    @Override
    protected void onResume() {
        super.onResume();

        mapView.onResume();


//        showPopupWindow(mapView);
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


        if (timeTest != null) {
            timeTest.stopTime();
        }

        if(lwaysTrackingLine != null)
        {
            lwaysTrackingLine.setIsExt(true);
        }


//

        if (null != mLocationClient) {
            mLocationClient.onDestroy();
        }
        aMap.clear();
    }

    @SuppressWarnings("ResourceType")
    @Override
    public void onClick(View v) {

        if (checkIntent()) {
            initLocation();


            popopWindow = new WaitPopopWindow();
            String name = "";
//            popopWindow = new WaitPopopWindow();


            switch (v.getId()) {
                case R.id.alwaysSracking:


                    popopWindow.showPopopWindow(context, mapView);


                    if (trackStatus) {
                        durationtime = EBikeConstant.STOP_ALWAYS_TRACKING;
                        TrackGPSNum = -1;
                        seconds = 0;
                        trackStatus = false;
                        gpsHistory.setIsStop(true);
                    } else {
                        trackStatus = true;
                        durationtime = EBikeConstant.START_ALWAYS_TRACKING;
                        seconds = 5;
                        TrackGPSNum = 0;
                        gpsHistory.setIsStop(false);




                        if (beforeTime == null) {
                            beforeTime = timeTool.getSystemTime();
                        } else {

                                nowTime = timeTool.getSystemTime();
                                if (timeTool.getTrackingTime(beforeTime, nowTime)) {
                                    Log.d("TimeTool", "返回 true");
                                    if (gpsHistory.getHandler() != null) {
                                        Message message = new Message();
                                        message.what = EBikeConstant.EMPTY_GPS_MAP_CACHE;
                                        gpsHistory.getHandler().sendMessage(message);

                                        cacheGPS.clear();
                                        cacheMAP.clear();
                                    }
                                } else {
                                    //发送
                                    L.i("未超过限定时间");
                                }


                        }

                    }
                    startGPSTracking(durationtime, EBikeConstant.ALWAYS_TRACKING, seconds);


                    name = "alwaysSracking";

                    Log.d("MapActivity", "当前按钮状态" + trackStatus);



                    break;

                case R.id.openBuzzer:


                    popopWindow.showPopopWindow(context, mapView);
                    if (buzzerStatus) {

                        operation = EBikeConstant.CLOSE_BUZZER;

                        isOpenBuzzerStatus = false;

                    } else {

                        operation = EBikeConstant.OPEN_BUZZER;

                        isOpenBuzzerStatus = true;

                    }

                    name = "openBuzzer";
                    Log.d("MapActivity", "发送的蜂鸣器指令 :" + operation);
                    Log.d("MapActivity", "postRequestClasz.getBuzzerStatus() :" + postRequestClasz.getBuzzerStatus());
//                postRequestClasz = new PostRequestClasz(context, EBikeConstant.BUZZER, handler);
//                postRequestClasz.execute(EBikeSever.server_url + EBikeSever.open_buzzer, uid, operationType, operation, seq);
                    postHttpRequest.doPostBUZZER(EBikeSever.server_url + EBikeSever.car_buzzer,termId,token,userPhone,appSN,isOpenBuzzerStatus,EBikeConstant.BUZZER);
//                postRequestClasz = new PostRequestClasz(context,EBikeConstant.BUZZER,handler);
//                postRequestClasz.execute(context.getResources().getString(R.string.server_url)+context.getResources().getString(R.string.test_error_url),"18516236390",123123123);


                    break;

                case R.id.followMe:
                    name = "followMe";


                    aMap.clear();

                    if (followMeStatus) {


                        followMeStatus = false;

                        alwaysSracking.setClickable(true);
                        alwaysSracking.setImageResource(R.drawable.track_1);



                    } else {


                        followMeStatus = true;



//                    alwaysSracking.setClickable(false);
//                    alwaysSracking.setImageResource(R.drawable.track_2);


//                    carGPSRequest = new GetRequestClasz(handler, EBikeConstant.CAR_LOCATIOM, MapActivity.this, aMap,true);//true 代表是路径规划  不用显示车辆坐标
//                    carGPSRequest.execute(EBikeSever.server_url + EBikeSever.car_location + "?userUid=" + uid);
//                        try {
//                            popopWindow.showPopopWindow(context,mapView);
//
//                            getHttpRequest.setIsCarLocation(true);
//                            getHttpRequest.doGet(EBikeSever.server_url + EBikeSever.car_location + "?userUid=" + uid, EBikeConstant.CAR_LOCATIOM);
//                        } catch (IOException e) {
//                            e.printStackTrace();
//                        }


                        try {
                            postHttpRequest.doPostCheckCarLcation(EBikeSever.server_url + EBikeSever.car_location_url, termId,token, EBikeConstant.CAR_LOCATIOM);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }

                    }


                    break;




            }
//        Toast.makeText(this, name, Toast.LENGTH_SHORT).show();

        } else {
            Toast.makeText(context, "当前网络异常,请检查网络!", Toast.LENGTH_SHORT).show();
        }
    }

    private void doFollowMe() {
        if (carGPSBean != null) {

            LatLng gpsEndLatiLng = coordinateTransformation.transformation(new LatLng(carGPSBean.getContent().getLat(),carGPSBean.getContent().getLng()));
//            LatLng mapEndLatiLng = new LatLng(carGPSBean.getMap().getLat(), carGPSBean.getMap().getLon());

            if (gpsEndLatiLng.latitude != 0.0) {
                endLat = new LatLonPoint(gpsEndLatiLng.latitude, gpsEndLatiLng.longitude);
            } else {
                endLat = new LatLonPoint(0.0, 0.0);
            }


            if (endLat.getLongitude() != 0.0) {


                initRoutePlanning(startLat, endLat, popopWindow);


            } else {
//                        Toast.makeText(context, "车辆位置获取失败!", Toast.LENGTH_SHORT).show();
                followMeStatus = false;
                popopWindow.stopPopopWindow();
                errorPopopWindow.showPopopWindow(context, mapView);
                followMe.setImageResource(R.drawable.walk);


            }

        } else {
            followMe.setImageResource(R.drawable.walk);
            followMeStatus = false;
            waitPopopWindow.stopPopopWindow();
//                        alwaysSracking.setImageResource(R.drawable.track_1);
//                        alwaysSracking.setClickable(true);

//                    Toast.makeText(context, "车辆位置获取失败!", Toast.LENGTH_SHORT).show();
            errorPopopWindow.showPopopWindow(context, alwaysSracking);
        }
    }

    private void startGPSTracking(int num, int types, int seconds) {
//        carGPSRequest = new GetRequestClasz(handler, types, MapActivity.this, aMap,isShowCarLocation);
//        carGPSRequest.setGpsHistory(gpsHistory);
//        carGPSRequest.execute(EBikeSever.server_url + EBikeSever.car_tracking + "?uid=" + uid + "&seconds=" + seconds + "&durationtime=" + num + "&seq=" + seq);
//
//        try {
//            getHttpRequest.doGet(EBikeSever.server_url + EBikeSever.car_tracking + "?uid=" + uid + "&seconds=" + seconds + "&durationtime=" + num + "&seq=" + seq, types);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }

        postHttpRequest.doPostStartTracking(EBikeSever.server_url+EBikeSever.car_time_tracking_lcation_url, termId,token,userPhone,appSN,seconds,durationtime,types);


    }


    private void initRoutePlanning(LatLonPoint startLat, LatLonPoint endLat, WaitPopopWindow popupWindow) {
        gpsRoutePlanning = new GPSRoutePlanning(context, startLat, endLat, aMap, popupWindow);
    }


    @Override
    public void activate(OnLocationChangedListener onLocationChangedListener) {
        mListener = onLocationChangedListener;
        if (mLocationClient == null) {
            //初始化定位
            mLocationClient = new AMapLocationClient(getApplicationContext());
            //初始化定位参数
            mLocationOption = new AMapLocationClientOption();
            //设置定位回调监听
            mLocationClient.setLocationListener(this);
            //设置为高精度定位模式
            mLocationOption.setLocationMode(AMapLocationClientOption.AMapLocationMode.Hight_Accuracy);
            //设置定位参数
            mLocationClient.setLocationOption(mLocationOption);
            // 此方法为每隔固定时间会发起一次定位请求，为了减少电量消耗或网络流量消耗，
            // 注意设置合适的定位时间的间隔（最小间隔支持为2000ms），并且在合适时间调用stopLocation()方法来取消定位请求
            // 在定位结束后，在合适的生命周期调用onDestroy()方法
            // 在单次定位情况下，定位无论成功与否，都无需调用stopLocation()方法移除请求，定位sdk内部会移除
            mLocationClient.startLocation();//启动定位
        }
    }

    @Override
    public void deactivate() {
//        targetSdkVersion

    }

    @Override
    public void onLocationChanged(Location location) {


    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {

    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }

    @Override
    public void onLocationChanged(AMapLocation aMapLocation) {
        if (mListener != null && aMapLocation != null) {
            if (aMapLocation != null
                    && aMapLocation.getErrorCode() == 0) {
//                mListener.onLocationChanged(aMapLocation);// 显示系统小蓝点
//
//                LatLng update= coordinateTransformation.transformation(new LatLng(aMapLocation.getLatitude(), aMapLocation.getLongitude()));

                startLat = new LatLonPoint(aMapLocation.getLatitude(), aMapLocation.getLongitude());

            } else {
                String errText = "定位失败," + aMapLocation.getErrorCode() + ": " + aMapLocation.getErrorInfo();
                Log.e("AmapErr", errText);
//                Toast.makeText(context, "失败原因:" + errText, Toast.LENGTH_SHORT).show();
                Toast.makeText(context,"定位失败,请检查手机网络或GPS信号!",Toast.LENGTH_SHORT).show();
                if (popopWindow != null) {
                    popopWindow.stopPopopWindow();
                }
            }
        }
    }

    @Override
    public void onBusRouteSearched(BusRouteResult busRouteResult, int i) {

    }

    @Override
    public void onDriveRouteSearched(DriveRouteResult driveRouteResult, int i) {

    }

    @Override
    public void onWalkRouteSearched(WalkRouteResult walkRouteResult, int i) {


    }

    @Override
    public void onRideRouteSearched(RideRouteResult rideRouteResult, int i) {

    }


    public void checkCarStatus() {
//        postRequestClasz = new PostRequestClasz(context, EBikeConstant.CAR_STATUS, handler);
//        postRequestClasz.execute(EBikeSever.server_url + EBikeSever.car_status, seq, uid);
        try {
            postHttpRequest.doPostCheckCarStatus(EBikeSever.server_url + EBikeSever.car_status,termId,token,userPhone,appSN,EBikeConstant.CAR_STATUS);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    //计时器
    public void timeView() {
        DynamicConfig.Builder dynamicConfigBuilder = new DynamicConfig.Builder();
        if (hasBackgroundCountdownView) {
            DynamicConfig.BackgroundInfo backgroundInfo = new DynamicConfig.BackgroundInfo();
            backgroundInfo.setColor(0xFFFF5000)
                    .setSize(60f)
                    .setRadius(30f)
                    .setShowTimeBgDivisionLine(false);
            dynamicConfigBuilder.setTimeTextSize(42)
                    .setTimeTextColor(0xFFFFFFFF)
                    .setTimeTextBold(true)
                    .setSuffixTextColor(0xFF000000)
                    .setSuffixTextSize(42)
                    .setSuffixTextBold(true)
                    .setBackgroundInfo(backgroundInfo)
                    .setShowDay(false).setShowHour(true).setShowMinute(true).setShowSecond(true).setShowMillisecond(false);
        } else {
            dynamicConfigBuilder.setTimeTextSize(30)
                    .setTimeTextColor(Color.parseColor("#ff0000"))
                    .setTimeTextBold(false)
                    .setSuffixTextColor(Color.parseColor("#ff0000"))
                    .setSuffixTextSize(20)
                    .setSuffixTextBold(false)
                    .setSuffixMinute("m")
                    .setSuffixMinuteLeftMargin(0)
                    .setSuffixMinuteRightMargin(0)
                    .setSuffixSecond("s")
                    .setSuffixSecondLeftMargin(0)
                    .setSuffixGravity(DynamicConfig.SuffixGravity.BOTTOM)
                    .setShowDay(false).setShowHour(false).setShowMinute(true).setShowSecond(true).setShowMillisecond(false);
        }
        if (hasBackgroundCountdownView) {
            mCvCountdownViewTestHasBg.dynamicShow(dynamicConfigBuilder.build());
        } else {
            mCvCountdownViewTest.dynamicShow(dynamicConfigBuilder.build());
        }
    }


    public void closeMapActivity(View v) {

        if (timeTest != null) {
            timeTest.stopTime();
        }
        if(lwaysTrackingLine != null)
        {
            lwaysTrackingLine.setIsExt(true);
        }

        finish();
    }

    public void startErrorPopopWindow(String msg) {
        try {
            synchronized (context)
            {
                Thread.sleep(100);
                errorPopopWindow = new ErrorPopopWindow();
                errorPopopWindow.setMsg(msg);
                errorPopopWindow.showPopopWindow(context, alwaysSracking);
            }

        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }



    // 离线地图
    private void setMapCustomStyleFile(Context context) {
        String styleName = "style_json.json";
        FileOutputStream outputStream = null;
        InputStream inputStream = null;
        String filePath = null;
        try {
            inputStream = context.getAssets().open(styleName);
            byte[] b = new byte[inputStream.available()];
            inputStream.read(b);

            filePath = context.getFilesDir().getAbsolutePath();
            File file = new File(filePath + "/" + styleName);
            if (file.exists()) {
                file.delete();
            }
            file.createNewFile();
            outputStream = new FileOutputStream(file);
            outputStream.write(b);

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (inputStream != null)
                    inputStream.close();

                if (outputStream != null)
                    outputStream.close();

            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        aMap.setCustomMapStylePath(filePath + "/" + styleName);

        aMap.showMapText(false);

    }

}
