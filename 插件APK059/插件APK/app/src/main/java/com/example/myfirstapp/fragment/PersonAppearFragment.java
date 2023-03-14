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
import android.widget.TextView;

import androidx.fragment.app.Fragment;

import com.ainirobot.lib.shadowopk.RobotMessengerManager;
import com.example.myfirstapp.R;
import com.example.myfirstapp.view.ResultView;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.CollationElementIterator;

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
                     * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                     */
                    JSONObject json = new JSONObject();
                    json.put("command", "startPersonAppear");
                    json.put("text", "Enable personnel detection");
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                    //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                //action = TRACE_FACE;
                //registerPersonListener();
            }
        });

        stopPersonAppearBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
            try {
                /**
                 * 测试发送一个播放 tts 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
                 */
                JSONObject json = new JSONObject();
                json.put("command", "stopPersonAppear");
                json.put("text", "Close personnel detection");
                RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
            } catch (JSONException e) {
                e.printStackTrace();
            }
                //action = STOP_TRACE_FACE;
                //registerPersonListener();
            }
        });
    }

    /**
     *
     */
    private void registerPersonListener(){
        //PersonApi.getInstance().registerPersonListener(mListener);
    }

    int reqID = 0;
    /**
     * Use this to get all persons from robot visual ability
     * 人员变化时，可以调用获取当前人员列表接口获取机器人视野内所有人员
     */
    /*private PersonListener mListener = new PersonListener() {
        @Override
        public void personChanged() {
            super.personChanged();
            final List<Person> allFaceList = PersonApi.getInstance().getAllPersons();
            LogTools.info("Found faces,count:"+allFaceList.size());
            //get best person face to register
            //找到人脸最佳的进行识别
            final Person person = PersonUtils.getBestFace(allFaceList);
            if(person == null){
                LogTools.info("No good face found | 没有找到符合要求的人脸图片");
                return;
            }
            //stop find people
            //停止找人
            PersonApi.getInstance().unregisterPersonListener(mListener);

            //get the face from network
            //找找人脸是否已经注册
            RobotApi.getInstance().getPictureById(reqID++,person.getId(),1,new CommandListener(){
                @Override
                public void onResult(int result, String message) {
                    try {
                        JSONObject json = new JSONObject(message);
                        String status = json.optString("status");
                        //获取照片成功 get picture success
                        if (Definition.RESPONSE_OK.equals(status)) {
                            JSONArray pictures = json.optJSONArray("pictures");
                            if (TextUtils.isEmpty(pictures.optString(0))) {
                                LogTools.info("No good face picture found | 没有找到符合要求的人脸图片");
                            }
                            else{
                                String picturePath = pictures.optString(0);
                                List<String> facePics = new ArrayList<>();
                                facePics.add(picturePath);

                                RobotApi.getInstance().getPersonInfoFromNet(reqID++, person.getUserId(), facePics, new CommandListener() {
                                    @Override
                                    public void onResult(int result, String message, String extraData) {
                                        try {
                                            JSONObject json = new JSONObject(message);
                                            JSONObject info = json.getJSONObject("data").getJSONObject("people");
                                            if(StringUtil.isNullOrEmpty(info.getString("user_id"))){
                                                LogTools.info("Person Unregister | gender:"+info.getString("gender"));
                                                if(action == REGISTER){
                                                    registerPerson(person);
                                                }
                                            }
                                            else{
                                                LogTools.info("Person Found:"+info.getString("name")+"|gender:"+info.getString("gender"));
                                            }
                                        } catch (JSONException | NullPointerException e) {
                                            e.printStackTrace();
                                        }
                                    }

                                    @Override
                                    public void onStatusUpdate(int status, String data, String extraData) {
                                        LogTools.info("status"+status+" | data:"+data +" | extraData" + extraData);
                                    }
                                });
                            }
                        }
                        else{
                            LogTools.info("Can not found best face picture");
                        }
                    } catch (JSONException | NullPointerException e) {
                        e.printStackTrace();
                    }
                }
            });
            reqID++;
        }
    };*/
    /*private void registerPerson(Person person){
        //Register People, replace personName to your own person name or guid
        //注册人脸，把personName字段设置成应该设置的名字，或者GUID
        RobotApi.getInstance().startRegister(reqID,"Person"+reqID,20000,5,2,new ActionListener() {
            @Override
            public void onResult(int status, String response) throws RemoteException {
                if (Definition.RESULT_OK != status) {
                    //Register failed
                    //注册失败
                    LogTools.info("Register failed:"+status+"|"+response);
                    return;
                }
                try {
                    JSONObject json = new JSONObject(response);
                    String remoteType = json.optString(Definition.REGISTER_REMOTE_TYPE);
                    String remoteName = json.optString(Definition.REGISTER_REMOTE_NAME);
                    if (Definition.REGISTER_REMOTE_SERVER_EXIST.equals(remoteType)) {
                        //user exists
                        //当前用户已存在
                        LogTools.info("Register failed:user exists");
                    } else if (Definition.REGISTER_REMOTE_SERVER_NEW.equals(remoteType)) {
                        //register success
                        LogTools.info("Register success");
                        //新注册用户成功
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }*/

    /**
     * unregister
     * 取消注册人员监听
     */
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        //PersonApi.getInstance().unregisterPersonListener(mListener);
    }

    public static Fragment newInstance() {
        return new PersonAppearFragment();
    }
}
