package com.example.syz.demo;

import android.Manifest;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentTransaction;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.syz.demo.screenPage.AttentionPage;
import com.example.syz.demo.screenPage.communityScreen.CommunityPage;
import com.example.syz.demo.screenPage.HomePage;
import com.example.syz.demo.screenPage.mineScreen.MinePage;


public class MainActivity extends FragmentActivity implements View.OnClickListener {

    private HomePage page1;
    private CommunityPage page2;
    private AttentionPage page3;
    private MinePage page4;

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

//        initView();
//        int id = getIntent().getIntExtra("id", 0);
//        if (id == 3) {
//            setTabSelected(3);
//        } else {
//            setTabSelected(0);
//        }
        if(ContextCompat.checkSelfPermission(this,Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED
                || ContextCompat.checkSelfPermission(this,Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED){
            ActivityCompat.requestPermissions(this,new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},1);
            ActivityCompat.requestPermissions(this,new String[]{Manifest.permission.READ_EXTERNAL_STORAGE},2);
        }else{
            initView();
        }
        int id = getIntent().getIntExtra("id", 0);
        if (id == 3) {
            setTabSelected(3);
        } else {
            setTabSelected(0);
        }

    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode){
            case 1:
                if(grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED){
                    initView();
                    setTabSelected(0);
                }else{
                    Toast.makeText(this,"You denied the permission",Toast.LENGTH_SHORT);
                }
                break;
            case 2:
                if(grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED){
                    initView();
                    setTabSelected(0);
                }else{
                    Toast.makeText(this,"You denied the permission",Toast.LENGTH_SHORT);
                }
                break;
            default:
                break;
        }
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
                    page1 = new HomePage();
                    transaction.add(R.id.container, page1);
                } else {
                    transaction.show(page1);
                }
                break;
            case 1:
                if (page2 == null) {
                    page2 = new CommunityPage();
                    transaction.add(R.id.container, page2);
                } else {
                    transaction.show(page2);
                }
                break;
            case 2:
                if (page3 == null) {
                    page3 = new AttentionPage();
                    transaction.add(R.id.container, page3);
                } else {
                    transaction.show(page3);
                }
                break;
            case 3:
                if (page4 == null) {
                    page4 = new MinePage();
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

