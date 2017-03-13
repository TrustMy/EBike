package com.phonegap.natives.bean;

/**
 * Created by Trust on 2017/3/13.
 */
public class Push {


    /**
     * termId : 860337030343524
     * userPhone : 13296669048
     * token : Bearer k9tKrdfSW7fmpYSPbjw7lobThCo+NX8dKU6NXyUVew1lcwby4Z4U/6R5GljEVtHxzkHDt4dxVKGXxkKGrJ1ypw==
     * pushId : 4524144079028499864
     */

    private String termId;
    private String userPhone;
    private String token;
    private String pushId;

    public void setTermId(String termId) {
        this.termId = termId;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setPushId(String pushId) {
        this.pushId = pushId;
    }

    public String getTermId() {
        return termId;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public String getToken() {
        return token;
    }

    public String getPushId() {
        return pushId;
    }
}
