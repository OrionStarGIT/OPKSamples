package com.example.myfirstapp.fragment;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import androidx.fragment.app.Fragment;

import com.example.myfirstapp.LogTools;
import com.example.myfirstapp.MainActivity;
import com.example.myfirstapp.R;
import com.example.myfirstapp.view.BackView;
import com.example.myfirstapp.view.ResultView;

public abstract class BaseFragment extends Fragment {
    private BackView mBv_back;
    private ResultView mRv_result;
    private RelativeLayout mRl_content;

    protected MainActivity mActivity;
    protected LayoutInflater mInflater;

    @Override
    public void onAttach(Context context) {
        //LogTools.info("验证onAttach方法addView执行前：" + "onAttach内部");
        super.onAttach(context);
        if (context instanceof MainActivity) {
            mActivity = (MainActivity) context;
        }
        mInflater = LayoutInflater.from(context);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.fragment_basic_layout, container, false);
        bindView(root);
        return root;
    }

    private void bindView(View root) {
        mBv_back = (BackView) root.findViewById(R.id.bv_back);
        mRl_content = (RelativeLayout) root.findViewById(R.id.rl_content);
        mRv_result = (ResultView) root.findViewById(R.id.rv_result);
        //LogTools.info("验证onAttach方法addView执行前：" + "准备开始");
        View vw = onCreateView(mActivity);
        //LogTools.info("验证onAttach方法addView执行前：" + "已完成onCreateView");
        mRl_content.addView(onCreateView(mActivity));
        //LogTools.info("验证onAttach方法addView执行前：" + "执行完毕");
    }

    protected void showBackView() { mBv_back.setVisibility(View.VISIBLE);}

    protected void hideBackView() { mBv_back.setVisibility(View.GONE);}

    protected void showResultView() {
        mRv_result.setVisibility(View.VISIBLE);
    }

    protected void hideResultView() {
        mRv_result.setVisibility(View.GONE);
    }

    public void switchFragment(Fragment fragment) {mActivity.switchFragment(fragment);}

    public abstract View onCreateView(Context context);

    @Override
    public void onStop() {
        super.onStop();
        LogTools.clearHistory();
    }
}
