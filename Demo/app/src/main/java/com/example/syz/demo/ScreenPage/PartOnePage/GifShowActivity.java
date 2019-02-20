package com.example.syz.demo.ScreenPage.PartOnePage;

import android.app.Activity;
import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.load.resource.gif.GifDrawable;
import com.bumptech.glide.request.FutureTarget;
import com.bumptech.glide.request.target.Target;
import com.example.syz.demo.PartOne.Gif;
import com.example.syz.demo.PartOne.ImgDownloads;
import com.example.syz.demo.PartOne.MyAppcation;
import com.example.syz.demo.R;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.ExecutionException;

public class GifShowActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gif_show);
        Intent intent = getIntent();
        final String imgUrl = intent.getStringExtra("imgUrl");
        final ImageView gifImage = (ImageView)findViewById(R.id.gif_show_Image);
        Glide.with(MyAppcation.getContext())
                .load(imgUrl)
                .asGif()
                .diskCacheStrategy(DiskCacheStrategy.SOURCE)
                .into(gifImage);
        getSupportActionBar().hide();
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
                ImgDownloads.downloadImg(GifShowActivity.this,imgUrl);

            }
        });
    }

}
