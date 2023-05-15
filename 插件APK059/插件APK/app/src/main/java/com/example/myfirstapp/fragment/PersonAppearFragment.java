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
import android.view.View;
import android.widget.Button;

import androidx.fragment.app.Fragment;

import com.ainirobot.lib.shadowopk.RobotMessengerManager;
import com.example.myfirstapp.R;
import com.example.myfirstapp.view.ResultView;

import org.json.JSONException;
import org.json.JSONObject;

public class PersonAppearFragment extends BaseFragment {
    private static String TRACE_FACE = "personAppear";
    private static String STOP_TRACE_FACE = "stopPersonAppear";

    @Override
    public View onCreateView(Context context) {
        View root = mInflater.inflate(R.layout.fragment_person_appear_layout,null,false);
        initViews(root);
        return root;
    }

    private String action = "";

    public void initViews(View root){
        Button personAppearBtn = root.findViewById(R.id.person_appear_btn);
        Button stopPersonAppearBtn = root.findViewById(R.id.stop_person_appear_btn);
        personAppearBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    ResultView.mTv_result.setText("检测中...,请稍等");
                    /**
                     * 测试发送一个  “根据条件找人”  指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    JSONObject json = new JSONObject();
                    json.put("command", "startPersonAppear");
                    json.put("personId", -1);
                    json.put("personName", "");
                    json.put("maxDistance", 3);
                    json.put("maxFaceAngleX", 60);
                    json.put("isNeedInCompleteFace", false);
                    json.put("incompleteFaceCacheTimeout", 3000);
                    json.put("isNeedBody", false);
                    json.put("isNeedRecognize", true);
                    json.put("recognizeTimeout", 2000);
                    json.put("appearTimeout", 7000);
                    json.put("text", "Enable personnel detection");
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

        stopPersonAppearBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /**
                     * 测试发送一个  “停止根据条件找人”  指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    JSONObject json = new JSONObject();
                    json.put("command", "stopPersonAppear");
                    json.put("text", "Close personnel detection");
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                    //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     *
     */
    private void registerPersonListener(){

    }

    int reqID = 0;

    /**
     * unregister
     * 取消注册人员监听
     */
    @Override
    public void onDestroyView() {
        super.onDestroyView();
    }

    public static Fragment newInstance() {
        return new PersonAppearFragment();
    }
}
