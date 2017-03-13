/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.phonegap.ebike;

import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AlertDialog;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.baidu.android.pushservice.PushConstants;
import com.baidu.android.pushservice.PushManager;
import com.phonegap.natives.bean.DialogBean;
import com.phonegap.natives.tool.EBikeConstant;
import com.phonegap.natives.tool.ErrorPopopWindow;
import com.phonegap.natives.tool.WaitPopopWindow;
import com.phonegap.natives.tool.dialog.DialogTool;
import com.phonegap.natives.tool.push.PushTool;
import com.phonegap.natives.tool.push.Utils;
import com.phonegap.natives.tool.version.CheckVersionTask;

import org.apache.cordova.*;

import java.text.BreakIterator;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends CordovaActivity
{
    private ErrorPopopWindow popopWindow;
    private Context context = MainActivity.this;
    RelativeLayout rl;
    private String localVersion;
    public  static List<Activity> activityList = new ArrayList<Activity>();

    public Handler handler = new Handler(){

        @Override
        public void handleMessage(Message msg) {
           switch (msg.what)
           {
               case 1:
                   checkVersions();

               break;

               case EBikeConstant.DIALOG:
                   DialogBean dialogBean = (DialogBean) msg.obj;
                   DialogTool.showDialog(context,dialogBean.getTitle(),dialogBean.getMsg());
                   break;

           }

        }
    };
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);

        rl = new RelativeLayout(this);
        //设置RelativeLayout布局的宽高
        RelativeLayout.LayoutParams relLayoutParams=new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT, RelativeLayout.LayoutParams.WRAP_CONTENT);
        TextView temp = new TextView(this);
        temp .setId(0);
        rl.addView(temp);
        this.addContentView(rl,relLayoutParams);


        popopWindow = new ErrorPopopWindow();
        handler.sendEmptyMessageDelayed(1, 2000);

              PushManager.startWork(getApplicationContext(), PushConstants.LOGIN_TYPE_API_KEY,
                Utils.getMetaValue(MainActivity.this, "api_key"));

        activityList.add(MainActivity.this);
        PushTool.handler = handler;
    }



    private void checkVersions()
    {

        try {
            localVersion = getVersionName();

//            CheckVersionTask cv = new CheckVersionTask();
           CheckVersionTask cv = new CheckVersionTask(MainActivity.this,localVersion);

            new Thread(cv).start();

        } catch (Exception e) {
            e.printStackTrace();
        }

    }



    private String getVersionName() throws Exception
    {

        //getPackageName()是你当前类的包名，0代表是获取版本信息

        PackageManager packageManager = getPackageManager();

        PackageInfo packInfo = packageManager.getPackageInfo(getPackageName(),

                0);
        return packInfo.versionName;

    }

    @Override
    protected void onResume() {
        PushTool.handler = handler;
        super.onResume();
    }
}
