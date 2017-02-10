package com.phonegap.natives.bean;

/**
 * Created by Trust on 2016/12/23.
 */
public class GPSHistoryActivityBean {


    /**
     * termId : 4310000
     * token : 12456465asd4as54d56
     * startTime : 10000000
     * endTime : 1000000
     * seq : 123456
     * startName : asdasdasd
     * endName : dasdasdasd
     */

    private String termId;
    private String token;
    private long startTime;
    private long endTime;
    private int seq;
    private String startName;
    private String endName;

    public void setTermId(String termId) {
        this.termId = termId;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setStartTime(int startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(int endTime) {
        this.endTime = endTime;
    }

    public void setSeq(int seq) {
        this.seq = seq;
    }

    public void setStartName(String startName) {
        this.startName = startName;
    }

    public void setEndName(String endName) {
        this.endName = endName;
    }

    public String getTermId() {
        return termId;
    }

    public String getToken() {
        return token;
    }

    public long getStartTime() {
        return startTime;
    }

    public long getEndTime() {
        return endTime;
    }

    public int getSeq() {
        return seq;
    }

    public String getStartName() {
        return startName;
    }

    public String getEndName() {
        return endName;
    }
}
