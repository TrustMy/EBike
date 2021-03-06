package com.phonegap.natives.activity;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
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
import com.phonegap.ebike.BaseActivity;
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
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.WeakHashMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.zip.GZIPOutputStream;

public class GPSHistoryActivity extends Activity {
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

    private String termId, token;
    private long termIdNew;
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
                                if (carLocationHistorical.getContent().getGps().size() == 0) {
                                    stopPopopuwindow();
                                    ToastUtil.showToast(context, "本次行程坐标点为0!");
                                } else {
                                    stopPopopuwindow();
                                    ToastUtil.showToast(context, "正在努力绘制路线,请稍后...");
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
                    } else {
                        L.i("gps histoey " + (String) msg.obj);
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
                    waitPopopWindow.setMsg("正在加载历史轨迹,请耐心等待!");
                    waitPopopWindow.showPopopWindow(context, extBtn);

                    stratHttp();
                    break;


                case EBikeConstant.REQUEST_TYPE://切换基站或者GPS数据轨迹
                    if (waitPopopWindow != null) {
                        waitPopopWindow.setMsg("正在加载历史轨迹,请耐心等待!");
                        waitPopopWindow.showPopopWindow(context, extBtn);
                    }

                    if (msg.arg1 == 0) {
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

                    } else {
                        mapType = 1;
                        L.i("基站 数据");
                        Toast.makeText(context, "基站接口未开通,请耐心等待!", Toast.LENGTH_SHORT).show();
//                        checkCoordinate();
                        stopPopopuwindow();
                    }

                    break;

                case 1000:
                    List<LatLng> ml = (List<LatLng>) msg.obj;
                    if (ml.size() != 0) {
                        huaLiner(new GPSHistory(aMap, context, null));
                    } else {
                        stopPopopuwindow();
                        ToastUtil.showToast(context, "坐标点为0");
                    }
                    break;

            }
        }
    };

    private void stratHttp() {
        Map<String, Object> map = new WeakHashMap<String, Object>();
        map.put("termId", termIdNew);
        map.put("startTime", startTime);
        map.put("endTime", endTime);
        postHttpRequest.toRequest(EBikeSever.server_url + EBikeSever.car_history_location_url,
                token, map, EBikeConstant.CAR_LOCATION_HISTORICAL);
//            postHttpRequest.doPostCheckCarHistoryLocation(EBikeSever.server_url+EBikeSever.
// car_history_location_url,termId,token,startTime,endTime,EBikeConstant.CAR_LOCATION_HISTORICAL);

    }


    public void checkCoordinate() {

        if (checkIntent()) {

            if (carLocationHistorical == null) {
                initLocation();
            } else if (carLocationHistorical.getContent().getGps().size() == 0) {
                ToastUtil.showToast(context, "本次行程坐标点为空");
                stopPopopuwindow();
            } else {

                guiJiJiuPian(carLocationHistorical);
            }


        } else {
            ToastUtil.showToast(context, "请检查当前网络!");
            stopPopopuwindow();
        }


    }

    public void stopPopopuwindow() {
        if (waitPopopWindow != null) {
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

        termIdNew = Long.parseLong(termId);

        token = intent.getStringExtra("token");


        L.i("H5 data : startTime:" + startTime + "|endTime:" + endTime + "|startName:" +
                startName + "|endName:" + endName + "|termId:" + termId);

        TimeTool time = new TimeTool();
        String st = startTime + "";
        String et = endTime + "";
        try {
            startTime = time.getTime(st);
            endTime = time.getTime(et);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Log.d("GPSHistoryActivity", "GPS 参数 " + uid + "|" + startTime + "|" + endTime + "|" + seq);
        initDate();

        if (seq != 0 && startTime != 0 && !termId.equals("") && !token.equals("")) {
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

//        Log.d("MapActivity", "检查手机网络 : " + netWorkeAvailable.
// isMobile(context) + "|" + netWorkeAvailable.isNetworkAvailable(context) +
// "|" + netWorkeAvailable.isWiFi(context));
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

//        getHttpRequest = new GetHttpRequest(context, handler, aMap, new GPSHistory(
// aMap, context,null));
        Toast.makeText(context, "正在获取历史行程,请稍后!", Toast.LENGTH_SHORT).show();


        handler.sendEmptyMessageDelayed(100, 300);
    }

    /**
     * 初始化AMap对象
     */
    private void init() {


        if (aMap == null) {
            aMap = mapView.getMap();

            aMap.moveCamera(CameraUpdateFactory.zoomTo(3));
        }
        historyMenu = (ImageView) findViewById(R.id.history_menu);
        extBtn = (ImageButton) findViewById(R.id.history_ext);
        rlTopBar = (RelativeLayout) findViewById(R.id.history_titles);

        mMenuList.add(new TestCheckBean(0, "GPS定位"));
        mMenuList.add(new TestCheckBean(1, "基站定位"));

        menyPopupWindow = new MenyPopupWindow(this, mMenuLayout, mMenuListView,
                mPopupWindowMenu, handler, EBikeConstant.REQUEST_TYPE);
        menyPopupWindow.showPopupWidow(historyMenu, getLayoutInflater(), extBtn, rlTopBar, mMenuList);

        updateBtn = (ImageView) findViewById(R.id.update);


        mTraceList = TraceAsset.parseLocationsData(this.getAssets(),
                "traceRecord" + File.separator + "AMapTrace.txt");


        postHttpRequest = new PostHttpRequest(context, handler, aMap, new GPSHistory(aMap, context, null));
        waitPopopWindow = new WaitPopopWindow();
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

        aMap.clear();
    }

    public void closeGPSHistoryActivity(View v) {
        finish();
    }


    public void guiJiJiuPian(final CarLocationHistorical carLocationHistorical) {
        LBSTraceClient mTraceClient = new LBSTraceClient(this.getApplicationContext());
        L.i("guiJiJiuPian  carLocationHistorical.size ():" + carLocationHistorical.getContent().getGps().size());
        if (latLngs.size() == 0) {

            new Thread(new Runnable() {
                @Override
                public void run() {
                    for (int i = carLocationHistorical.getContent().getGps().size() - 1; i >= 0; i--) {
                        if (carLocationHistorical.getContent().getGps().get(i).getLat() == 0.0 || carLocationHistorical.
                                getContent().getGps().get(i).getType() != 0) {
                            continue;
                        } else {
                            LatLng latLng = coordinateTransformation.transformation(new LatLng(carLocationHistorical.
                                    getContent().getGps().get(i).getLat(), carLocationHistorical.getContent().getGps().get(i).getLng()));
                            LatLng GPS = new LatLng(carLocationHistorical.getContent().getGps().get(i).getLat(), carLocationHistorical.
                                    getContent().getGps().get(i).getLng());
//                ml.add(new TraceLocation(GPS.latitude,GPS.longitude, 1, 1, 1));
                            latLngs.add(latLng);
                        }

                    }

                    Message message = new Message();
                    message.what = 1000;
                    message.obj = latLngs;
                    handler.sendMessage(message);
                }
            }).start();

        } else {
            Message message = new Message();
            message.what = 1000;
            message.obj = latLngs;
            handler.sendMessage(message);
        }


    }


    public void huaLiner(GPSHistory mHistory) {
        L.i("huaLiner:" + latLngs.size());
        mHistory.setLatLngs(latLngs);
        mHistory.setName(startName, endName);
        mHistory.startHistory();

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


        errorPopopWindow = new ErrorPopopWindow();
        errorPopopWindow.setMsg(msg);
        errorPopopWindow.showPopopWindow(context, mapView);


    }

    public void updateDate(View v) {
        synchronized (this) {
            aMap.clear();
            checkCoordinate();
        }
    }



}
