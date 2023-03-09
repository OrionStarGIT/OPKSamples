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

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import com.ainirobot.lib.shadowopk.RobotMessengerManager;
import org.json.JSONException;
import org.json.JSONObject;

import com.example.myfirstapp.MainActivity;
import com.example.myfirstapp.R;

public class SportFragment extends BaseFragment {

    private Button mGo_back;
    private Button mTurn_left;
    private Button mStop_move;
    private Button mGo_forward;
    private Button mTurn_right;


    private Button mHead_up;
    private Button mHead_down;
    private Button mHead_left;
    private Button mHead_right;
    @Nullable
    private static MainActivity instance;

    private static int reqId = 0;

    @Override
    public View onCreateView(Context context) {
        View root = mInflater.inflate(R.layout.fragment_sport_layout, null, false);
        initViews(root);
        return root;
    }

    private void initViews(View root) {
        mGo_forward = (Button) root.findViewById(R.id.go_forward);
        mGo_back = (Button) root.findViewById(R.id.go_back);
        mStop_move = (Button) root.findViewById(R.id.stop_move);
        mTurn_left = (Button) root.findViewById(R.id.turn_left);
        mTurn_right = (Button) root.findViewById(R.id.turn_right);
        mHead_up = (Button) root.findViewById(R.id.head_up);
        mHead_down = (Button) root.findViewById(R.id.head_down);
        mHead_left = (Button) root.findViewById(R.id.head_left);
        mHead_right = (Button) root.findViewById(R.id.head_right);

        mGo_forward.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /**
                     * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    JSONObject params = new JSONObject();
                    params.put("lineSpeed", 0.1);
                    params.put("angularSpeed", 0);

                    JSONObject json = new JSONObject();
                    json.put("command", "bodyForward");
                    json.put("text", "body forward");
                    json.put("params", params);
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                    //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                //RobotApi.getInstance().goForward(0, 0.02f, mMotionListener);
            }
        });

        mGo_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /**
                     * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    JSONObject params = new JSONObject();
                    params.put("lineSpeed", -0.1);
                    params.put("angularSpeed", 0);

                    JSONObject json = new JSONObject();
                    json.put("command", "bodyBack");
                    json.put("text", "body back");
                    json.put("params", params);
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                    //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                //RobotApi.getInstance().goBackward(0, 0.02f, mMotionListener);
            }
        });

        mTurn_left.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {                try {
                /**
                 * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                 */
                JSONObject params = new JSONObject();
                params.put("lineSpeed", 0);
                params.put("angularSpeed", 0.1);

                JSONObject json = new JSONObject();
                json.put("command", "bodyLeft");
                json.put("text", "body left");
                json.put("params", params);
                RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
            } catch (JSONException e) {
                e.printStackTrace();
            }

                //RobotApi.getInstance().turnLeft(0, 0.2f, mMotionListener);
            }
        });

        mTurn_right.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /**
                     * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    JSONObject params = new JSONObject();
                    params.put("lineSpeed", 0);
                    params.put("angularSpeed", -0.1);

                    JSONObject json = new JSONObject();
                    json.put("command", "bodyRight");
                    json.put("text", "body right");
                    json.put("params", params);
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                    //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                //RobotApi.getInstance().turnRight(0, 0.2f, mMotionListener);
            }
        });

        mStop_move.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /**
                     * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    JSONObject json = new JSONObject();
                    json.put("command", "bodyStop");
                    json.put("text", "body stop");
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                    //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                //RobotApi.getInstance().stopMove(0, mMotionListener);
            }
        });

        mHead_up.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /**
                     * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    JSONObject params = new JSONObject();
                    params.put("hMode", "relative");
                    params.put("hAngle", 0);
                    params.put("vMode", "relative");
                    params.put("vAngle", -10);

                    JSONObject json = new JSONObject();
                    json.put("command", "headUp");
                    json.put("text", "head up");
                    json.put("params", params);
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                    //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
        mHead_down.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /**
                     * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    JSONObject params = new JSONObject();
                    params.put("hMode", "relative");
                    params.put("hAngle", 0);
                    params.put("vMode", "relative");
                    params.put("vAngle", 10);

                    JSONObject json = new JSONObject();
                    json.put("command", "headDown");
                    json.put("text", "head down");
                    json.put("params", params);
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                    //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, 10, mMotionListener);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
        mHead_left.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /**
                     * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    JSONObject params = new JSONObject();
                    params.put("hMode", "relative");
                    params.put("hAngle", -30);
                    params.put("vMode", "relative");
                    params.put("vAngle", 0);

                    JSONObject json = new JSONObject();
                    json.put("command", "headLeft");
                    json.put("text", "head left");
                    json.put("params", params);
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                    //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", -10, 0, mMotionListener);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
        mHead_right.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /**
                     * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    JSONObject params = new JSONObject();
                    params.put("hMode", "relative");
                    params.put("hAngle", 30);
                    params.put("vMode", "relative");
                    params.put("vAngle", 0);

                    JSONObject json = new JSONObject();
                    json.put("command", "headRight");
                    json.put("text", "head right");
                    json.put("params", params);
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                    //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 10, 0, mMotionListener);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

/*    private CommandListener mMotionListener = new CommandListener() {
        @Override
        public void onResult(int result, String message) {
            LogTools.info("SportFragment result: " + result + " message:" + message);
            if ("succeed".equals(message)) {
            } else {
            }
        }
    };*/

    public static Fragment newInstance() {
        return new com.example.myfirstapp.fragment.SportFragment();
    }
}
