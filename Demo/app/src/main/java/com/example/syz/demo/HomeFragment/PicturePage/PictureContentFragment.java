package com.example.syz.demo.HomeFragment.PicturePage;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.syz.demo.R;

/**
 * Created by ‘。；op on 2019/2/24.
 */

public class PictureContentFragment extends Fragment{
    private View view;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        view=inflater.inflate(R.layout.picture_content_frag,container,false);
        return view;
    }

    public void refresh(String pictureTitle,String pictureContent) {
        View visibilityLayout = view.findViewById(R.id.visibility_layout);
        visibilityLayout.setVisibility(View.VISIBLE);
        TextView pictureTitleText = (TextView) view.findViewById(R.id.picture_title);
        TextView pictureContentText = (TextView) view.findViewById(R.id.picture_content);
        pictureTitleText.setText(pictureTitle);
        pictureContentText.setText(pictureContent);
    }

    public void  onSaveInstanceState(Bundle outState){
        //super.onSaveInstanceState(outState);
    }
}
