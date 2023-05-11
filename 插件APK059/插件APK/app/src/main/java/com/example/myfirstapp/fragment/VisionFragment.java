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

import org.json.JSONException;
import org.json.JSONObject;

public class VisionFragment extends BaseFragment {
    private static String TRACk_FACE = "trackFace";
    private static String STOP_TRACk_FACE = "stopTrackFace";

    @Override
    public View onCreateView(Context context) {
        View root = mInflater.inflate(R.layout.fragment_vision_layout,null,false);
        initViews(root);
        return root;
    }

    private String action = "";

    public void initViews(View root){
        Button trackFaceBtn = root.findViewById(R.id.track_face_btn);
        Button stopTrackFaceBtn = root.findViewById(R.id.stop_track_face_btn);
        trackFaceBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /**
                     * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    JSONObject json = new JSONObject();
                    json.put("command", "trackFace");
                    json.put("personId", -1);
                    json.put("maxDistance", 3);
                    json.put("maxFaceAngleX", 60);
                    json.put("isNeedInCompleteFace", false);
                    json.put("disappearTimeout", 7000);
                    json.put("isMultiPersonNotTrack", false);
                    json.put("multiPersonNotTrackDistance", 2);
                    json.put("isAllowMoveBody", true);
                    json.put("text", "track face");
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

        stopTrackFaceBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /**
                     * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    JSONObject json = new JSONObject();
                    json.put("command", "stopTrackFace");
                    json.put("text", "stop track face");
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
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
        return new com.example.myfirstapp.fragment.VisionFragment();
    }
}
