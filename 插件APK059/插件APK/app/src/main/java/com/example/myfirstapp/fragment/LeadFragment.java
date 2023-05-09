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
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.fragment.app.Fragment;

import com.example.myfirstapp.R;

public class LeadFragment extends BaseFragment {

    private Button mStop_lead_btn;
    private Button mStart_lead_btn;
    private EditText mLead_point;

    @Override
    public View onCreateView(Context context) {
        View root = mInflater.inflate(R.layout.fragment_lead_layout,null,false);
        bindViews(root);
        return root;
    }

    private void bindViews(View root) {
        mStop_lead_btn = (Button) root.findViewById(R.id.stop_lead_btn);
        mStart_lead_btn = (Button) root.findViewById(R.id.start_lead_btn);
        mLead_point = (EditText)root.findViewById(R.id.et_lead_point);

        mStart_lead_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startCruise();
            }
        });

        mStop_lead_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                stopLead();
            }
        });
    }

    private String getLeadPoint(){
        String leadPoint = mLead_point.getText().toString();
        if(TextUtils.isEmpty(leadPoint)){
            leadPoint = mLead_point.getHint().toString();
        }
        return leadPoint;
    }

    /*
    * 巡逻api测试
    */
    private void startCruise(){

    }

    /**
     * 开始引领
     */
    private void startLead() {

    }

    /**
     * leading stop
     * 结束引领
     * isResetHW： 引领时会切换摄像头到后置摄像头，isResetHW是用于设置停止引领时是否恢复摄像头状态，
     * true: reset front camera, false: doesn't do anything
     * true：恢复摄像头为前置，false : 保持停止时的状态
     */
    private void stopLead() {
    }

    public static Fragment newInstance() {
        return new com.example.myfirstapp.fragment.LeadFragment();
    }

}
