package com.example.syz.demo.partOne;

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


import java.util.List;
import de.hdodenhof.circleimageview.CircleImageView;

public class TextAdapter extends RecyclerView.Adapter<TextAdapter.ViewHolder> {
    private List<Text> mTextList;
    static class ViewHolder extends RecyclerView.ViewHolder{
        CircleImageView headerImage;
        CircleImageView commentUserImage;
        ImageView commentGood;
        ImageView goodImage;
        ImageView commentImage;
        ImageView shareImage;
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
            headerImage = (CircleImageView) itemView.findViewById(R.id.text_header);
            commentUserImage = (CircleImageView) itemView.findViewById(R.id.text_comment_header);
            commentGood = (ImageView)itemView.findViewById(R.id.text_comment_good);
            goodImage = (ImageView)itemView.findViewById(R.id.text_good_image);
            username = (TextView)itemView.findViewById(R.id.text_username);
            textSmile = (TextView)itemView.findViewById(R.id.text_smile);
            commentUsername = (TextView)itemView.findViewById(R.id.text_comment_username);
            commentGoodNumber = (TextView)itemView.findViewById(R.id.text_comment_number_good);
            commentText = (TextView)itemView.findViewById(R.id.text_comment_text);
            goodNumber = (TextView)itemView.findViewById(R.id.text_good_number);
            commentNumber = (TextView)itemView.findViewById(R.id.text_comment_number);
            shareNumber = (TextView)itemView.findViewById(R.id.text_share_number);
            commentImage = (ImageView)itemView.findViewById(R.id.text_comment_image);
            shareImage = (ImageView)itemView.findViewById(R.id.text_share_image);
            commentView = (LinearLayout)itemView.findViewById(R.id.text_comment_view);
        }
    }

    public TextAdapter(List<Text> textList) {
        mTextList = textList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View view = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.item_text,viewGroup,false);
        final ViewHolder holder = new ViewHolder(view);
        holder.goodImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = holder.getAdapterPosition();
                Text mText = mTextList.get(position);
                int mUp = mText.getUp() + 1;
                holder.goodImage.setImageResource(R.drawable.text_good_fill);
                holder.goodImage.setColorFilter(Color.RED);
                holder.goodNumber.setText(mUp+" ");
            }
        });
        holder.commentGood.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = holder.getAdapterPosition();
                Text mText = mTextList.get(position);
                int mDown = mText.getDown() + 1;
                holder.commentGood.setImageResource(R.drawable.text_good_fill);
                holder.commentGood.setColorFilter(Color.RED);
                holder.commentGoodNumber.setText(mDown+" ");
            }
        });

        return holder;
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Text text = mTextList.get(position);
        Glide.with(MyAppcation.getContext())
              .load(text.getHeader())
              .into(holder.headerImage);
        Glide.with(MyAppcation.getContext())
                .load(text.getTop_commentsHeader())
                .into(holder.commentUserImage);
        holder.username.setText(text.getUsername());
        holder.textSmile.setText(text.getText());
        if(text.getTop_commentsContent().equals("null") ){
            holder.commentView.setLayoutParams(new LinearLayout.LayoutParams(0,0));
            Log.d("haha",text.getTop_commentsContent());
        }else{
            holder.commentUsername.setText(text.getTop_commentsName());
            holder.commentGoodNumber.setText(text.getDown()+" ");
            holder.commentText.setText(text.getTop_commentsContent());
            holder.commentGood.setImageResource(R.drawable.text_good);
        }
        holder.goodNumber.setText(text.getUp()+" ");
        holder.commentNumber.setText(text.getComment()+" ");
        holder.shareNumber.setText(text.getForward()+" ");
    }

    @Override
    public int getItemCount() {
        return mTextList.size();
    }
}
