package com.example.syz.demo.screenPage.MineScreen;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.syz.demo.R;
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
    private String Msg;
    private String phone;
    private String password;

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
                loginApp();
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
//

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
                    Msg = jsonObject.getString("msg");
                    JSONObject jsonObject1 = jsonObject.getJSONObject("data");
                    phone = jsonObject1.getString("phone");
                    password = jsonObject1.getString("passwd");
                } catch ( Exception e) {
                    Log.e(TAG,Log.getStackTraceString(e));
                }

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (Msg.equals("成功!")) {
                            try {
                                if (phone.equals(loginphone.getText().toString()) && password.equals(loginpassword.getText().toString())) {
                                    finish();
                                } else {
                                    Toast.makeText(getApplicationContext(), "账号密码不正确", Toast.LENGTH_SHORT).show();
                                }
                            } catch (Exception e) {
                                Log.e(TAG, Log.getStackTraceString(e));
                            }
                        } else {
                            Toast.makeText(getApplicationContext(), Msg, Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
        });
    }
}
