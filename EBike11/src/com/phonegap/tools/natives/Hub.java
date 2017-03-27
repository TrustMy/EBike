package com.phonegap.tools.natives;

import android.content.Intent;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;

import com.amap.api.maps.AMap;
import com.google.gson.Gson;
import com.phonegap.natives.activity.GPSHistoryActivity;
import com.phonegap.natives.activity.MapActivity;
import com.phonegap.natives.bean.GPSHistoryActivityBean;
import com.phonegap.natives.bean.MapActivityBean;
import com.phonegap.natives.bean.Push;
import com.phonegap.natives.bean.PushIdBean;
import com.phonegap.natives.httptool.PostHttpRequest;

import com.phonegap.natives.tool.DeleterInterface;
import com.phonegap.natives.tool.EBikeConstant;
import com.phonegap.natives.tool.EBikeSever;
import com.phonegap.natives.tool.EbFunction;
import com.phonegap.natives.tool.L;
import com.phonegap.natives.tool.NetWorkeAvailable;
import com.phonegap.natives.tool.ToastUtil;
import com.phonegap.natives.tool.push.PushId;

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
    private String function;
    Push push;
    NetWorkeAvailable netWorkeAvailable;
    int num = 1;
    private Handler handler = new Handler()
    {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what)
            {
                case EBikeConstant.PUSH_ID:
                    if(msg.arg1 == EBikeConstant.HTTP_SUCCESS)
                    {
                        L.i("PUSH_ID success");
                    }else
                    {
                        L.i("PUSH_ID error!");
                        num++;
                        if(num < 4)
                        {
                            toPush();

                        }else
                        {
                            L.i("PUSH_ID error! num  == "+num);
                        }
                    }
                    break;
            }
        }
    };

    private PostHttpRequest postHttpRequest ;
    public Hub() {
    }

    /**
     * @param action          js中传递的第四个参数
     * @param args            js中传递的第五个参数
     * @param callbackContext
     */
    public boolean execute(String action, final JSONArray args,
                           final CallbackContext callbackContext) throws JSONException {

        postHttpRequest = new PostHttpRequest(cordova.getActivity(),handler, null,null);
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



        }else if(action.equals("Delete"))
        {
            Intent intent = new Intent();
            intent.setAction("Delete");
            cordova.getActivity().sendBroadcast(intent);

            L.i("Delete  Activity");
        }else if(action.equals("Push"))
        {

            netWorkeAvailable = new NetWorkeAvailable();
            gson = new Gson();
            String token ;
            String msg =  toStringJson(args);
            push = gson.fromJson(msg,Push.class);

            checkFunction(push.getFunction());
            L.i("Push:"+msg);
            if(PushId.ID != null)
            {
                if(!PushId.ID .equals(push.getPushId()))
                {
                    toPush();
                    L.i("pushId different");
                }else
                {
                    L.i("pushId same");
                }
            }else
            {
               Toast.makeText(cordova.getActivity(), "报警通知初始化失败,请检查网络并重新登录!", Toast.LENGTH_SHORT).show();
            }

        }
        // 执行js传过来的success方法
        callbackContext.success();
        return true;
    }

    private void checkFunction(String function) {


        EbFunction.Function_Car_Open = Character.
                getNumericValue(function.charAt(function.length()-5));
        EbFunction.Function_Car_Close =  Character.
                getNumericValue(function.charAt(function.length()-6));
        EbFunction.Function_Tracking =  Character.
                getNumericValue(function.charAt(function.length()-7));

        L.i("Function_Car_Open:"+ EbFunction.
                Function_Car_Open+"Function_Car_Close:"+EbFunction.
                Function_Car_Close+"Function_Tracking:"+EbFunction.Function_Tracking);

    }

    private void toPush() {
        if(push != null)
        {
            if(checkIntent())
            {
                postHttpRequest.doPushId(EBikeSever.server_url+EBikeSever.server_push_url,push.getToken(), push.getUserPhone(),PushId.ID,3, EBikeConstant.PUSH_ID);

            }else
            {
                Toast.makeText(cordova.getActivity(), "网络链接异常,请检查网络!", Toast.LENGTH_SHORT).show();
            }

        }else
        {
            L.i("toPush ==  null");
        }
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


    private boolean checkIntent() {
        netWorkeAvailable = new NetWorkeAvailable();
//        netWorkeAvailable.isMobile(context);

//        netWorkeAvailable.isWiFi(context);

//        Log.d("MapActivity", "检查手机网络 : " + netWorkeAvailable.isMobile(context) + "|" + netWorkeAvailable.isNetworkAvailable(context) + "|" + netWorkeAvailable.isWiFi(context));
        return netWorkeAvailable.isNetworkAvailable(cordova.getActivity());
    }

    /*
    public static String hexString2binaryString(String hexString)
    {
        if (hexString == null || hexString.length() % 2 != 0)
            return null;
        String bString = "", tmp;
        for (int i = 0; i < hexString.length(); i++)
        {
            tmp = "0000"
                    + Integer.toBinaryString(Integer.parseInt(hexString
                    .substring(i, i + 1), 16));
            bString += tmp.substring(tmp.length() - 4);
        }
        return bString;
    }
    */


}