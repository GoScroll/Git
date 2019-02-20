package com.example.syz.demo.screenPage.mineScreen;

import android.content.Intent;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.syz.demo.MainActivity;
import com.example.syz.demo.R;
import com.example.syz.demo.screenPage.mineScreen.RegisterActivity;
import com.example.syz.demo.util.HttpUtil;

import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.RequestBody;
import okhttp3.Response;

public class Loginactivity extends AppCompatActivity implements View.OnClickListener {


    private EditText loginphone;
    private EditText loginpassword;
    private Button loginButton;
    private TextView register;
    private ImageView loginBack;
    private String loginUri = "https://www.apiopen.top/login?key=00d91e8e0cca2b76f515926a36db68f5";
    private String TAG = "LoginActivity";
    private String backMsg;
    private String nickname;
    private String motto;
    private String headPhoto;
    private String Sex;
    private LocalBroadcastManager localBroadcastManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_activity);

        initView();

    }

    private void initView() {
        loginphone = (EditText) findViewById(R.id.phone_number);
        loginpassword = (EditText) findViewById(R.id.password_text);
        loginButton = (Button) findViewById(R.id.login_button);
        register = (TextView) findViewById(R.id.register);
        loginBack = (ImageView) findViewById(R.id.login_back);

        loginButton.setOnClickListener(this);
        register.setOnClickListener(this);
        loginBack.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.login_button:
                if (loginphone.getText().length()>0 && loginpassword.getText().length()> 0) {
                    loginApp();
                } else {
                    Toast.makeText(this, "请填写账号密码", Toast.LENGTH_SHORT).show();
                }
                break;
            case R.id.register:
                Intent registerIntent = new Intent(this, RegisterActivity.class);
                startActivity(registerIntent);
                break;
            case R.id.login_back:
                finish();
                break;
        }
    }

    private void loginApp() {
        RequestBody requestBody = new FormBody.Builder()
                .add("phone", loginphone.getText().toString())
                .add("passwd", loginpassword.getText().toString())
                .build();

        HttpUtil.postOkHttpRequest(loginUri, requestBody, new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.e(TAG,Log.getStackTraceString(e));
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String responseData = response.body().string();
                try{
                    JSONObject jsonObject = new JSONObject(responseData);
                    backMsg = jsonObject.getString("msg");
                    JSONObject jsonObject1 = jsonObject.getJSONObject("data");
                    nickname = jsonObject1.getString("name");
                    motto = jsonObject1.getString("text");
                    Sex = jsonObject1.getString("other");
                    headPhoto = jsonObject1.getString("img");
                } catch ( Exception e) {
                    Log.e(TAG,Log.getStackTraceString(e));
                }

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (backMsg.equals("成功!")) {
//                            try {
//                                if (phone.equals(loginphone.getText().toString()) && password.equals(loginpassword.getText().toString())) {
//                                    Intent intent = new Intent(Loginactivity.this, MainActivity.class);
//                                    intent.putExtra("id", 3);
//                                    startActivity(intent);
//                                } else {
//                                    Toast.makeText(getApplicationContext(), "账号密码不正确", Toast.LENGTH_SHORT).show();
//                                }
//                            } catch (Exception e) {
//                                Log.e(TAG, Log.getStackTraceString(e));
//                            }
                            localBroadcastManager = LocalBroadcastManager.getInstance(getApplication());
                            Intent intent = new Intent("login");
                            intent.putExtra("islogin", true);
                            intent.putExtra("nickName", nickname);
                            intent.putExtra("motto", motto);
                            intent.putExtra("sex", Sex);
                            intent.putExtra("img", headPhoto);
                            localBroadcastManager.sendBroadcast(intent);
//                            setResult(RESULT_OK, intent);
                            Intent intent1 = new Intent(Loginactivity.this, MainActivity.class);
                            intent1.putExtra("id", 3);
                            startActivity(intent1);
                        } else if (backMsg.equals("用户名或者密码错误！")) {
                            Toast.makeText(getApplication(), backMsg, Toast.LENGTH_SHORT).show();
                        } else {
                            Toast.makeText(getApplicationContext(), backMsg, Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
        });
    }
}
