package com.example.myfirstapp.application;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import androidx.annotation.Nullable;

import com.ainirobot.lib.shadowopk.AbsRobotMessenger;
import com.example.myfirstapp.LogTools;
import com.example.myfirstapp.MainActivity;

import org.jetbrains.annotations.NotNull;

import kotlin.jvm.internal.Intrinsics;

public final class MRobotMessenger extends AbsRobotMessenger {
    private final Handler handler;
    private final Context context;
    public RobotCallback callback;

    private static MRobotMessenger instance;

    public static MRobotMessenger getInstance(){
        return instance;
    }

    public void setRobotCallback(RobotCallback callback) {
        this.callback = callback;
    }


    public void onRobotMessage(@Nullable final String message) {
        Log.i("SHADOW_OPK", "client onRobotMessage 2: " + message);
        this.handler.post((Runnable)(new Runnable() {
            public final void run() {
                MainActivity var10000 = MainActivity.getInstance();
                if (var10000 != null) {
                    LogTools.info(message);
                    Log.i("SHADOW_OPK", "client onRobotMessage获取内容: " + message);
                    if(callback != null){
                        Log.i("SHADOW_OPK", "client onRobotMessage 5: " + message);
                        callback.onResult(message);
                    }
                }
            }
        }));
    }

    public MRobotMessenger(@NotNull Context context) {
        super();
        Log.i("SHADOW_OPK", "onMessengerReady 11");
        Intrinsics.checkParameterIsNotNull(context, "context");
        this.context = context;
        this.handler = new Handler(Looper.getMainLooper());
        instance = this;
    }

    public static interface  RobotCallback{
        void onResult(String result);
    }
}
