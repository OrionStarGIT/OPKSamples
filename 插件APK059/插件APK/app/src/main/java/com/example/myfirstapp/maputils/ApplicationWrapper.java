package com.example.myfirstapp.maputils;

import android.content.Context;

public class ApplicationWrapper {
    private static Context sContext;

    public ApplicationWrapper() {
    }

    static void setApplicationContext(Context context) {
        sContext = context.getApplicationContext();
    }

    public static Context getApplicationContext() {
        return sContext;
    }
}
