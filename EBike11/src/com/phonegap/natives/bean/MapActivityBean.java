package com.phonegap.natives.bean;

/**
 * Created by Trust on 2016/12/23.
 */
public class MapActivityBean {

    /**
     * termId : 350000000000001
     * seq : 682787
     * userPhone : 18301976261
     * token : Bearer qJctAZ5orWv0dN4HyOgxifzvwp0ZACflmrxRJzkvJtHPQR6Rbz/bc4AAQSay8VBJfv5lnBOpz/M/1b5c2wNdyQ==
     */

    private String termId;
    private String seq;
    private String userPhone;
    private String token;

    public void setTermId(String termId) {
        this.termId = termId;
    }

    public void setSeq(String seq) {
        this.seq = seq;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTermId() {
        return termId;
    }

    public String getSeq() {
        return seq;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public String getToken() {
        return token;
    }
}
