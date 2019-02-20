package com.example.syz.demo.partOne;

import android.content.Intent;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.syz.demo.R;
import com.example.syz.demo.screenPage.partOnePage.GifShowActivity;


import java.util.List;
import de.hdodenhof.circleimageview.CircleImageView;

public class GifAdapter extends RecyclerView.Adapter<GifAdapter.ViewHolder> {
    private List<Gif> mGifList;
    static class ViewHolder extends RecyclerView.ViewHolder{
        CircleImageView headerImage;
        CircleImageView commentUserImage;
        ImageView commentGood;
        ImageView goodImage;
        ImageView commentImage;
        ImageView shareImage;
        ImageView thumb;
        TextView username;
        TextView textSmile;
        TextView commentUsername;
        TextView commentGoodNumber;
        TextView commentText;
        TextView goodNumber;
        TextView commentNumber;
        TextView shareNumber;
        LinearLayout commentView;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            headerImage = (CircleImageView) itemView.findViewById(R.id.gif_header);
            commentUserImage = (CircleImageView) itemView.findViewById(R.id.gif_comment_header);
            commentGood = (ImageView)itemView.findViewById(R.id.gif_comment_good);
            goodImage = (ImageView)itemView.findViewById(R.id.gif_good_image);
            username = (TextView)itemView.findViewById(R.id.gif_username);
            textSmile = (TextView)itemView.findViewById(R.id.gif_smile);
            commentUsername = (TextView)itemView.findViewById(R.id.gif_comment_username);
            commentGoodNumber = (TextView)itemView.findViewById(R.id.gif_comment_number_good);
            commentText = (TextView)itemView.findViewById(R.id.gif_comment_text);
            goodNumber = (TextView)itemView.findViewById(R.id.gif_good_number);
            commentNumber = (TextView)itemView.findViewById(R.id.gif_comment_number);
            shareNumber = (TextView)itemView.findViewById(R.id.gif_share_number);
            commentImage = (ImageView)itemView.findViewById(R.id.gif_comment_image);
            shareImage = (ImageView)itemView.findViewById(R.id.gif_share_image);
            commentView = (LinearLayout)itemView.findViewById(R.id.gif_comment_view);
            thumb = (ImageView)itemView.findViewById(R.id.gif_thumb);
        }
    }

    public GifAdapter(List<Gif> gifList) {
        mGifList = gifList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, final int i) {
        final View view = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.item_gif,viewGroup,false);
        final ViewHolder holder = new ViewHolder(view);
        holder.goodImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = holder.getAdapterPosition();
                Gif mGif = mGifList.get(position);
                int mUp = mGif.getUp() + 1;
                holder.goodImage.setImageResource(R.drawable.text_good_fill);
                holder.goodImage.setColorFilter(Color.RED);
                holder.goodNumber.setText(mUp+" ");
            }
        });
        holder.commentGood.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = holder.getAdapterPosition();
                Gif mGif = mGifList.get(position);
                int mDown = mGif.getDown() + 1;
                holder.commentGood.setImageResource(R.drawable.text_good_fill);
                holder.commentGood.setColorFilter(Color.RED);
                holder.commentGoodNumber.setText(mDown+" ");
            }
        });
        holder.thumb.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = holder.getAdapterPosition();
                Gif gif = mGifList.get(position);
                Intent intent = new Intent(view.getContext(),GifShowActivity.class);
                intent.putExtra("imgUrl",gif.getGifImage());
                view.getContext().startActivity(intent);
            }
        });
        return holder;
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Gif gif = mGifList.get(position);
        Glide.with(MyAppcation.getContext())
                .load(gif.getHeader())
                .into(holder.headerImage);
        Glide.with(MyAppcation.getContext())
                .load(gif.getTop_commentsHeader())
                .into(holder.commentUserImage);
        holder.username.setText(gif.getUsername());
        holder.textSmile.setText(gif.getText());
        if(gif.getTop_commentsContent().equals("null") ){
            holder.commentView.setLayoutParams(new LinearLayout.LayoutParams(0,0));
            Log.d("haha",gif.getTop_commentsContent());
        }else{
            holder.commentUsername.setText(gif.getTop_commentsName());
            holder.commentGoodNumber.setText(gif.getDown()+" ");
            holder.commentText.setText(gif.getTop_commentsContent());
            holder.commentGood.setImageResource(R.drawable.text_good);
        }
        holder.goodNumber.setText(gif.getUp()+" ");
        holder.commentNumber.setText(gif.getComment()+" ");
        holder.shareNumber.setText(gif.getForward()+" ");
        Glide.with(MyAppcation.getContext())
                .load(gif.getThumbnail())
                .into(holder.thumb);
    }

    @Override
    public int getItemCount() {
        return mGifList.size();
    }
}
