package com.example.syz.demo.homeFragment.PicturePage;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.syz.demo.R;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Created by ‘。；op on 2019/2/24.
 */

public class PictureTitleFragment extends Fragment {
    private boolean isTwoPane;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view=inflater.inflate(R.layout.picture_title_frag,container,false);
        RecyclerView newsTitleRecyclerView=(RecyclerView) view.findViewById(R.id.picture_title_recycler_view);
        LinearLayoutManager layoutManager=new LinearLayoutManager(getActivity());
        newsTitleRecyclerView.setLayoutManager(layoutManager);
        NewsAdapter adapter=new NewsAdapter(getNews());
        newsTitleRecyclerView.setAdapter(adapter);
        return view;
    }

    private List<PictureAdapter> getNews(){
        List<PictureAdapter> pictureList=new ArrayList<>();
        for(int i=1;i<=50;i++){
            PictureAdapter picture=new PictureAdapter();
            picture.setTitle("This is picture Title" + i);
            picture.setContent(getRandomLengthContent("This is picture content+i"+i+"."));
            pictureList.add(picture);
        }
        return pictureList;

    }

    private String getRandomLengthContent(String content){
        Random random =new Random();
        int length=random.nextInt(20)+1;
        StringBuilder builder=new StringBuilder();
        for(int i=1;i<length;i++){
            builder.append(content);
        }
        return builder.toString();
    }

    @Override
    public void onActivityCreated(Bundle saveInstanceState){
        super.onActivityCreated(saveInstanceState);
        if(getActivity().findViewById(R.id.picture_content_fragment)!=null){
            isTwoPane=true;
        } else{
            isTwoPane=false;
        }
    }

    class NewsAdapter extends RecyclerView.Adapter<NewsAdapter.ViewHolder>{
        private List<PictureAdapter> mPicturesList;

        class ViewHolder extends RecyclerView.ViewHolder{
            TextView picturesTitleText;

            public ViewHolder(View view){
                super(view);
                picturesTitleText =(TextView) view.findViewById(R.id.picture_title);
            }
        }

        public NewsAdapter(List<PictureAdapter> picturesList){
            mPicturesList=picturesList;
        }

        @Override
        public ViewHolder onCreateViewHolder(ViewGroup parent,int viewType){
            View view=LayoutInflater.from(parent.getContext())
                    .inflate(R.layout.picture_item,parent,false);
            final ViewHolder holder = new ViewHolder(view);
            view.setOnClickListener(new View.OnClickListener(){

                @Override
                public void onClick(View v) {
                    PictureAdapter picture =mPicturesList.get(holder.getAdapterPosition());

                }
            });
            return holder;
        }
        @Override
        public void onBindViewHolder(ViewHolder holder,int position){
            PictureAdapter picture =mPicturesList.get(position);
            holder.picturesTitleText.setText(picture.getTitle());
        }

        @Override
        public int getItemCount(){
            return mPicturesList.size();
        }
    }

    public void onSaveInstanceState(Bundle outState){
        //super.onSaveInstanceState(outState);
    }
}