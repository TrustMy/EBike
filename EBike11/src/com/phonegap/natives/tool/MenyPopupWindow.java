package com.phonegap.natives.tool;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.ColorDrawable;
import android.os.Handler;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.PopupWindow;
import android.widget.RelativeLayout;

import com.phonegap.ebike.R;
import com.phonegap.natives.bean.TestCheckBean;

import java.util.List;

/**
 * Created by Trust on 16/12/30.
 */
public class MenyPopupWindow {
    private Activity context;
    private View mMenuLayout;
    private ListView mMenuListView;
    private PopupWindow mPopupWindowMenu;
    private Handler handler;
    private MeunPopupWindowAdapter adapter;
    private int type;
    public MenyPopupWindow(Activity context,View mMenuLayout, ListView mMenuListView, PopupWindow mPopupWindowMenu,Handler handler,int type) {
        this.mMenuLayout = mMenuLayout;
        this.context = context;
        this.mMenuListView = mMenuListView;
        this.mPopupWindowMenu = mPopupWindowMenu;
        this.handler = handler;
        this.type = type;

    }

    public void showPopupWidow( final ImageView mMenu, final LayoutInflater LayoutInflater, final ImageView mTitle, final RelativeLayout rlTopBar, final List<TestCheckBean> mMenuList)
    {
        mMenu.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View v)
            {
                if(mPopupWindowMenu != null && mPopupWindowMenu.isShowing())
                {
                    mPopupWindowMenu.dismiss();
                }else
                {
                    mMenuLayout =  LayoutInflater.inflate(R.layout.item_popupwindow,null);
                    mMenuListView = (ListView) mMenuLayout.findViewById(R.id.id_popupwindow_list);
                    adapter = new MeunPopupWindowAdapter(context,handler,type);
                    mMenuListView.setAdapter(adapter);


                    L.i("mMenuList.size():"+mMenuList.size());
                    // 创建弹出窗口
                    // 窗口内容为layoutLeft，里面包含一个ListView
                    mPopupWindowMenu = new PopupWindow(mMenuLayout,340,240);
                    ColorDrawable cd = new ColorDrawable(0000);
                    mPopupWindowMenu.setBackgroundDrawable(cd);
                    mPopupWindowMenu.update();
                    mPopupWindowMenu.setInputMethodMode(PopupWindow.INPUT_METHOD_NEEDED);
                    mPopupWindowMenu.setTouchable(true); // 设置popupwindow可点击
                    mPopupWindowMenu.setOutsideTouchable(true); // 设置popupwindow外部可点击
                    mPopupWindowMenu.setFocusable(true); // 获取焦点


                    // 设置popupwindow的位置（相对tvLeft的位置）
                    int topBarHeight = mTitle.getBottom();
                    mPopupWindowMenu.showAsDropDown(rlTopBar, 1080,
                            0);

                    adapter.setPopupWindow(mPopupWindowMenu.getContentView());
                    adapter.setmList(mMenuList);
                    mMenuListView.setOnItemClickListener(onItemClickListener);




                    mPopupWindowMenu.setTouchInterceptor(new View.OnTouchListener()
                    {

                        @Override
                        public boolean onTouch(View v, MotionEvent event)
                        {
                            // 如果点击了popupwindow的外部，popupwindow也会消失
                            if (event.getAction() == MotionEvent.ACTION_OUTSIDE)
                            {
                                mPopupWindowMenu.dismiss();
                                mMenuList.clear();

                                return true;
                            }
                            return false;
                        }
                    });
                }

            }
        });
    }


    public int getItemType()
    {
        return adapter.getSelectPosition();
    }



    public AdapterView.OnItemClickListener onItemClickListener = new AdapterView.OnItemClickListener() {
        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

                    // mPopupWindowMenu.dismiss();
                    //To.putBoolean("login", false);
                    //To.commit();


                    //finish();
                    MeunPopupWindowAdapter.ViewHolder holder = (MeunPopupWindowAdapter.ViewHolder) view.getTag();
//                    holder.menuCB.toggle();
//            mMenuListView.getChildAt(position-mMenuListView.getFirstVisiblePosition()).setClickable(false);

        }
    };
}
