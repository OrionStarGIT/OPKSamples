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

import com.example.myfirstapp.LogTools;
import com.example.myfirstapp.R;

public class LocationFragment extends BaseFragment {

    private static final String TAG = "LocationFragment";
    private double mCurrentX;
    private double mCurrentY;
    private double mCurrentTheta;

    private Button mIs_location;
    private Button mGet_location;
    private Button mSet_location;
    private Button mIs_in_location;
    private Button mRemove_location;
    private Button mSet_reception_point;
    private Button mGetname;

    @Override
    public View onCreateView(Context context) {
        View root = mInflater.inflate(R.layout.fragment_location_layout, null, false);
        initViews(root);
        return root;
    }

    private void initViews(View root) {
        mIs_location = (Button) root.findViewById(R.id.is_location);
        mGet_location = (Button) root.findViewById(R.id.get_location);
        mSet_location = (Button) root.findViewById(R.id.set_location);
        mIs_in_location = (Button) root.findViewById(R.id.is_in_location);
        mRemove_location = (Button) root.findViewById(R.id.remove_location);
        mSet_reception_point = (Button) root.findViewById(R.id.set_reception_point);
        mGetname = (Button) root.findViewById(R.id.getname);


        mIs_in_location.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                isRobotInlocation();
            }
        });

        mSet_location.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setPostEstimate();
            }
        });

        mIs_location.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                isRobotEstimate();
            }
        });

        mSet_reception_point.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setLocation();
            }
        });

        mGet_location.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                getLocation();
            }
        });

        mRemove_location.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                removeLocation();
            }
        });

        mGetname.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                getName();
            }
        });
    }


    /**
     * is robot in location
     * 判断机器人是否在位置点
     */
    private void isRobotInlocation() {

    }

    /**
     * set robot in init estimate
     * 设置机器人初始坐标点
     */
    private void setPostEstimate() {
        if(mCurrentX == 0 || mCurrentY == 0){
            LogTools.info("Estimate is empty, please set it before use");
            LogTools.info("坐标为空,请先获取当前坐标");
            return;
        }
    }
    /**
     * is robot
     * 判断当前是否已定位
     */

    private void getName(){
    }


    /**
     * is robot
     * 判断当前是否已定位
     */
    private void isRobotEstimate() {

    }

    /**
     * 设置当前位置名称
     */
    private void setLocation(){

    }

    /**
     * 获取当前坐标点
     */
    private void getLocation(){

    }

    /**
     * 删除位置点
     */
    private void removeLocation(){

    }

    public static Fragment newInstance() {
        return new com.example.myfirstapp.fragment.LocationFragment();
    }
}
