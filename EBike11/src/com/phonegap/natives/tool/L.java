package com.phonegap.natives.tool;

import android.util.Log;

/**
 * Created by Trust on 17/1/3.
 */
public class L {


    private static boolean debug = true;
    private static String TAG = "lhh_Debug";

    public static  void i(String msg)
    {
        if(debug)
        {
            Log.i(TAG,msg);
        }
    }
}
