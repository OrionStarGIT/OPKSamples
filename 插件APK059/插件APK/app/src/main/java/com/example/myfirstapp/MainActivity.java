package com.example.myfirstapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.FrameLayout;

import com.example.myfirstapp.fragment.MainFragment;

public class MainActivity extends AppCompatActivity {

    private FrameLayout mContent;

    private static MainActivity mInstance;

    public static MainActivity getInstance() { return mInstance;};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initViews();
        mInstance = this;
    }

    private void initViews() {
        mContent = findViewById(R.id.container_content);
        Fragment fragment = MainFragment.newInstance();
        switchFragment(fragment);
    }

    public void switchFragment(Fragment fragment){
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.container_content, fragment, fragment.getClass().getName())
                .commit();
    }
}