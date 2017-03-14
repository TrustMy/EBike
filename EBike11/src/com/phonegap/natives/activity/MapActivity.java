package com.phonegap.natives.activity;

import android.app.Activity;
import android.app.ListActivity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ActivityInfo;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.location.Location;
import android.location.LocationListener;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.sax.StartElementListener;
import android.support.v7.app.AlertDialog;
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
import com.amap.api.maps.model.BitmapDescriptorFactory;
import com.amap.api.maps.model.LatLng;
import com.amap.api.maps.model.MarkerOptions;
import com.amap.api.services.core.LatLonPoint;
import com.amap.api.services.route.BusRouteResult;
import com.amap.api.services.route.DriveRouteResult;
import com.amap.api.services.route.RideRouteResult;
import com.amap.api.services.route.RouteSearch;
import com.amap.api.services.route.WalkRouteResult;
import com.phonegap.ebike.BaseActivity;
import com.phonegap.ebike.R;
import com.phonegap.natives.bean.CarGPSBean;
import com.phonegap.natives.bean.DialogBean;
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
import com.phonegap.natives.tool.DeleterInterface;
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
import com.phonegap.natives.tool.ToastUtil;
import com.phonegap.natives.tool.WaitPopopWindow;
import com.phonegap.natives.tool.dialog.DialogTool;
import com.phonegap.natives.tool.push.PushId;
import com.phonegap.natives.tool.push.PushTool;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import cn.iwgang.countdownview.CountdownView;
import cn.iwgang.countdownview.DynamicConfig;


public class MapActivity extends BaseActivity implements View.OnClickListener {
    private MapView mapView;
    private AMap aMap;
    private ImageButton alwaysSracking;
    private ImageButton openBuzzer;
    private ImageButton followMe;
    private ImageButton netWork;
    private ImageButton extBtn;
    private ImageButton carLocation;

    private Activity activity = this;

    private boolean buzzerStatus = false, trackStatus = false, followMeStatus = false, netWorkStatus = false;
    private static ImageView loading;

    private int uid, operationType, operation,  seconds, durationtime;
//    private String start  Time, endTime;


    private LatLonPoint startLat;
    private LatLonPoint endLat;


    public AMapLocationClient mLocationClient = null;
    //声明AMapLocationClientOption对象
    public AMapLocationClientOption mLocationOption = null;


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

    //定义一个过滤器；
    private IntentFilter intentFilter;

    //定义一个广播监听器；
    private Delete netChangReceiver;

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

    private String userPhone,token,termId,seq;
    private long appSN ;
    private boolean isOpenBuzzerStatus  = false;

//    public boolean isMapLiner() {
//        return isMapLiner;
//    }

