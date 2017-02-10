package com.phonegap.natives.broadcase;

import com.phonegap.natives.activity.MapActivity;

/**
 * Created by Trust on 2016/12/20.
 */
public class IntentTool {
    String msg;
    boolean status;
    private MapActivity mapActivity;

    public IntentTool(MapActivity mapActivity) {
        this.mapActivity = mapActivity;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }


}
