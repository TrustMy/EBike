package com.phonegap.natives.tool;

/**
 * Created by Trust on 16/12/26.
 */
public class EBikeSever {



    public static final String server_url_old = "http://180.168.194.98:7888/EBWebServer-0.0.1";
    public static final String car_location_old = "/rest/gps/latest/";
    public static final String open_buzzer_old = "/rest/Vehicles/operation";
    public static final String car_status_old = "/rest/Vehicles/state";
    public static final String car_tracking_old = "/rest/gps/tracking/";
    public static final String car_location_historical_old = "/rest/gps/period/";
    public static final String test_error_url_old = "/rest/user/oauth/";



    public static final String server_url = "https://180.168.194.98:8443/EBWebServer-2.0/";

    public static final String car_location_url = "rest/gps/latest/";

    public static final String car_history_location_url = "rest/gps/period/"; //获取车辆历史轨迹

    public static final String car_alarm_paging_url = "rest/alarms/";//分页获取车辆报警列表

    public static final String car_alarm_time_url = "rest/alarms/period/";//根据时间段分页获取车辆报警列表

    public static final String car_history_location_paging_url = "rest/trips/";//分页获取行程列表

    public static final String car_time_tracking_lcation_url = "rest/cmd/track/";//实时追踪

    public static final String login_url = "rest/user/login/";//登录

    public static final String register_url = "register/";//注册

    public static final String car_status = "rest/cmd/queryStatus/";//car status

    public static final String car_lock = "rest/cmd/lock/";//lock

    public static final String server_push_url = "rest/user/registerPushId/";// pushId

    public static final String car_buzzer = "rest/cmd/buzzer/";

    public static final String update_server = "http://139.196.229.233/ebike/update/ebikeUpdate.xml";//更新APP




}
