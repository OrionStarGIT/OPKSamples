package com.example.myfirstapp.fragment;

import android.Manifest;
import android.content.Context;
import android.os.Bundle;
import android.os.Environment;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.fragment.app.Fragment;

import com.ainirobot.lib.shadowopk.RobotMessengerManager;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.example.myfirstapp.MainActivity;
import com.example.myfirstapp.R;
import com.example.myfirstapp.application.MRobotMessenger;
import com.example.myfirstapp.maputils.DialogConfirm;
import com.example.myfirstapp.maputils.DialogUtils;
import com.example.myfirstapp.maputils.GlobalData;
import com.example.myfirstapp.maputils.MapppUtils;
import com.example.myfirstapp.maputils.Pose2d;
import com.example.myfirstapp.maputils.PoseBean;
import com.example.myfirstapp.maputils.RoverMap;
import com.example.myfirstapp.view.MapView;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;

public class NavFragment extends Fragment {

    private MapView mMapView;
    private final static String MAP_DIR = "/robot/map";
    private final static String ROBOT_MAP_DIR = Environment.getExternalStorageDirectory() + MAP_DIR;
    private final static String MAP_PGM = "pgm.zip";
    public static boolean isCreatingMap = false;
    private static final String TAG = "NavFragment";
    private TextView mBackView;
    private boolean mIsEstimate;
    private RoverMap mRoverMap;
    private String placeName1;
    private static NavFragment navfragment;
    private Context message;

