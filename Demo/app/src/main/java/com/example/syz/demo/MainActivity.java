package com.example.syz.demo;

import android.graphics.Color;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;


public class MainActivity extends FragmentActivity implements View.OnClickListener {

    private Page1 page1;
    private Page2 page2;
    private Page3 page3;
    private Page4 page4;

    private View homeTab;
    private View musicTab;
    private View attentionTab;
    private View mineTab;

    private ImageView homeimg;
    private ImageView musicimg;
    private ImageView attentionimg;
    private ImageView mineimg;
    private ImageView addimg;
    private TextView homeText;
    private TextView musicText;
    private TextView attentionText;
    private TextView mineText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        initView();
        setTabSelected(0);
    }

    private void initView() {
        homeTab = findViewById(R.id.home_tab);
        musicTab = findViewById(R.id.music_tab);
        attentionTab = findViewById(R.id.attention_tab);
        mineTab = findViewById(R.id.mine_tab);
        homeimg = (ImageView) findViewById(R.id.home_img);
        musicimg = (ImageView) findViewById(R.id.music_img);
        attentionimg = (ImageView) findViewById(R.id.attention_img);
        mineimg = (ImageView) findViewById(R.id.mine_img);
        addimg = (ImageView)findViewById(R.id.add_circle);
        homeText = (TextView) findViewById(R.id.home_text);
        musicText = (TextView) findViewById(R.id.music_text);
        attentionText = (TextView) findViewById(R.id.attention_text);
        mineText = (TextView) findViewById(R.id.mine_text);

        homeimg.setColorFilter(Color.RED);
        musicimg.setColorFilter(Color.GRAY);
        attentionimg.setColorFilter(Color.GRAY);
        mineimg.setColorFilter(Color.GRAY);
        addimg.setImageResource(R.drawable.add);
        homeText.setTextColor(Color.RED);
        musicText.setTextColor(Color.GRAY);
        attentionText.setTextColor(Color.GRAY);
        mineText.setTextColor(Color.GRAY);

        homeTab.setOnClickListener(this);
        musicTab.setOnClickListener(this);
        attentionTab.setOnClickListener(this);
        mineTab.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.home_tab:
                homeimg.setColorFilter(Color.RED);
                musicimg.setColorFilter(Color.GRAY);
                attentionimg.setColorFilter(Color.GRAY);
                mineimg.setColorFilter(Color.GRAY);
                homeText.setTextColor(Color.RED);
                musicText.setTextColor(Color.GRAY);
                attentionText.setTextColor(Color.GRAY);
                mineText.setTextColor(Color.GRAY);
                setTabSelected(0);
                break;
            case R.id.music_tab:
                homeimg.setColorFilter(Color.GRAY);
                musicimg.setColorFilter(Color.RED);
                attentionimg.setColorFilter(Color.GRAY);
                mineimg.setColorFilter(Color.GRAY);
                homeText.setTextColor(Color.GRAY);
                musicText.setTextColor(Color.RED);
                attentionText.setTextColor(Color.GRAY);
                mineText.setTextColor(Color.GRAY);
                setTabSelected(1);
                break;
            case R.id.attention_tab:
                homeimg.setColorFilter(Color.GRAY);
                musicimg.setColorFilter(Color.GRAY);
                attentionimg.setColorFilter(Color.RED);
                mineimg.setColorFilter(Color.GRAY);
                homeText.setTextColor(Color.GRAY);
                musicText.setTextColor(Color.GRAY);
                attentionText.setTextColor(Color.RED);
                mineText.setTextColor(Color.GRAY);
                setTabSelected(2);
                break;
            case R.id.mine_tab:
                homeimg.setColorFilter(Color.GRAY);
                musicimg.setColorFilter(Color.GRAY);
                attentionimg.setColorFilter(Color.GRAY);
                mineimg.setColorFilter(Color.RED);
                homeText.setTextColor(Color.GRAY);
                musicText.setTextColor(Color.GRAY);
                attentionText.setTextColor(Color.GRAY);
                mineText.setTextColor(Color.RED);
                setTabSelected(3);
                break;
            case  R.id.add_circle:
                break;
            default:
                break;
        }
    }

    private void setTabSelected (int index) {
        FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();
        hideFragment(transaction);
        switch (index) {
            case 0:
                if (page1 == null) {
                    page1 = new Page1();
                    transaction.add(R.id.container, page1);
                } else {
                    transaction.show(page1);
                }
                break;
            case 1:
                if (page2 == null) {
                    page2 = new Page2();
                    transaction.add(R.id.container, page2);
                } else {
                    transaction.show(page2);
                }
                break;
            case 2:
                if (page3 == null) {
                    page3 = new Page3();
                    transaction.add(R.id.container, page3);
                } else {
                    transaction.show(page3);
                }
                break;
            case 3:
                if (page4 == null) {
                    page4 = new Page4();
                    transaction.add(R.id.container, page4);
                } else {
                    transaction.show(page4);
                }
                break;
            default:
                break;
        }
        transaction.commit();

    }

    private void hideFragment(FragmentTransaction transaction) {
        if (page1 != null) {
            transaction.hide(page1);
        }
        if (page2 != null) {
            transaction.hide(page2);
        }
        if (page3 != null) {
            transaction.hide(page3);
        }
        if (page4 != null) {
            transaction.hide(page4);
        }
    }
}

