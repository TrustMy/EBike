package com.phonegap.natives.locaction;


import android.content.Context;
import android.util.Log;

import com.amap.api.maps.AMap;

import com.amap.api.services.core.LatLonPoint;
import com.amap.api.services.route.BusRouteResult;
import com.amap.api.services.route.DriveRouteResult;
import com.amap.api.services.route.RideRouteResult;
import com.amap.api.services.route.RouteSearch;
import com.amap.api.services.route.WalkPath;
import com.amap.api.services.route.WalkRouteResult;
import com.phonegap.natives.gpstool.WalkRouteOverlay;
import com.phonegap.natives.tool.WaitPopopWindow;


/**
 * Created by Trust on 2016/12/17.
 */
public class GPSRoutePlanning  implements RouteSearch.OnRouteSearchListener{

    private RouteSearch routeSearch;
    private Context context;
    private RouteSearch.FromAndTo fromAndTol;
    private LatLonPoint startLat;
    private LatLonPoint endLat;
    private AMap aMap;
    private WaitPopopWindow popupWindow;



//    private AMapNavi mAMapNavi;


    public GPSRoutePlanning(Context context,LatLonPoint start,LatLonPoint end,AMap aMap,WaitPopopWindow popupWindow) {
        this.context = context;
        this.startLat = start;
        this.endLat = end;
        this.aMap = aMap;
        this.popupWindow = popupWindow;
        fromAndTol = new RouteSearch.FromAndTo(this.startLat,this.endLat);
        init();
    }

    private void init() {
        routeSearch = new RouteSearch(context);
        routeSearch.setRouteSearchListener(this);

        RouteSearch.WalkRouteQuery query = new RouteSearch.WalkRouteQuery(fromAndTol, 1);
        routeSearch.calculateWalkRouteAsyn(query);//开始算路



//        //获取AMapNavi实例
//        mAMapNavi = AMapNavi.getInstance(context);
//        //添加监听回调，用于处理算路成功
//        mAMapNavi.addAMapNaviListener(this);


    }


    @Override
    public void onBusRouteSearched(BusRouteResult busRouteResult, int i) {

    }

    @Override
    public void onDriveRouteSearched(DriveRouteResult driveRouteResult, int i) {

    }

    @Override
    public void onWalkRouteSearched(WalkRouteResult walkRouteResult, int i) {

        Log.d("GPSRoutePlanning", "路径规划的结果 :"+i+"ss :"+walkRouteResult.toString());
        WalkPath walkPath = walkRouteResult.getPaths().get(0);

        Log.d("GPSRoutePlanning", " Show WalkPath :" + walkPath);
        WalkRouteOverlay walkRouteOverlay = new WalkRouteOverlay(context,
                aMap, walkPath, walkRouteResult.getStartPos(),
                walkRouteResult.getTargetPos());
        walkRouteOverlay.removeFromMap();
        walkRouteOverlay.addToMap();
        walkRouteOverlay.zoomToSpan();


        if(popupWindow != null)
        {
            popupWindow.stopPopopWindow();
        }









    }

    @Override
    public void onRideRouteSearched(RideRouteResult rideRouteResult, int i) {

    }

    public void setFromAndTo(LatLonPoint start , LatLonPoint end){
        this.startLat = start;
        this.endLat = end;
    }


}