    public static NavFragment getInstance() { return navfragment;};

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View root = inflater.inflate(R.layout.fragment_nav, null, false);
        requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1);
        initView(root);
        addFragmentListener();
        return root;
    }

    private void addCurrentPositionListener() {
        try {
            /**
             * 测试发送一个 "“获取当前坐标”" 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
             */
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("command", "currentPosition");
            map.put("text", "get the current position");
            RobotMessengerManager.INSTANCE.triggerCommand(JSON.toJSONString(map));
            Log.i("SHADOW_OPK", "onMessengerReady 4");
            MRobotMessenger.getInstance().setRobotCallback(new MRobotMessenger.RobotCallback() {
                @Override
                public void onResult(String result) {
                    Log.i("SHADOW_OPK", "收取callback内容addCurrentPositionListener: " + result);
                    mMapView.post(new Runnable() {
                        @Override
                        public void run() {
                            setCurrentPosition(result);
                        }
                    });

                }
            });
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void setCurrentPosition(String result) {
        JSONObject jsonObj = JSON.parseObject(result);
        String mapName = jsonObj.getString("curMapName");
        if (mapName != "" && mapName != null) {
            /*
             * setOrigin
             * 设置机器人当前位置
             * Set the current position of the robot
             * */
            String poseStr = jsonObj.getString("pose");
            Log.i("SHADOW_OPK", "设置当前坐标数据: " + poseStr + "   当前地图curMapName为：" + mapName);
            JSONObject poseObject = JSON.parseObject(poseStr);
            mMapView.setOrigin(MapppUtils.pose2PixelByRoverMap(this.mRoverMap, new Pose2d(poseObject.getDouble("px"),
                    poseObject.getDouble("py"),
                    poseObject.getDouble("theta"),
                    0)));
        }

    }

    private void addFragmentListener() {
        try {
            /**
             * 测试发送一个 “获取地图” 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
             */
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("command", "map");
            map.put("text", "get the map");
            RobotMessengerManager.INSTANCE.triggerCommand(JSON.toJSONString(map));
            Log.i("SHADOW_OPK", "onMessengerReady 41");
            MRobotMessenger.getInstance().setRobotCallback(new MRobotMessenger.RobotCallback() {
                @Override
                public void onResult(String result) {
                    Log.i("SHADOW_OPK", "收取callback内容addFragmentListener: " + result);
                    mMapView.post(new Runnable() {
                        @Override
                        public void run() {
                            getMap(result);
                        }
                    });

                }
            });
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void setCurPose(String pose) {
    }

    private void initView(View root) {
        mMapView = root.findViewById(R.id.map_view);
        mBackView = root.findViewById(R.id.edit_back);

        mBackView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                stopNavigation();
                MainActivity.getInstance().switchFragment(MainFragment.newInstance());
            }
        });

        mMapView.setMode(MapView.MapMode.POINT);
        /*
         * 注册MapView地点点击监听
         * registOnPlaceClickListener
         * */
        mMapView.registOnPlaceClickListener(mOnPlaceClickListener);
    }


    /*
     * getMap
     * 获得当前地图
     * 地图具有当前机器人位置信息，方向坐标与可点击导航的位置点位
     * Get the current map
     * The map has current robot position information, direction coordinates and clickable navigation positions
     * */
    private void getMap(String result) {
        JSONObject jsonObj = JSON.parseObject(result);
        String mapName = jsonObj.getString("mapName");
        if (mapName != "") {
            String mapPath = ROBOT_MAP_DIR + File.separator + mapName + File.separator + MAP_PGM;
            this.mRoverMap = MapppUtils.loadMap(mapPath);
            if (this.mRoverMap != null) {
                mMapView.setBitmap(this.mRoverMap.bitmap);
                Log.d(TAG, "this.mRoverMap.res: " + this.mRoverMap.res);
                mMapView.setResolution(this.mRoverMap.res);
            } else {
                Log.d(TAG, "parse map fail");
            }
            GlobalData.getInstance().setEditMapData(mMapView, this.mRoverMap);

            this.addCurrentPositionListener();

            /*
             * setPoseBeans
             * 设置机器人站点列表数据
             * Set the position lists of the robot
             * */
            String poseBeanStr = jsonObj.getString("poseBeanList");
            Log.i("SHADOW_OPK", "poseBeanStr数据内容: " + poseBeanStr);
            JSONArray array = JSON.parseArray(poseBeanStr);
            List<PoseBean> poseBeans = new ArrayList<>();
            int length=array.size();
            for(int i=0;i<length;i++){
                JSONObject oneObj = array.getJSONObject(i);
                String placeName = oneObj.getString("name");
                Double x = oneObj.getDouble("x");
                Double y = oneObj.getDouble("y");
                Double theta = oneObj.getDouble("theta");
                Log.i("SHADOW_OPK", "oneObj的内容: " + oneObj + "   ;X=：" + x + "   ;y=:" + y +"   ;theta=:" + theta);
                poseBeans.add(new PoseBean(placeName,
                        MapppUtils.pose2PixelByRoverMap(this.mRoverMap
                                , new Pose2d(x,
                                        y,
                                        theta,
                                        0))));
            }
            mMapView.setPoseBeans(poseBeans);
            GlobalData.getInstance().setPoseBeanList(poseBeans, true);
        }
    }

    /*
     * OnPlaceClickListener
     * 地图位置点点击监听
     * Click on the map location to monitor
     * */
    MapView.OnPlaceClickListener mOnPlaceClickListener = new MapView.OnPlaceClickListener() {
        @Override
        public void onPlaceClick(final String placeName) {
            DialogUtils.showGoNavigation(getContext(), placeName,
                    new DialogConfirm.ConfirmCallBack() {
                        @Override
                        public void confirmClick() {
                            //placeName1 = placeName;
                            startNavigation(placeName);
                        }
                    }, new DialogConfirm.CancelBtnCallBack() {
                        @Override
                        public void cancelClick() {
                            Toast.makeText(getContext(), "点击成功", Toast.LENGTH_SHORT).show();
                        }
                    });
        }
    };

    /**
     * startNavigation
     * 导航到指定位置
     */
    public static void startNavigation(String placeName) {
        /**
         * 测试发送一个 “导航” 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
         */
        JSONObject params = new JSONObject();
        params.put("coordinate_deviation", 0.5); //目的地范围，在目的地范围内均认为正常到达，默认0.5米
        params.put("moving_timeout_time", 20000); //机器人未移动超时时间，默认20000毫秒，超过该时间未移动，此次导航失败
        params.put("max_avoid_count", 5); //堵死状态检测次数，机器人在被堵死后会每隔一段时间检测一次，超过该次数后还是被堵死，则认为导航失败，默认5次
        params.put("avoid_interval_time", 1000); //堵死状态检测间隔时间，默认1000毫秒
        params.put("auto_reset_estimate", true); //导航过程中如果发生定位丢失，是否尝试自动重定位，默认true
        params.put("param_reset_estimate_count", 5); //重定位尝试次数，默认5次
        params.put("get_distance_interval_time", 1000); //距离信息上报间隔时间，默认1000毫秒
        params.put("param_linear_speed", 0.3); //导航线速度，可不填写，范围0.1-1.2 m/s
        params.put("param_angular_speed", 1); //导航角速度，可不填写，范围0.2-1.8 rad/s（1rad=180°/π，约 57.3°）
        params.put("param_is_adjust_angle", true); //到达目标点时机器的朝向是按照前进方向还是设置位置点时的方向，true 前进方向，false 设置位置点时的方向，默认false
        params.put("param_is_need_avoid_notify_immediately", false); //被障碍物堵死立即上报状态，默认false （1.34.0版本引入）
        params.put("param_destination_range", 0); //当目标点不可到达时，停在目标点附近的距离范围，默认0米（1.34.0版本引入)

        JSONObject json = new JSONObject();
        json.put("command", "gotoMapSite");
        json.put("text", placeName);
        json.put("params", params);
        RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
    }

    /**
     * stopNavigation
     * 停止导航到指定位置
     */
    private void stopNavigation() {
        /**
         * 测试发送一个 "停止导航" 指令， opk demo 中收到播放指令，会将指令通过 MRobotMessenger 再回传回来
         */
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("command", "stopMapSite");
        map.put("text", "stop goto the map site");
        RobotMessengerManager.INSTANCE.triggerCommand(JSON.toJSONString(map));
    }

    private boolean isCurrentMap() {
        return TextUtils.equals(placeName1,
                GlobalData.getInstance().getCurrentMapName());
    }

    @Override
    public void onStart() {
        super.onStart();
        if (isCurrentMap()) {
        }
    }

    @Override
    public void onStop() {
        super.onStop();
    }

    private void onMapPose2d(final Pose2d pose2d) {
        if (null != mRoverMap) {
            if (mIsEstimate) {
                mMapView.setOrigin(MapppUtils.pose2PixelByRoverMap(mRoverMap, pose2d));
            }
        }
    }

    public static Fragment newInstance() {
        return new com.example.myfirstapp.fragment.NavFragment();
    }
}