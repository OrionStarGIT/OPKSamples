package com.example.myfirstapp.application;

import android.app.Application;
import android.content.Context;
import android.os.HandlerThread;
import android.util.Log;

import com.ainirobot.lib.shadowopk.AbsRobotMessenger;
import com.ainirobot.lib.shadowopk.RobotMessengerCallBack;
import com.ainirobot.lib.shadowopk.RobotMessengerManager;

public class RobotOSApplication extends Application {
    private static final String TAG = RobotOSApplication.class.getName();

    private Context mContext;

    private SpeechCallback mSkillCallback;
    private HandlerThread mApiCallbackThread;
    private static RobotOSApplication mApplication;

    @Override
    public void onCreate() {
        super.onCreate();
        mContext = this;
        mApplication = this;
        init();
        initRobotApi();
    }

    private void init() {
        mSkillCallback = new SpeechCallback();
        mApiCallbackThread = new HandlerThread("RobotOSDemo");
        mApiCallbackThread.start();
    }

    public static RobotOSApplication getInstance() { return mApplication; }

    private void initRobotApi() {
        Log.i("SHADOW_OPK", "onMessengerReady 5");
        RobotMessengerManager.INSTANCE.connectRobot((Context) mContext, (RobotMessengerCallBack)(new RobotMessengerCallBack() {
            public void onMessengerReady() {
                MRobotMessenger mrm = new MRobotMessenger((Context) mContext);
                RobotMessengerManager.INSTANCE.setRobotMessenger((AbsRobotMessenger)mrm);

                Log.i("SHADOW_OPK", "onMessengerReady 0");
            }
        }));
    }

    private void addApiCallBack() {
        Log.d(TAG, "CoreService connected ");
    }

}


