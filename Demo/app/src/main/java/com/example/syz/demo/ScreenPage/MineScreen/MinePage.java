package com.example.syz.demo.screenpage.minescreen;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.syz.demo.R;

public class MinePage extends Fragment implements View.OnClickListener {


    private ImageView setting_img;
    private ImageView photo_img;
    private TextView name;
    private TextView motto;
    private TextView fans_count;
    private TextView attention_count;
    private TextView grade_count;
    private Button edit_button;
    private View fanTab;
    private View attentionTab;
    private View gradeTab;
    private Uri photoUri;
    private Bitmap photoBitmap;
    private boolean isLogin = false;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.mine_page, container, false);

        initView(view);
        return view;
    }

    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        setting_img.setOnClickListener(this);
        photo_img.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.setting_button:
                Intent settingIntent = new Intent(v.getContext(), SettingAvtivity.class);
                startActivity(settingIntent);
                break;
            case R.id.photo_img:
                if (isLogin) {
                    //展示一张图片
                } else {
                    Intent photoImgIntent = new Intent(v.getContext(), Loginactivity.class);
                    startActivity(photoImgIntent);
                }
                break;
        }
    }

    private void initView(View view) {
        setting_img = (ImageView) view.findViewById(R.id.setting_button);
        photo_img = (ImageView) view.findViewById(R.id.photo_img);
        name = (TextView) view.findViewById(R.id.name);
        motto = (TextView) view.findViewById(R.id.motto);
        fanTab = (TextView) view.findViewById(R.id.fans_count);
        attention_count = (TextView) view.findViewById(R.id.attention_count);
        grade_count = (TextView) view.findViewById(R.id.grade_count);
        edit_button = (Button) view.findViewById(R.id.edit);
        fanTab = (View) view.findViewById(R.id.fans_tab);
        attentionTab = (View) view.findViewById(R.id.attention_tab);
        gradeTab = (View) view.findViewById(R.id.grade_tab);

        if (isLogin) {
            photo_img.setImageBitmap(photoBitmap);
        } else {
            photo_img.setImageResource(R.drawable.photo_img);
        }
    }
}
