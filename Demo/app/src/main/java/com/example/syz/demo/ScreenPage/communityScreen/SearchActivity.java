package com.example.syz.demo.screenPage.communityScreen;

import android.animation.ObjectAnimator;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.util.DisplayMetrics;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.syz.demo.R;
import com.example.syz.demo.adapter.SearchFragmentAdapter;
import com.example.syz.demo.util.Text;

import java.util.ArrayList;
import java.util.List;

public class SearchActivity extends AppCompatActivity implements View.OnClickListener, ViewPager.OnPageChangeListener {

    private ViewPager searchViewPage;
    private EditText searchText;
    private TextView cancelText;
    private TextView cardTab;
    private TextView userTab;
    private ImageView lineTab;
    private List<Fragment> fragmentList = new ArrayList<>();
    private int moveOne;
    private Boolean isScrolling = false;
    private Boolean isBackScrolling = false;
    private long startTime = 0;
    private long currentTime = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.search_activity);

        initView();
        initLineTab();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    private void initLineTab() {
        /**
         * 获取屏幕高度
         */
        DisplayMetrics dm = new DisplayMetrics();
        getWindowManager().getDefaultDisplay().getMetrics(dm);
        int screenW = dm.widthPixels;

        /**
         * 重新设置下划线宽度
         */
        ViewGroup.LayoutParams lp = lineTab.getLayoutParams();
        lp.width = screenW/12;
        lineTab.setLayoutParams(lp);

        moveOne = screenW/2;
    }

    private void initView() {
        searchViewPage = (ViewPager) findViewById(R.id.search_viewpage);
        searchText = (EditText) findViewById(R.id.search_text);
        cancelText = (TextView) findViewById(R.id.cancel);
        cardTab = (TextView) findViewById(R.id.search_card);
        userTab = (TextView) findViewById(R.id.search_user);
        lineTab = (ImageView) findViewById(R.id.search_line);

        CardFragment cardFragment = new CardFragment();
        UserFragment userFragment = new UserFragment();
        fragmentList.add(cardFragment);
        fragmentList.add(userFragment);
        SearchFragmentAdapter adapter = new SearchFragmentAdapter(getSupportFragmentManager(), fragmentList);
        searchViewPage.setAdapter(adapter);

        cardTab.setTextColor(Color.BLACK);
        userTab.setTextColor(Color.GRAY);
        searchViewPage.setCurrentItem(0);

        cardTab.setOnClickListener(this);
        userTab.setOnClickListener(this);

        searchViewPage.setOnPageChangeListener(this);


    }

    @Override
    public void onPageScrollStateChanged(int state) {
        switch (state) {
            case 0:
                isScrolling = true;
                isBackScrolling = false;
                break;
            case 1:
                isScrolling = false;
                isBackScrolling = true;
                break;
            default:
                isScrolling = false;
                isBackScrolling = false;
                break;
        }
    }

    @Override
    public void onPageScrolled(int position, float positionOffSet, int positionOffSetPixels) {
        currentTime = System.currentTimeMillis();
        if (isScrolling && (currentTime - startTime) > 0) {
            movePositionX(position, moveOne*positionOffSet);
            startTime = currentTime;
        }
        if (isBackScrolling){
            movePositionX(position, 0);
        }

    }

    @Override
    public void onPageSelected(int position) {
        switch (position) {
            case 0:
                cardTab.setTextColor(Color.BLACK);
                userTab.setTextColor(Color.GRAY);
                movePositionX(0, 0);
                break;
            case 1:
                cardTab.setTextColor(Color.GRAY);
                userTab.setTextColor(Color.BLACK);
                movePositionX(1, 0);
                break;
            default:
                break;
        }
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.search_card:
                searchViewPage.setCurrentItem(0);
                break;
            case R.id.search_user:
                searchViewPage.setCurrentItem(1);
                break;
            default:
                break;
        }
    }

    private void movePositionX(int toPosition, float positionOffSetPixels) {
        float curTranslationX = lineTab.getTranslationX();
        float toPositionX = moveOne * toPosition + positionOffSetPixels;
        ObjectAnimator animator = ObjectAnimator.ofFloat(lineTab, "translationX", curTranslationX, toPositionX);
        animator.setDuration(500);
        animator.start();
    }


}