    private Reminder isNoShow;



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
                        if(carGPSBean.getContent().getLat() != 0.0){

                            L.i("followMeStatus:" + followMeStatus);
                            if (followMeStatus) {
                                L.i("跟我走");
                                doFollowMe();
                            }
                        }else
                        {
                            ToastUtil.showToast(context,"车辆坐标为0.0");
                        }

                    } else {
                        stopPopupWindow();
//                        Toast.makeText(context, , Toast.LENGTH_SHORT).show();
                        startErrorPopopWindow((String) msg.obj);

                        if(followMeStatus)
                        {
                            followMeStatus = false;
                        }

                    }
                    stopPopupWindow();


                    break;

                case EBikeConstant.BUZZER:

                    if (msg.arg1 == EBikeConstant.HTTP_SUCCESS) {
                        //执行成功
                        if (buzzerStatus) {
                            openBuzzer.setImageResource(R.drawable.bell_5);
                            buzzerStatus = false;
                        } else {
                            openBuzzer.setImageResource(R.drawable.bell_3);
                            buzzerStatus = true;
                        }

                        stopPopupWindow();
                    } else {
//                        errorPopopWindow = new ErrorPopopWindow();
////                        Toast.makeText(context,(String)msg.obj, Toast.LENGTH_SHORT).show();
//                        errorPopopWindow.setMsg((String)msg.obj);
//                        errorPopopWindow.showPopopWindow(context,mapView);
                        stopPopupWindow();
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


                                if (trackStatus == true) {
                                    trackStatus = false;

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

                                    if(timeTest != null)
                                    {
                                        timeTest.stopTime();
                                    }
                                    if(isNoShow != null)
                                    {
                                        isNoShow.stopReminder();
                                    }

//                                    gpsHistory.hiddenMarker();
//
                                    //lwaysTrackingLine http request All is Close!
                                    lwaysTrackingLine.stopOkHttpClient();

                                    durationtime = EBikeConstant.STOP_ALWAYS_TRACKING;

                                    followMeStatus = false;
                                    followMe.setClickable(true);
                                    followMe.setImageResource(R.drawable.walk);

                                    carLocation.setClickable(true);
                                    carLocation.setImageResource(R.drawable.bike);


                                    openBuzzer.setClickable(true);
                                    if(buzzerStatus)
                                    {
                                        openBuzzer.setImageResource(R.drawable.bell_3);
                                    }else
                                    {
                                        openBuzzer.setImageResource(R.drawable.bell_5);
                                    }




                                } else {
                                            //开始
                                            trackStatus = true;
                                            L.i("  start success");

                                            mCvCountdownViewTest.start(TIMES);
                                            mCvCountdownViewTest.setVisibility(View.VISIBLE);


                                            alwaysSracking.setImageResource(R.drawable.track_4);


                                            followMe.setClickable(false);
                                            followMe.setImageResource(R.drawable.walk_2);

                                            carLocation.setClickable(true);
                                            carLocation.setImageResource(R.drawable.bike_2);

                                            timeTest = new TimeTest(0, context, handler);
                                            timeTest.startTime();

                                            isNoShow =  new Reminder(300,context,handler,10);
                                            isNoShow.startReminder();


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
                        stopPopupWindow();


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
//                                 new TrackPostHtttp(handler,context,aMap,termId,token,gpsHistory).execute();
                                try {
                                    lwaysTrackingLine.doGet(EBikeSever.server_url+EBikeSever.car_location_url,termId,token,EBikeConstant.ALWAYS_TRACKING_LINE);
                                } catch (IOException e) {
                                    e.printStackTrace();
                                }
                            }

                        } else {
//                        Toast.makeText(context, (String) msg.obj,Toast.LENGTH_SHORT).show();
                            ToastUtil.showToast(context,(String) msg.obj);
//                            startErrorPopopWindow((String) msg.obj);

                        }
                        stopPopupWindow();
                    } else {
                        Toast.makeText(context, "当前网络异常,请检查网络!", Toast.LENGTH_SHORT).show();
                    }
                    break;


                case EBikeConstant.ERROR:

                    synchronized (this) {
                        if (msg.obj != null) {
                            String message = (String) msg.obj;
                            Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
                            stopPopupWindow();
                            errorPopopWindow = new ErrorPopopWindow();
                            errorPopopWindow.setMsg(message);
                            errorPopopWindow.showPopopWindow(context, mapView);

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
                            if(waitPopopWindow != null)
                            {
                                waitPopopWindow.stopPopopWindow();
                            }

                        Log.i("lhh", "handleMessage: "+(String) msg.obj);


                            startErrorPopopWindow((String) msg.obj);


                    }



                    break;

                case 10:



                    Log.i("lhh", "5min success! ");
                    //关闭
                    mCvCountdownViewTest.setVisibility(View.INVISIBLE);
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
                       openBuzzer.setImageResource(R.drawable.bell_5);
                   }
                    openBuzzer.setClickable(true);

                    carLocation.setClickable(true);
                    carLocation.setImageResource(R.drawable.bike);




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
                    waitPopopWindow = new WaitPopopWindow();
                    waitPopopWindow.showPopopWindow(context, home);
