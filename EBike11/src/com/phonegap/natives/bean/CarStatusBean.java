package com.phonegap.natives.bean;

/**
 * Created by Trust on 2016/12/19.
 */
public class CarStatusBean {


    /**
     * status : true
     * content : {"buzzerStatus":0,"cmdType":33,"lockStatus":1}
     */

    private boolean status;
    private ContentBean content;

    public void setStatus(boolean status) {
        this.status = status;
    }

    public void setContent(ContentBean content) {
        this.content = content;
    }

    public boolean getStatus() {
        return status;
    }

    public ContentBean getContent() {
        return content;
    }

    public static class ContentBean {
        /**
         * buzzerStatus : 0
         * cmdType : 33
         * lockStatus : 1
         */

        private int buzzerStatus;
        private int cmdType;
        private int lockStatus;

        public void setBuzzerStatus(int buzzerStatus) {
            this.buzzerStatus = buzzerStatus;
        }

        public void setCmdType(int cmdType) {
            this.cmdType = cmdType;
        }

        public void setLockStatus(int lockStatus) {
            this.lockStatus = lockStatus;
        }

        public int getBuzzerStatus() {
            return buzzerStatus;
        }

        public int getCmdType() {
            return cmdType;
        }

        public int getLockStatus() {
            return lockStatus;
        }
    }
}
