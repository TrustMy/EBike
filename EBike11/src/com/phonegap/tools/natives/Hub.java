package com.phonegap.tools.natives;

import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.google.gson.Gson;
import com.phonegap.natives.activity.GPSHistoryActivity;
import com.phonegap.natives.activity.MapActivity;
import com.phonegap.natives.bean.GPSHistoryActivityBean;
import com.phonegap.natives.bean.MapActivityBean;
import com.phonegap.natives.tool.L;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

public class Hub extends CordovaPlugin {
    CallbackContext callbackContext;
    private PluginResult result = null;
    private Gson gson ;
    private MapActivityBean mapActivityBean;
    private GPSHistoryActivityBean gpsHistoryActivityBean;

    public Hub() {
    }

    /**
     * @param action          js中传递的第四个参数
     * @param args            js中传递的第五个参数
     * @param callbackContext
     */
    public boolean execute(String action, final JSONArray args,
                           final CallbackContext callbackContext) throws JSONException {


        if (action.equals("MapActivity")) {
//            cordova.getThreadPool().execute(new Runnable() {
//                @Override
//                public void run() {
//                    Vibrator vibrator = (Vibrator) Hub.this.cordova
//                            .getActivity().getSystemService(
//                                    Context.VIBRATOR_SERVICE);
//                    vibrator.vibrate(500);
////                    String name = "Trust";
////                    args.put(name);
////                    callbackContext.success("congratulation,success");
////                    Log.d("Hub", "true1111111111111");
//
//
//
//                }
//            });
               gson  = new Gson();

               String msg =  toStringJson(args);
            L.i(msg);
            mapActivityBean = gson.fromJson(msg,MapActivityBean.class);
            Intent intent = new Intent(cordova.getActivity(), MapActivity.class);
            intent.putExtra("termId",mapActivityBean.getTermId());
            intent.putExtra("token",mapActivityBean.getToken());
            intent.putExtra("userPhone",mapActivityBean.getUserPhone());
            intent.putExtra("seq",mapActivityBean.getSeq());
//            Log.d("Hub", "uid :"+mapActivityBean.getUid()+"seq"+mapActivityBean.getUid());
            cordova.getActivity().startActivity(intent);
        } else if(action.equals("GPSHistoryActivity")){
            Log.d("Hub", "falese2222222222222"+action);

//            String name = "Trust";
//
//
//            callbackContext.success(args);
            gson  = new Gson();

            String msg =  toStringJson(args);
            gpsHistoryActivityBean = gson.fromJson(msg,GPSHistoryActivityBean.class);
            if(gpsHistoryActivityBean != null )
            {
                Intent intent = new Intent(cordova.getActivity(), MapActivity.class);
                intent.putExtra("seq",gpsHistoryActivityBean.getSeq());
                intent.putExtra("startTime",gpsHistoryActivityBean.getStartTime());
                intent.putExtra("endTime",gpsHistoryActivityBean.getEndTime());
                intent.putExtra("startName",gpsHistoryActivityBean.getStartName());
                intent.putExtra("endName",gpsHistoryActivityBean.getEndName());
                intent.putExtra("termId",gpsHistoryActivityBean.getTermId());
                intent.putExtra("token",gpsHistoryActivityBean.getToken());
                intent.setClass(cordova.getActivity(), GPSHistoryActivity.class);
                cordova.getActivity().startActivity(intent);
            }else
            {
                Toast.makeText(cordova.getActivity(),"js传过来的参数有误",Toast.LENGTH_SHORT).show();
            }



        }
        // 执行js传过来的success方法
        callbackContext.success();
        return true;
    }


    public String toStringJson (JSONArray json)
    {

        String m = String.valueOf(json);
        String msg = "";
        for(int i = 0 ; i< m.length();i++)

        {
            if(i == 0 || i == (m.length()-1))
            {
                continue;
            }else
            {
                msg+=m.charAt(i);
            }
        }
        return  msg;
    }

    @Override
    public boolean execute(String action, String rawArgs, CallbackContext callbackContext) throws JSONException {
        return super.execute(action, rawArgs, callbackContext);
    }
}