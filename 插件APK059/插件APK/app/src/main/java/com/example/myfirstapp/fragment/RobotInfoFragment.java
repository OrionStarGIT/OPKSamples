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
import android.util.Log;
import android.view.View;
import android.widget.Button;

import androidx.fragment.app.Fragment;

import com.ainirobot.lib.shadowopk.RobotMessengerManager;
import com.alibaba.fastjson.JSON;
import com.example.myfirstapp.MainActivity;
import com.example.myfirstapp.R;
import com.example.myfirstapp.application.MRobotMessenger;
import com.example.myfirstapp.application.RobotOSApplication;
import com.example.myfirstapp.view.MapView;

import org.json.JSONException;
import org.json.JSONObject;

public class RobotInfoFragment extends BaseFragment {
    private Button mGetRobotSnTrigger;
    private Button mSetAngleCenterRange;
    private Context mContext;

    @Override
    public View onCreateView(Context context) {
        mContext = RobotOSApplication.getInstance();
        View root = mInflater.inflate(R.layout.fragment_robot_info_layout, null, false);
        initViews(root);
        return root;
    }

    private void initViews(View root) {
        mGetRobotSnTrigger = (Button) root.findViewById(R.id.get_robot_sn);
        mSetAngleCenterRange = (Button) root.findViewById(R.id.set_angle_center_range);

        mGetRobotSnTrigger.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /**
                     * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    Log.i("关键点", "获取 robot sn");
                    JSONObject json = new JSONObject();
                    json.put("command", "getRobotSn");
                    json.put("text", "get the robot sn");
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                    MRobotMessenger.getInstance().setRobotCallback(new MRobotMessenger.RobotCallback() {
                        @Override
                        public void onResult(String result) {
                            Log.i("SHADOW_OPK", "收取callback内容getRobotSnListener: " + result);
                        }
                    });
                    //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

        mSetAngleCenterRange.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /**
                     * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    Log.i("关键点", "设置语音识别区域");
                    JSONObject json = new JSONObject();
                    json.put("command", "setVoiceRecognitionArea");
                    json.put("centerAngle", 359.0);
                    json.put("rangeAngle", 120.0);
                    json.put("text", "set angle center range");
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                    MRobotMessenger.getInstance().setRobotCallback(new MRobotMessenger.RobotCallback() {
                        @Override
                        public void onResult(String result) {
                            Log.i("SHADOW_OPK", "收取callback内容getRobotSnListener: " + result);
                        }
                    });
                    //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

    }

    private void closeCurrentApk(String result) {
            /*
             * 关闭当前APK
             * */
            RobotMessengerManager.INSTANCE.disConnectRobot((Context) mContext);
            MainActivity.getInstance().finish();
            onDestroy();
            System.exit(0);
    }

    public static Fragment newInstance() {
        return new RobotInfoFragment();
    }
}
