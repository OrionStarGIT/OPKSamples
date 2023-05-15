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
                     * 测试发送一个 "充电" 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
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
                     * 测试发送一个 "停止充电" 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
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

    public static Fragment newInstance() {
        return new com.example.myfirstapp.fragment.ChargeFragment();
    }
}