//                    checkCarStatus();
                    startCarLocation();
                    break;

                case EBikeConstant.OPEN_ALWAYS_TRACKING:
                    L.i("OPEN_ALWAYS_TRACKING");
                    startCarLocation();
                    break;
                case EBikeConstant.DIALOG:
                    DialogBean dialogBean = (DialogBean) msg.obj;
                    DialogTool.showDialog(context,dialogBean.getTitle(),dialogBean.getMsg());
                    break;

            }

        }
    };



    private void stopPopupWindow() {
        if (popopWindow != null) {
            popopWindow.stopPopopWindow();
        }

        if(waitPopopWindow != null )
        {
            waitPopopWindow.stopPopopWindow();
        }
    }

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
        androidCheckVersion.checkVersion();

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
                if (checkIntent()) {
                    Toast.makeText(context, "正在定位请稍后!", Toast.LENGTH_SHORT).show();
                    initLocation();
                    handler.sendEmptyMessageDelayed(100, 300);

                } else {
                    Toast.makeText(context, "当前网络异常,请检查网络!", Toast.LENGTH_SHORT).show();
                    aMap.moveCamera(CameraUpdateFactory.zoomTo(3));
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
        //实例化过滤器；
        intentFilter = new IntentFilter();
        //添加过滤的Action值；
        intentFilter.addAction("Delete");


        //实例化广播监听器；
        netChangReceiver = new Delete();
        //将广播监听器和过滤器注册在一起；
        registerReceiver(netChangReceiver, intentFilter);

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




    //声明定位回调监听器
    public AMapLocationListener mLocationListener = new AMapLocationListener() {
        @Override
        public void onLocationChanged(AMapLocation aMapLocation) {

                if (aMapLocation != null
                        && aMapLocation.getErrorCode() == 0) {
//                mListener.onLocationChanged(aMapLocation);// 显示系统小蓝点
//
//                LatLng update= coordinateTransformation.transformation(new LatLng(aMapLocation.getLatitude(), aMapLocation.getLongitude()));

                    startLat = new LatLonPoint(aMapLocation.getLatitude(), aMapLocation.getLongitude());
                    L.i("定位成功! startLat:"+startLat.toString());
                } else {
                    String errText = "定位失败," + aMapLocation.getErrorCode() + ": " + aMapLocation.getErrorInfo();
                    Log.e("AmapErr", errText);
//                Toast.makeText(context, "失败原因:" + errText, Toast.LENGTH_SHORT).show();
                    Toast.makeText(context,"定位失败,请检查手机网络或GPS信号!",Toast.LENGTH_SHORT).show();
                    stopPopupWindow();
                }

        }
    };





    /**
     * 初始化AMap对象
     */
    private void init() {
        if (aMap == null) {
            aMap = mapView.getMap();

            // 设置定位监听

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
        carLocation = (ImageButton) findViewById(R.id.car_location);


        alwaysSracking.setOnClickListener(this);
        carLocation.setOnClickListener(this);
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


        menyPopupWindow = new MenyPopupWindow(this,mMenuLayout, mMenuListView, mPopupWindowMenu, handler,EBikeConstant.REQUEST_TYPE);
        menyPopupWindow.showPopupWidow( mMenu, getLayoutInflater(), extBtn, rlTopBar, mMenuList);


        timeView();




        //初始化定位
        mLocationClient = new AMapLocationClient(getApplicationContext());
        //设置定位回调监听
        mLocationClient.setLocationListener(mLocationListener);
        //初始化AMapLocationClientOption对象
        mLocationOption = new AMapLocationClientOption();

        //设置定位模式为AMapLocationMode.Hight_Accuracy，高精度模式。
        mLocationOption.setLocationMode(AMapLocationClientOption.AMapLocationMode.Hight_Accuracy);
        //获取一次定位结果：
        //该方法默认为false。
        mLocationOption.setOnceLocation(true);
        //获取最近3s内精度最高的一次定位结果：
        //设置setOnceLocationLatest(boolean b)接口为true，启动定位时SDK会返回最近3s内精度最高的一次定位结果。如果设置其为true，setOnceLocation(boolean b)接口也会被设置为true，反之不会，默认为false。
        mLocationOption.setOnceLocationLatest(true);

        mLocationOption.setWifiActiveScan(false);

        mLocationOption.setHttpTimeOut(20000);

        //给定位客户端对象设置定位参数
        mLocationClient.setLocationOption(mLocationOption);
        //启动定位
        mLocationClient.startLocation();



    }

    /**
     * 方法必须重写
     */
    @Override
    protected void onResume() {
        super.onResume();
        PushTool.handler = handler;
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

        unregisterReceiver(netChangReceiver);


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

                        seconds = 0;
                        trackStatus = true;
                        gpsHistory.setIsStop(true);
                    } else {
                        trackStatus = false;
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

                   appSN = System.currentTimeMillis()/1000;

                    L.i("appSN:"+appSN);
                    postHttpRequest.doPostBUZZER(EBikeSever.server_url + EBikeSever.car_buzzer,termId,token,userPhone,appSN,isOpenBuzzerStatus,EBikeConstant.BUZZER);
//                postRequestClasz = new PostRequestClasz(context,EBikeConstant.BUZZER,handler);
//                postRequestClasz.execute(context.getResources().getString(R.string.server_url)+context.getResources().getString(R.string.test_error_url),"18516236390",123123123);


                    break;

                case R.id.followMe:
                    name = "followMe";

                    //给定位客户端对象设置定位参数
                    mLocationClient.setLocationOption(mLocationOption);
                    //启动定位
                    mLocationClient.startLocation();

                    aMap.clear();

                    popopWindow.showPopopWindow(context, mapView);
                        followMeStatus = true;
                        try {
                            postHttpRequest.doPostCheckCarLcation(EBikeSever.server_url + EBikeSever.car_location_url, termId,token, EBikeConstant.CAR_LOCATIOM);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }




                    break;

                case R.id.car_location:
                    followMeStatus = false;
                    popopWindow.showPopopWindow(context, mapView);
                    startCarLocation();

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
                amapClear();
                popopWindow.stopPopopWindow();

                if(carGPSBean.getContent().getType() == 1)
                {
                    AlertDialog.Builder builder = new AlertDialog.Builder(context);
                    builder.setTitle("当前数据为基站数据,可能与实际位置有所偏差是否继续?");
                    builder.setNegativeButton("取消", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            ToastUtil.showToast(context,"已取消!");
                        }
                    });
                    builder.setPositiveButton("继续", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            initRoutePlanning(startLat, endLat, popopWindow);
                        }
                    });
                    AlertDialog dialog = builder.create();
                    dialog.show();
                }else
                {
                    initRoutePlanning(startLat, endLat, popopWindow);
                }



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

    private void startGPSTracking(int duration, int types, int seconds) {

        postHttpRequest.doPostStartTracking(EBikeSever.server_url+EBikeSever.car_time_tracking_lcation_url, termId,token,userPhone,appSN,seconds,duration,types);


    }


    private void initRoutePlanning(LatLonPoint startLat, LatLonPoint endLat, WaitPopopWindow popupWindow) {

        gpsRoutePlanning = new GPSRoutePlanning(context, startLat, endLat, aMap, popupWindow);
    }









    public void checkCarStatus() {
//        postRequestClasz = new PostRequestClasz(context, EBikeConstant.CAR_STATUS, handler);
//        postRequestClasz.execute(EBikeSever.server_url + EBikeSever.car_status, seq, uid);
        try {
            postHttpRequest.doPostCheckCarStatus(EBikeSever.server_url + EBikeSever.car_status,termId,token,userPhone,appSN,EBikeConstant.CAR_STATUS);

        } catch (IOException e) {
            L.i("error:"+e.toString());
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

    public synchronized void startErrorPopopWindow(String msg) {
            synchronized (context)
            {
                if(errorPopopWindow == null)
                {
                    errorPopopWindow = new ErrorPopopWindow();
                }
                errorPopopWindow.setMsg(msg);
                errorPopopWindow.showPopopWindow(context, alwaysSracking);
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


    public void startCarLocation()
    {
        try {
            postHttpRequest.doPostCheckCarLcation(EBikeSever.server_url + EBikeSever.car_location_url, termId,token, EBikeConstant.CAR_LOCATIOM);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void amapClear()
    {
        if(aMap != null)
        {
            aMap.clear();
        }
    }



    public class  Delete extends BroadcastReceiver
    {

        @Override
        public void onReceive(Context context, Intent intent) {
            finish();
        }
    }
}
