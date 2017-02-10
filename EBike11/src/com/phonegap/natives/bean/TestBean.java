package com.phonegap.natives.bean;

/**
 * Created by Trust on 17/1/5.
 */
public class TestBean {

    /**
     * systime : 2016-08-03 16:21:49
     * lon : 116.47676009385665
     * loctime : 1470212510269
     * address :
     * speed : 10.471948623657227
     * bearing : 44.10205841064453
     * provider : gps
     * accuracy : 350
     * lat : 39.995825200614696
     */

    private String systime;
    private double lon;
    private long loctime;
    private String address;
    private double speed;
    private double bearing;
    private String provider;
    private int accuracy;
    private double lat;

    public void setSystime(String systime) {
        this.systime = systime;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    public void setLoctime(long loctime) {
        this.loctime = loctime;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setSpeed(double speed) {
        this.speed = speed;
    }

    public void setBearing(double bearing) {
        this.bearing = bearing;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public void setAccuracy(int accuracy) {
        this.accuracy = accuracy;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public String getSystime() {
        return systime;
    }

    public double getLon() {
        return lon;
    }

    public long getLoctime() {
        return loctime;
    }

    public String getAddress() {
        return address;
    }

    public double getSpeed() {
        return speed;
    }

    public double getBearing() {
        return bearing;
    }

    public String getProvider() {
        return provider;
    }

    public int getAccuracy() {
        return accuracy;
    }

    public double getLat() {
        return lat;
    }
}
