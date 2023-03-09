package com.example.myfirstapp.application;

import android.app.Application;
import android.content.Context;
import android.os.HandlerThread;
import android.util.Log;
import android.widget.Toast;

import com.ainirobot.lib.shadowopk.AbsRobotMessenger;
import com.ainirobot.lib.shadowopk.RobotMessengerCallBack;
import com.ainirobot.lib.shadowopk.RobotMessengerManager;
import com.example.myfirstapp.MainActivity;

import org.jetbrains.annotations.Nullable;

//import com.ainirobot.coreservice.client.ApiListener;
//import com.ainirobot.coreservice.client.RobotApi;
//import com.ainirobot.coreservice.client.module.ModuleCallbackApi;
//import com.ainirobot.coreservice.client.speech.SkillApi;

public class RobotOSApplication extends Application {
    private static final String TAG = RobotOSApplication.class.getName();

    private Context mContext;
    //private SkillApi mSkillApi;

    private SpeechCallback mSkillCallback;
    private HandlerThread mApiCallbackThread;
    //private ModuleCallbackApi mModuleCallback;
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
        //mModuleCallback = new ModuleCallbackApi();
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
//                RobotMessengerManager.INSTANCE.resetRobotMessenger();
//                RobotMessengerManager.INSTANCE.setRobotMessenger((AbsRobotMessenger)new AbsRobotMessenger() {
//                    @Override
//                    public void onRobotMessage(@Nullable String s) {
//                        Log.e("SHADOW_OPK 初始化内容：", s);
//                    }
//                });

                Log.i("SHADOW_OPK", "onMessengerReady 0");
                //Toast.makeText((Context)MainActivity.getInstance(), (CharSequence)"连接成功", 0);
            }
        }));
/*        RobotApi.getInstance().connectServer(mContext, new ApiListener() {
            @Override
            public void handleApiDisabled() {
                Log.i(TAG, "handleApiDisabled");
            }

            *//**
             * Server connected, set callback to handle message
             * Server已连接，设置接收请求的回调，包含语音指令、系统事件等
             *
             * Start connect RobotOS, init and make it ready to use
             * 启动与RobotOS连接，这里可以做一些初始化的工作 例如连接语音,本地服务等
             *//*
            @Override
            public void handleApiConnected() {
                Log.i(TAG, "handleApiConnected");
                addApiCallBack();
                initSkillApi();
            }

            *//**
             * Disconnect RobotOS
             * 连接已断开
             *//*
            @Override
            public void handleApiDisconnected() {
                Log.i(TAG, "handleApiDisconnected");
            }
        });*/
    }

    private void addApiCallBack() {
        Log.d(TAG, "CoreService connected ");
        //RobotApi.getInstance().setCallback(mModuleCallback);
        //RobotApi.getInstance().setResponseThread(mApiCallbackThread);
    }

    private void initSkillApi() {
        /*mSkillApi = new SkillApi();
        ApiListener apiListener = new ApiListener() {
            @Override
            public void handleApiDisabled() {
            }

            *//**
             * Handle speech service
             * 语音服务连接成功，注册语音回调
             *//*
            @Override
            public void handleApiConnected() {
                mSkillApi.registerCallBack(mSkillCallback);
            }

            *//**
             * Disconnect speech service
             * 语音服务已断开
             *//*
            @Override
            public void handleApiDisconnected() {
            }
        };
        mSkillApi.addApiEventListener(apiListener);
        mSkillApi.connectApi(mContext);*/
    }

/*    public SkillApi getSkillApi() {
        if (mSkillApi.isApiConnectedService()) {
            return mSkillApi;
        }
        return null;
    }*/

}


