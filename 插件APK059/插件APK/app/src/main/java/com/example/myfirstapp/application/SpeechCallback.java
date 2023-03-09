package com.example.myfirstapp.application;

import android.os.RemoteException;

//import com.ainirobot.coreservice.client.speech.SkillCallback;
import com.example.myfirstapp.LogTools;

//public class SpeechCallback extends SkillCallback {
public class SpeechCallback{
    private static final String TAG = SpeechCallback.class.getName();

   /* @Override
    public void onSpeechParResult(String s) throws RemoteException {
        LogTools.info(TAG +" onSpeechParResult:"+ s);
    }

    @Override
    public void onStart() throws RemoteException {
        LogTools.info(TAG+" onStart");
    }

    @Override
    public void onStop() throws RemoteException {
        LogTools.info(TAG+" onStop");
    }

    @Override
    public void onVolumeChange(int i) throws RemoteException {
        LogTools.info(TAG+" onVolumeChange :" + i);
    }

    @Override
    public void onQueryEnded(int i) throws RemoteException {
        LogTools.info(TAG+" onQueryEnded :" + i);
    }

    @Override
    public void onQueryAsrResult(String asrResult) throws RemoteException {
        LogTools.info(TAG+" onQueryAsrResult :" + asrResult);
    }*/
}
