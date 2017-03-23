package com.phonegap.natives.bean;

/**
 * Created by Trust on 2017/3/13.
 */
public class Push {


    /**
     * termId : 860337030431873
     * userPhone : 17700000004
     * token : Bearer RmACrKJ+Dcd0eQe5BzEYLobThCo+NX8dKU6NXyUVew1Z4MVCS5xe6m9ynlX2iPc+sDM+17fsumq3DcOdrNSycA==
     * pushId : 4153813734706548115
     * function : FFFFFFFFFFFFFFFF
     */

    private String termId;
    private String userPhone;
    private String token;
    private String pushId;
    private String function;

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

    public void setFunction(String function) {
        this.function = function;
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

    public String getFunction() {
        return function;
    }
}
