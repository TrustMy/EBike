package com.phonegap.natives.tool;

import android.app.Activity;
import android.content.Context;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.PopupWindow;
import android.widget.TextView;
import android.widget.Toast;


import com.phonegap.ebike.R;
import com.phonegap.natives.bean.TestCheckBean;

import java.util.List;

/**
 * Created by Trust on 2016/8/5.
 */
public class MeunPopupWindowAdapter extends BaseAdapter {
    private Activity mContext;
    private List<TestCheckBean> mList;
    private Handler handler;

    View mConvertView;

    private View view;

    private int type;

    private CheckBox cb1,cb2;
    private int num = 1;
    public void setPopupWindow(View popupWindow) {
        this.view = popupWindow;
    }

    private int tempPosition = -1;  //记录已经点击的CheckBox的位置
    public MeunPopupWindowAdapter(Activity mContext, Handler handler , int type) {
        this.mContext = mContext;
        this.type = type;
        this.handler = handler;
    }

    private boolean isFirst = true;
    public void setmList(List<TestCheckBean> mList) {
        this.mList = mList;
    }

    @Override
    public int getCount() {
        return mList!=null?mList.size():0;
    }

    @Override
    public Object getItem(int position) {
        return mList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder  holder = null;
        if(convertView == null)
        {
            convertView = LayoutInflater.from(mContext).inflate(R.layout.menu_network_item,null);

            holder = new ViewHolder();
            holder.menuCB = (CheckBox) convertView.findViewById(R.id.menu_network_cb);
            holder.menuCB.setId(position);
            holder.menuTx = (TextView) convertView.findViewById(R.id.cb_msg);
            convertView.setTag(holder);

        }else{
            holder = (ViewHolder) convertView.getTag();
        }
//        holder.menuCB.setVisibility(View.GONE);
        holder.menuTx.setText(mList.get(position).getName());
//        holder.menuCB.setText();


        cb1 = (CheckBox) view.findViewById(0);
        cb2 = (CheckBox) view.findViewById(0+1);
        holder.menuCB.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                CheckBox tempCheckBox = null;
                L.i("当前tempPosition:" + tempPosition);
//                Toast.makeText(mContext, "当前tempPosition:" + tempPosition, Toast.LENGTH_SHORT).show();
                if (isChecked) {
                    if (tempPosition != -1) {
                        //根据id找到上次点击的CheckBox,将它设置为false.
                        tempCheckBox = (CheckBox) view.findViewById(tempPosition);
                        if (tempCheckBox != null) {
                            tempCheckBox.setChecked(false);

                        }else
                        {
                            L.i("tempCheckBox == null!");
                        }
                    }

                    //保存当前选中CheckBox的id值
                    tempPosition = buttonView.getId();



                } else {    //当CheckBox被选中,又被取消时,将tempPosition重新初始化.


                    tempPosition = -1;
                }


                L.i("点击 tempPosition:"+tempPosition+"|IsChecked"+isChecked);
//

                if(isChecked && isFirst == false)
                {
                    Message message = new Message();
                    message.what = type;//更新实时追踪 基站定位 是否显示状态
                    message.arg1 = tempPosition;
                    handler.sendMessage(message);
                }
                if(isFirst)
                {
                    isFirst = false;
                }

            }
        });

        L.i("isFirst:"+isFirst);

            if (position == tempPosition)   //比较位置是否一样,一样就设置为选中,否则就设置为未选中.
                holder.menuCB.setChecked(true);
            else holder.menuCB.setChecked(false);




        if(position == 0 && isFirst == true)
        {

            holder.menuCB.setChecked(true);

        }

        return convertView;
    }

    //返回当前CheckBox选中的位置,便于获取值.
    public int getSelectPosition() {
        return tempPosition;
    }

    class ViewHolder {
        CheckBox menuCB;
        TextView menuTx;
    }



}
