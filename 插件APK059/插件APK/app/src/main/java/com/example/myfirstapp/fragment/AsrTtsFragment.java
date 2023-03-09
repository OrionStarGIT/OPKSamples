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
import android.text.method.ScrollingMovementMethod;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.fragment.app.Fragment;

import com.ainirobot.lib.shadowopk.RobotMessengerManager;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.example.myfirstapp.LogTools;
import com.example.myfirstapp.R;
import com.example.myfirstapp.application.MRobotMessenger;

import java.util.HashMap;
import java.util.Map;

public class AsrTtsFragment extends BaseFragment {

    private static final String TAG = "AsrTtsFragment";
    //private TextView mAsrTts;
    private TextView mDomainIntent;

    @Override
    public View onCreateView(Context context) {

        View root = mInflater.inflate(R.layout.fragment_asr_tts_layout, null, false);
        initViews(root);
        addFragmentListener();
        hideResultView();
        return root;
    }

    private void addFragmentListener() {
        try {
            MRobotMessenger.getInstance().setRobotCallback(new MRobotMessenger.RobotCallback() {
                @Override
                public void onResult(String result) {
                    Log.i("SHADOW_OPK", "收取callback内容asr: " + result);
                    JSONObject jsonObj = JSON.parseObject(result);
                    //mAsrTts.setText(jsonObj.getString("intent"));
                    mDomainIntent.setText(jsonObj.getString("result"));
                }
            });
            //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void initViews(View root) {
        //mAsrTts = root.findViewById(R.id.asr_tts_contents);
        mDomainIntent = root.findViewById(R.id.domain_intent_contents);
        mDomainIntent.setMovementMethod(new ScrollingMovementMethod());
    }

    public static Fragment newInstance() {
        return new AsrTtsFragment();
    }
}
