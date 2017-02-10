package com.phonegap.natives.bean;

/**
 * Created by Trust on 2016/12/20.
 */
public class Error {

    /**
     * status : false
     * err : 设备不在线
     * totleAlarm : 22
     */

    private boolean status;
    private String err;
    private int totleAlarm;

    public void setStatus(boolean status) {
        this.status = status;
    }

    public void setErr(String err) {
        this.err = err;
    }

    public void setTotleAlarm(int totleAlarm) {
        this.totleAlarm = totleAlarm;
    }

    public boolean getStatus() {
        return status;
    }

    public String getErr() {
        return err;
    }

    public int getTotleAlarm() {
        return totleAlarm;
    }
}
