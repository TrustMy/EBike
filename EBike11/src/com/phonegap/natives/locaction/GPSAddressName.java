package com.phonegap.natives.locaction;

import android.content.Context;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

import com.amap.api.maps.model.LatLng;
import com.amap.api.services.core.LatLonPoint;
import com.amap.api.services.geocoder.GeocodeResult;
import com.amap.api.services.geocoder.GeocodeSearch;
import com.amap.api.services.geocoder.RegeocodeQuery;
import com.amap.api.services.geocoder.RegeocodeResult;

/**
 * Created by Trust on 2016/12/21.
 */
public class GPSAddressName {
    private GeocodeSearch geocodeSearch;
    private Context context;
    private RegeocodeQuery query;
    private LatLonPoint latLonPoint;
    private String addressName;
    private Handler handler;
    private int type;

    public GPSAddressName(Context context, LatLonPoint latLonPoint,Handler handler,int type) {
        this.context = context;
        this.latLonPoint = latLonPoint;
        this.handler = handler;
        this.type = type;
        init();
    }

    public void init ()
    {
        query = new RegeocodeQuery(latLonPoint,200,GeocodeSearch.AMAP);
        geocodeSearch = new GeocodeSearch(context);
        geocodeSearch.getFromLocationAsyn(query);
        geocodeSearch.setOnGeocodeSearchListener(onGeocodeSearchListener);

    }


    public GeocodeSearch.OnGeocodeSearchListener onGeocodeSearchListener = new GeocodeSearch.OnGeocodeSearchListener() {
        @Override
        public void onRegeocodeSearched(RegeocodeResult regeocodeResult, int i) {
            if (i == 1000) {
                if (regeocodeResult != null && regeocodeResult.getRegeocodeAddress() != null
                        && regeocodeResult.getRegeocodeAddress().getFormatAddress() != null) {
                     addressName = regeocodeResult.getRegeocodeAddress().getFormatAddress()
                            + "附近";
                    Message message = new Message();
                    message.what = type;
                    message.obj = addressName;
                    handler.sendMessage(message);
                } else {
                        //解析失败
                }
            } else {
                    //错误码
            }
        }

        @Override
        public void onGeocodeSearched(GeocodeResult geocodeResult, int i) {

        }
    };

    public String getAddressName() {
        return addressName;
    }
}
