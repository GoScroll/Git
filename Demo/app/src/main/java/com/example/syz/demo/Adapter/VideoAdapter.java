package com.example.syz.demo.adapter;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.media.MediaPlayer;
import android.os.Handler;
import android.os.Message;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.SeekBar;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.syz.demo.R;
import com.example.syz.demo.screenpage.minescreen.RegisterActivity;
import com.example.syz.demo.util.Gif;
import com.example.syz.demo.util.MyAppcation;
import com.example.syz.demo.screenpage.GifShowActivity;
import com.example.syz.demo.util.VideoData;
import com.example.syz.demo.util.VideoSurfaceView;


import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import de.hdodenhof.circleimageview.CircleImageView;

public class VideoAdapter extends RecyclerView.Adapter<VideoAdapter.ViewHolder>{
    private List<VideoData> mVideoList;
    private VideoSurfaceView mPlayView;
    private static final int UPDATE = 10;
    private int currentPosition = 0;
    static class ViewHolder extends RecyclerView.ViewHolder{
        CircleImageView headerImage;
        ImageView goodImage;
        ImageView shareImage;
        ImageView commentImage;
        ImageView cover;
        TextView username;
        TextView text;
        TextView goodNumber;
        TextView commentNumber;
        TextView shareNumber;
        TextView title;
        VideoSurfaceView mSurfaceView;
        ImageButton mPlayBtn;
        ImageView mPlayBtnPause;
        TextView totalTime;
        TextView currentTime;
        SeekBar seekBar;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            headerImage = (CircleImageView) itemView.findViewById(R.id.video_header);
            goodImage = (ImageView)itemView.findViewById(R.id.video_good_image);
            username = (TextView)itemView.findViewById(R.id.video_username);
            text = (TextView)itemView.findViewById(R.id.video_text);
            goodNumber = (TextView)itemView.findViewById(R.id.video_good_number);
            commentNumber = (TextView)itemView.findViewById(R.id.video_comment_number);
            shareNumber = (TextView)itemView.findViewById(R.id.video_share_number);
            commentImage = (ImageView)itemView.findViewById(R.id.video_comment_image);
            shareImage = (ImageView)itemView.findViewById(R.id.video_share_image);
            cover = (ImageView)itemView.findViewById(R.id.video_cover);
            title = (TextView)itemView.findViewById(R.id.video_title);
            mSurfaceView = (VideoSurfaceView)itemView.findViewById(R.id.video_view);
            mPlayBtn = (ImageButton)itemView.findViewById(R.id.image_clickplay_more);
            mPlayBtnPause = (ImageView)itemView.findViewById(R.id.image_clickplay);
            totalTime =(TextView) itemView.findViewById(R.id.tv_totalProgress);
            currentTime =(TextView)itemView.findViewById(R.id.tv_currentProgress);
            seekBar = (SeekBar)itemView.findViewById(R.id.seekBar);
        }
    }

    public VideoAdapter(List<VideoData> videoList) {
        mVideoList = videoList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, final int i) {
        final View view = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.item_video,viewGroup,false);
        final ViewHolder holder = new ViewHolder(view);
        holder.goodImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = holder.getAdapterPosition();
                VideoData mVideo = mVideoList.get(position);
                int mUp = mVideo.getCollectionCount() + 1;
                holder.goodImage.setImageResource(R.drawable.text_good_fill);
                holder.goodImage.setColorFilter(Color.RED);
                holder.goodNumber.setText(mUp+" ");
            }
        });

        return holder;
    }
    @Override
    public void onBindViewHolder(@NonNull final ViewHolder holder, final int position) {
        final VideoData video = mVideoList.get(position);
        holder.mSurfaceView.stop();
        holder.mSurfaceView.setVisibility(View.VISIBLE);
        holder.mPlayBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(mPlayView != null){
                    mPlayView.stop();
                    mPlayView.setVisibility(View.VISIBLE);
                }
                holder.mSurfaceView.setVisibility(View.VISIBLE);
                holder.mSurfaceView.playVideo(video.getPlayUrl());
                holder.mPlayBtn.setVisibility(View.GONE);
                holder.cover.setVisibility(View.GONE);
                mPlayView = holder.mSurfaceView;
            }
        });
        holder.mPlayBtnPause.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               mPlayView.pause();
                holder.mPlayBtnPause.setVisibility(View.GONE);
            }
        });
        holder.mSurfaceView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.mPlayBtnPause.setVisibility(View.VISIBLE);
            }
        });
        Glide.with(MyAppcation.getContext())
                .load(video.getAuthorImg())
                .into(holder.headerImage);
        holder.username.setText(video.getAuthorname());
        holder.text.setText(video.getDescription());
        holder.title.setText(video.getTitle());
        holder.goodNumber.setText(video.getCollectionCount()+" ");
        holder.commentNumber.setText(video.getReplyCount()+" ");
        holder.shareNumber.setText(video.getShareCount()+" ");
        Glide.with(MyAppcation.getContext())
                .load(video.getCover())
                .into(holder.cover);

    }

    @Override
    public int getItemCount() {
        return mVideoList.size();
    }

}
