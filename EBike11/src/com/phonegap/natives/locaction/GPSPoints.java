package com.phonegap.natives.locaction;


import android.content.Context;
import android.graphics.BitmapFactory;
import android.util.Log;


import com.amap.api.maps.AMap;
import com.amap.api.maps.CoordinateConverter;
import com.amap.api.maps.model.BitmapDescriptorFactory;
import com.amap.api.maps.model.LatLng;
import com.amap.api.maps.model.MarkerOptions;
import com.phonegap.ebike.R;

/**
 * Created by Trust on 2016/12/18.
 */
public class GPSPoints {
    MarkerOptions markerOption;
    private Context context;
    private AMap aMap;
    private LatLng latLng;
    private String name ;
    private int img;

    public GPSPoints(Context context , AMap aMap,LatLng latLng ,String name ,int img) {
        this.context = context;
        this.aMap = aMap;
        this.img = img;
        this.latLng = latLng;
        this.name = name;
        init();
    }

    private void init() {


        CoordinateConverter converter  = new CoordinateConverter(context);
// CoordType.GPS 待转换坐标类型
        converter.from(CoordinateConverter.CoordType.GOOGLE);
// sourceLatLng待转换坐标点 LatLng类型
        converter.coord(latLng);


// 执行转换操作
        LatLng desLatLng = converter.convert();
        Log.d("GPSPoints", "转换之后的坐标  json " + latLng.latitude + "|" + latLng.longitude);
        Log.d("GPSPoints", "转换之后的坐标  json " + desLatLng.latitude + "|" + desLatLng.longitude);

//
        markerOption = new MarkerOptions();
        markerOption.position(desLatLng);
        markerOption.title(name).snippet("描述:");

        markerOption.draggable(true);
        markerOption.icon(

                BitmapDescriptorFactory.fromBitmap(BitmapFactory
                        .decodeResource(context.getResources(),
                                img)));
        // 将Marker设置为贴地显示，可以双指下拉看效果
        markerOption.setGps(true);
        aMap.addMarker(markerOption);



    }
}
