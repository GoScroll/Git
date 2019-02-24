package com.example.syz.demo.HomeFragment.PicturePage;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.example.syz.demo.R;

public class PictureContentActivity extends AppCompatActivity {


    public static void actionStart(Context context, String pictureTitle,String pictureContent){
        Intent intent = new Intent(context, PictureContentActivity.class);
        intent.putExtra("picture_title",pictureTitle);
        intent.putExtra("picture_content",pictureContent);
        context.startActivity(intent);

    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.picture_content);
        String pictureTitle=getIntent().getStringExtra("picture_title");
        String pictureContent=getIntent().getStringExtra("picture_content");
        PictureContentFragment pictureContentFragment=(PictureContentFragment)
                getSupportFragmentManager().findFragmentById(R.id.picture_content_fragment);
        pictureContentFragment.refresh(pictureTitle,pictureContent);
    }
}
