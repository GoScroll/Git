package com.example.syz.demo.screenPage.mineScreen;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.example.syz.demo.R;
import com.example.syz.demo.homeFragment.gif.GifShowActivity;
import com.example.syz.demo.util.ImgDownloads;
import com.example.syz.demo.util.MyAppcation;

public class ImgShowActivity extends AppCompatActivity {

    private String imgUrl;
    private ImageView img;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gif_show);
        Intent intent = getIntent();
        imgUrl = intent.getStringExtra("imgUrl");
        img = (ImageView)findViewById(R.id.gif_show_Image);
        Glide.with(MyAppcation.getContext())
                .load(imgUrl)
                .diskCacheStrategy(DiskCacheStrategy.SOURCE)
                .into(img);
//        getSupportActionBar().hide();
        ImageView back = (ImageView)findViewById(R.id.gif_show_back);
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        ImageView download = (ImageView)findViewById(R.id.gif_show_download);
        download.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ImgDownloads.downloadImg(ImgShowActivity.this,imgUrl);
            }

        });
    }
}
