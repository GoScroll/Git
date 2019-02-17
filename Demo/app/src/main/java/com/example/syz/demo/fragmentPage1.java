package com.example.syz.demo;

import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.syz.demo.PartOne.HttpUtil;
import com.example.syz.demo.PartOne.Text;
import com.example.syz.demo.PartOne.TextAdapter;


import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Response;

public class fragmentPage1 extends Fragment {
    private static final int UPDATE = 1;
    private static final int RE_UPDATE = 2;
    private List<Text> mText = new ArrayList<>();
    private RecyclerView textRecyclerView;
    private String []text;
    private String []type;
    private String []username;
    private String []header;
    private int []comment;
    private String []top_commentsContent;
    private String []top_commentsHeader;
    private String []top_commentsName;
    private int []up;
    private int []down;
    private int []forward;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_page1,container,false);
        sendRequestWithOKHttp();
        textRecyclerView = (RecyclerView)view.findViewById(R.id.text_recycler);
        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
    }

     private Handler handler = new Handler(){
        public void handleMessage(Message message){
            switch (message.what){
                case UPDATE:
                    LinearLayoutManager layoutManager = new LinearLayoutManager(getActivity());
                    textRecyclerView.setLayoutManager(layoutManager);
                    TextAdapter textAdapter = new TextAdapter(mText);
                    textRecyclerView.setAdapter(textAdapter);
                    break;
                default:
                    break;
            }
        }
    };

    private void parseJson(String jsonData){
        try {
            text = new String[20];
            type = new String[20];
            username = new String[20];
            header = new String[20];
            comment = new int[20];
            top_commentsContent = new String[20];
            top_commentsHeader = new String[20];
            top_commentsName = new String[20];
            up = new int[20];
            down = new int[20];
            forward = new int[20];
            JSONObject jsonObject = new JSONObject(jsonData);
            JSONArray jsonArray = jsonObject.getJSONArray("data");
            Log.d("haha","haa:"+jsonArray.length());
            for(int i = 0 ; i < jsonArray.length() ; i++){
                JSONObject json = jsonArray.getJSONObject(i);
                text[i] = json.getString("text");
                type[i] = json.getString("type");
                username[i] = json.getString("username");
                header[i] = json.getString("header");
                comment[i] = json.getInt("comment");
                top_commentsContent[i] = json.getString("top_commentsContent");
                top_commentsHeader[i] = json.getString("top_commentsHeader");
                top_commentsName[i] = json.getString("top_commentsName");
                up[i] = json.getInt("up");
                down[i] = json.getInt("down");
                forward[i] = json.getInt("forward");
                Text textC = new Text();
                textC.setText(text[i]);
                textC.setType(type[i]);
                textC.setUsername(username[i]);
                textC.setHeader(header[i]);
                textC.setComment(comment[i]);
                textC.setTop_commentsContent(top_commentsContent[i]);
                textC.setTop_commentsHeader(top_commentsHeader[i]);
                textC.setTop_commentsName(top_commentsName[i]);
                textC.setUp(up[i]);
                textC.setDown(down[i]);
                textC.setForward(forward[i]);
                mText.add(textC);
            }
            Log.d("haha",mText.get(1).getType());
            new Thread(new Runnable() {
                @Override
                public void run() {
                    Message message = new Message();
                    message.what = UPDATE;
                    handler.sendMessage(message);
                }
            }).start();

        }catch (Exception e){
            e.printStackTrace();
        }

    }
    private void sendRequestWithOKHttp(){
        new Thread(new Runnable() {
            @Override
            public void run() {
                HttpUtil.sendOKHttpRequest("https://www.apiopen.top/satinGodApi?type=2&page=1",new Callback(){
                    @Override
                    public void onResponse(Call call, Response response) throws IOException {
                        String responseData = response.body().string();
                        parseJson(responseData);
                    }
                    @Override
                    public void onFailure(Call call, IOException e) {
                        Log.d("haha","error:"+e);
                    }
                });
            }
        }).start();
    }

}
