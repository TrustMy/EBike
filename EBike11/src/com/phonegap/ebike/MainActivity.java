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

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.phonegap.natives.tool.ErrorPopopWindow;
import com.phonegap.natives.tool.WaitPopopWindow;
import com.phonegap.natives.tool.version.CheckVersionTask;

import org.apache.cordova.*;

import java.text.BreakIterator;

public class MainActivity extends CordovaActivity
{
    private ErrorPopopWindow popopWindow;
    private Context context = MainActivity.this;
    RelativeLayout rl;
    private String localVersion;
    private Handler handler = new Handler(){

        @Override
        public void handleMessage(Message msg) {
           switch (msg.what)
           {
               case 1:
                   checkVersions();
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
}
