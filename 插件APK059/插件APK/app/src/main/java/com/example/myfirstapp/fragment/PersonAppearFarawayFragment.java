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

import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.fragment.app.Fragment;

import com.ainirobot.lib.shadowopk.RobotMessengerManager;
import com.example.myfirstapp.R;
import com.example.myfirstapp.application.MRobotMessenger;
import com.example.myfirstapp.bean.PersonBean;
import com.example.myfirstapp.bean.ResponseBean;
import com.example.myfirstapp.maputils.GsonUtil;

import org.json.JSONException;
import org.json.JSONObject;

public class PersonAppearFarawayFragment extends Fragment {
    private static String TRACE_FACE = "personAppear";
    private static String STOP_TRACE_FACE = "stopPersonAppear";

    private PersonAppearState mCurrentState = PersonAppearState.DEFAULT_STATE;
    private TextView tipView;
    private TextView commandView;
    private StringBuilder sb = new StringBuilder();

    enum PersonAppearState {
        DEFAULT_STATE,
        CHECK_PERSON,
        RECOGNIZE_PERSON
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.fragment_person_appear_faraway_layout, container, false);
        initViews(root);
        return root;
    }

    private String action = "";

    public void initViews(View root) {
        tipView = root.findViewById(R.id.tip);
        commandView = root.findViewById(R.id.command);
        Button personAppearBtn = root.findViewById(R.id.person_appear_btn);
        Button stopPersonAppearBtn = root.findViewById(R.id.stop_person_appear_btn);
        personAppearBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (mCurrentState != PersonAppearState.DEFAULT_STATE) {
                    Toast.makeText(getContext(), "正在检查中，请稍等", Toast.LENGTH_SHORT).show();
                    return;
                }
                startPersonAppear();
            }
        });

        stopPersonAppearBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                stopPersonAppear();
            }
        });
    }

    private void startPersonAppear() {
        sb.delete(0, sb.length());
        mCurrentState = PersonAppearState.CHECK_PERSON;
        tipView.setText("检测中...,请稍等");
        /**
         * 测试发送一个  “根据条件找人”  指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
         */
        try {
            RobotMessengerManager.INSTANCE.triggerCommand(getCheckPersonCommand(5, 60, false));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        MRobotMessenger.getInstance().setRobotCallback(new MRobotMessenger.RobotCallback() {
            @Override
            public void onResult(String result) {
                Log.i("SHADOW_OPK", "收取callback内容getRobotSnListener: " + result);
                ResponseBean responseBean = GsonUtil.fromJson(result, ResponseBean.class);
                if (!TextUtils.equals("personAppearAction", responseBean.getCommand())) {
                    Log.i("SHADOW_OPK", "非当前指令 " + responseBean.getCommand());
                    return;
                }
                if (responseBean.getCode() == 32610001) {
                    checkPersonAppearSuccess(responseBean);
                } else {
                    if (responseBean.getCode() == 32610003) {
                        Log.i("SHADOW_OPK", "onResult: 超时未检测到符合条件的人");
                        tipView.setText("超时未检测到符合条件的人");
                    } else if (responseBean.getCode() == -32600004) {
                        Log.i("SHADOW_OPK", "onResult: 获取人脸数据失败");
                        tipView.setText("获取人脸数据失败");
                    }
                    mCurrentState = PersonAppearState.DEFAULT_STATE;
                }
            }
        });
    }

    private long mLastTtsTime;

    private void checkPersonAppearSuccess(ResponseBean responseBean) {
        String data = responseBean.getData();
        String unescapedJsonString = data.substring(1, data.length() - 1);
        String personStr = unescapedJsonString.replace("\\\"", "\"");
        PersonBean personBean = GsonUtil.fromJson(personStr, PersonBean.class);
        if (mCurrentState == PersonAppearState.CHECK_PERSON) {
            tipView.setText("检测到人，等待识别");
            double distance = 5;
            int faceAngle = 60;
            boolean isNeedRecognize = false;
            if (personBean.getDistance() <= 1) {
                mCurrentState = PersonAppearState.RECOGNIZE_PERSON;
                distance = 1;
                faceAngle = 45;
                isNeedRecognize = true;
            } else {
                if (System.currentTimeMillis() - mLastTtsTime > 3000) {
                    mLastTtsTime = System.currentTimeMillis();
                    speakTTS("请靠近点，我要认识您");
                }
            }
            try {
                RobotMessengerManager.INSTANCE.triggerCommand(getCheckPersonCommand(distance, faceAngle, isNeedRecognize));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        } else if (mCurrentState == PersonAppearState.RECOGNIZE_PERSON) {
            mCurrentState = PersonAppearState.DEFAULT_STATE;
            Log.i("SHADOW_OPK", "onResult: 识别成功 " + personBean.getName());
            tipView.setText("识别到：" + personBean.getName());

            speakTTS(personBean.getName() + "您好，很高兴见到您");
        } else {
            mCurrentState = PersonAppearState.DEFAULT_STATE;
            tipView.setText(R.string.person_appear_warning);
        }
    }

    private void speakTTS(String tts) {
        try {
            JSONObject json = new JSONObject();
            json.put("command", "speechPlay");
            json.put("text", tts);
            RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void stopPersonAppear() {
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

    private String getCheckPersonCommand(double distance, int faceAngle, boolean isNeedRecognize) throws JSONException {
        JSONObject json = new JSONObject();
        json.put("command", "startPersonAppear");
        json.put("personId", -1);
        json.put("personName", "");
        json.put("maxDistance", distance);
        json.put("maxFaceAngleX", faceAngle);
        json.put("isNeedInCompleteFace", true);
        json.put("incompleteFaceCacheTimeout", 3000);
        json.put("isNeedBody", false);
        json.put("isNeedRecognize", isNeedRecognize);
        json.put("recognizeTimeout", 2000);
        json.put("appearTimeout", 7000);
        json.put("text", "Enable personnel detection");
        String data = json.toString();
        sb.append(data + "\n");
        commandView.setText(sb.toString());
        return data;
    }

    /**
     *
     */
    private void registerPersonListener() {

    }

    int reqID = 0;

    /**
     * unregister
     * 取消注册人员监听
     */
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        mCurrentState = PersonAppearState.DEFAULT_STATE;
    }

    public static Fragment newInstance() {
        return new PersonAppearFarawayFragment();
    }
}
