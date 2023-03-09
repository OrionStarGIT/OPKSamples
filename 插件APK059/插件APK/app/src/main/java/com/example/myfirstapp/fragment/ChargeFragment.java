/*
 *  Copyright (C) 2017 OrionStar Technology Project
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package com.example.myfirstapp.fragment;

import android.content.Context;
import android.os.RemoteException;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import androidx.fragment.app.Fragment;

//import com.ainirobot.coreservice.client.Definition;
//import com.ainirobot.coreservice.client.RobotApi;
//import com.ainirobot.coreservice.client.listener.ActionListener;
//import com.ainirobot.coreservice.client.listener.CommandListener;
import com.ainirobot.lib.shadowopk.RobotMessengerManager;
import com.example.myfirstapp.LogTools;
import com.example.myfirstapp.R;

import org.json.JSONException;
import org.json.JSONObject;

public class ChargeFragment extends BaseFragment {

    private Button mStop_auto_charge;
    private Button mStart_auto_charge;

    private boolean autoChangeStatus;

    @Override
    public View onCreateView(Context context) {
        View root = mInflater.inflate(R.layout.fragment_charge_layout, null, false);
        initViews(root);
        return root;
    }

    private void initViews(View root) {
        autoChangeStatus = true;
        mStop_auto_charge = (Button) root.findViewById(R.id.stop_auto_charge);
        mStart_auto_charge = (Button) root.findViewById(R.id.start_auto_charge);

        mStart_auto_charge.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /**
                     * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    Log.i("关键点", "充电按钮点击事件");
                    JSONObject json = new JSONObject();
                    json.put("command", "startCharge");
                    json.put("text", "start charge");
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                    //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

        mStop_auto_charge.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /**
                     * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    Log.i("关键点", "停止充电按钮点击事件");
                    JSONObject json = new JSONObject();
                    json.put("command", "stopCharge");
                    json.put("text", "stop charge");
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                    //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

    }

    /**
     * 停止充电并脱离充电桩
     */
    /*private void stopChargingByApp() {
        LogTools.info("停止充电并脱离充电桩");
        //RobotApi.getInstance().stopChargingByApp();
        RobotApi.getInstance().leaveChargingPile(0,0.5f,0.5f,new CommandListener() {
            @Override
            public void onResult(int result, String message) {
                LogTools.info("result: " + result + " message: "+ message);
            }
        });
    }*/

/*    private ActionListener mActionListener = new ActionListener() {

        @Override
        public void onResult(int status, String responseString) throws RemoteException {
            switch (status) {
                case Definition.RESULT_OK:
                    LogTools.info("onResult result: " + status +"(充电成功)"+ " message: "+  responseString);
                    break;

                case Definition.RESULT_FAILURE:
                    LogTools.info("onResult result: " + status +"(充电失败)"+ " message: "+  responseString);
                    break;
                default:
                    break;
            }
        }

        @Override
        public void onStatusUpdate(int status, String data) throws RemoteException {
            switch (status) {
                case Definition.STATUS_NAVI_GLOBAL_PATH_FAILED:
                    LogTools.info("onStatusUpdate result: " + status +"(全局路径规划失败)"+ " message: "+  data);
                    break;

                case Definition.STATUS_NAVI_OUT_MAP:
                    LogTools.info("onStatusUpdate result: " + status +"(目标点不能到达，引领目的地在地图外，有可能为地图与位置点不匹配，请重新设置位置点)"+ " message: "+  data);
                    break;

                case Definition.STATUS_NAVI_AVOID:
                    LogTools.info("onStatusUpdate result: " + status +"(前往回充点路线已被障碍物堵死)"+ " message: "+  data);
                    break;

                case Definition.STATUS_NAVI_AVOID_END:
                    LogTools.info("onStatusUpdate result: " + status +"(障碍物已移除)"+ " message: "+  data);
                    break;
                default:
                    break;
            }
        }

        @Override
        public void onError(int errorCode, String errorString, String extraData) throws RemoteException {
            super.onError(errorCode, errorString, extraData);
            LogTools.info("onError result: " + errorCode +"(充电回充失败)"+ " message: "+  errorString);
        }
    };*/

    public static Fragment newInstance() {
        return new com.example.myfirstapp.fragment.ChargeFragment();
    }
}
