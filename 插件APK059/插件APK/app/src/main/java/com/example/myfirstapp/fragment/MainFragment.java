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
import android.widget.LinearLayout;

import androidx.fragment.app.Fragment;

import com.ainirobot.lib.shadowopk.RobotMessengerManager;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.example.myfirstapp.MainActivity;
import com.example.myfirstapp.R;
import com.example.myfirstapp.application.RobotOSApplication;
import com.example.myfirstapp.application.MRobotMessenger;


import java.util.HashMap;
import java.util.Map;

public class MainFragment extends BaseFragment {

    private Button mLead_scene;
    private Button mSport_scene;
    private Button mSpeech_scene;
    private Button mVision_scene;
    private Button mCharge_scene;
    private Button mAsr_tts;
    private Button mNavigation_scene;
    private Button mTrigger_scene;
    private Button mExit;
    private Context mContext;

    @Override
    public View onCreateView(Context context) {
        mContext = RobotOSApplication.getInstance();
        View root = mInflater.inflate(R.layout.fragment_main_layout,null,false);
        LinearLayout.LayoutParams frameLayout_params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT);
        root.setLayoutParams(frameLayout_params);
        bindViews(root);
        addFragmentListener();
        hideBackView();
        hideResultView();

        return root;
    }

    private void addFragmentListener() {
        try {
/*            MRobotMessenger.getInstance().setRobotCallback(new MRobotMessenger.RobotCallback() {
                @Override
                public void onResult(String result) {
                    Log.i("SHADOW_OPK", "收取MainFragment文件的callback内容: " + result);
                }
            });*/
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void bindViews(View root) {
        mLead_scene = (Button) root.findViewById(R.id.lead_scene);
        mSport_scene = (Button) root.findViewById(R.id.sport_scene);
        mSpeech_scene = (Button) root.findViewById(R.id.speech_scene);
        mVision_scene = (Button) root.findViewById(R.id.vision_scene);
        mCharge_scene = (Button) root.findViewById(R.id.charge_scene);
        mAsr_tts = (Button) root.findViewById(R.id.asr_tts);
        mNavigation_scene = (Button) root.findViewById(R.id.navigation_scene);
        mTrigger_scene = (Button) root.findViewById(R.id.click_to_trigger);
        mExit = (Button) root.findViewById(R.id.exit);
        mExit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                RobotMessengerManager.INSTANCE.disConnectRobot((Context) mContext);
                MainActivity.getInstance().finish();
                onDestroy();
                System.exit(0);
                //System.exit(0);
//                /**
//                 * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
//                 */
//                Map<String, Object> map = new HashMap<String, Object>();
//                map.put("command", "exit");
//                map.put("text", "exit the apk and go to home page");
//                RobotMessengerManager.INSTANCE.triggerCommand(JSON.toJSONString(map));
//
//                MRobotMessenger.getInstance().setRobotCallback(new MRobotMessenger.RobotCallback() {
//                    @Override
//                    public void onResult(String result) {
//                        JSONObject jsonObj = JSON.parseObject(result);
//                        Log.i("SHADOW_OPK", "收到的退出消息内容: " + result);
//                        String intent = jsonObj.getString("intent");
//                        Log.i("SHADOW_OPK", "收到intent的内容: " + intent);
//                        if (intent.equals("stop")) {
//                            RobotMessengerManager.INSTANCE.disConnectRobot((Context) mContext);
//                            Log.i("SHADOW_OPK", "停止操作有没有被执行: " + result);
//                            //System.exit(0);
//                        }
//                    }
//                });
            }
        });
        mLead_scene.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switchFragment(LeadFragment.newInstance());
            }
        });

        mSpeech_scene.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switchFragment(SpeechFragment.newInstance());
            }
        });

        mSport_scene.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switchFragment(SportFragment.newInstance());
            }
        });

        mVision_scene.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switchFragment(VisionFragment.newInstance());
            }
        });

        mAsr_tts.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switchFragment(AsrTtsFragment.newInstance());
            }
        });

        mNavigation_scene.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                switchFragment(NavigationFragment.newInstance());
                switchFragment(NavFragment.newInstance());
            }
        });

        mCharge_scene.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switchFragment(ChargeFragment.newInstance());
            }
        });

        mTrigger_scene.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switchFragment(TriggerFragment.newInstance());
            }
        });
    }

    public static Fragment newInstance() {
        return new com.example.myfirstapp.fragment.MainFragment();
    }
}
