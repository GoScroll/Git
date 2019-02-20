package com.example.syz.demo.screenPage.mineScreen;
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

public class RegisterActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText register_phone;
    private EditText check_number;
    private EditText register_password;
    private Button register_button;
    private TextView check_text;
    private TextView secret_text;
    private ImageView register_back;
    private String register_uri = "https://www.apiopen.top/createUser?key=00d91e8e0cca2b76f515926a36db68f5";
    private String backMsg = "nihao";
    public static final String TAG = "RegisterActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.register_activity);

        initView();
    }

    public void initView() {
        register_phone = (EditText) findViewById(R.id.register_phone);
        check_number = (EditText) findViewById(R.id.check_number);
        register_password = (EditText) findViewById(R.id.register_password);
        register_button = (Button) findViewById(R.id.register_button);
        register_back = (ImageView) findViewById(R.id.register_back);
        check_text = (TextView) findViewById(R.id.check_text);
        secret_text = (TextView) findViewById(R.id.secret_text);

        check_text.setOnClickListener(this);
        register_button.setOnClickListener(this);
        secret_text.setOnClickListener(this);
        register_back.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.register_button:
                RequestBody requestBody = new FormBody.Builder()
                        .add("phone", register_phone.getText().toString())
                        .add("passwd", register_password.getText().toString())
                        .build();
                HttpUtil.postOkHttpRequest(register_uri, requestBody, new Callback() {
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
                        } catch ( Exception e) {
                            Log.e(TAG,Log.getStackTraceString(e));
                        }

                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                if (backMsg.equals("成功!")) {
                                    finish();
                                } else {
                                    Toast.makeText(getApplicationContext(), backMsg, Toast.LENGTH_SHORT).show();
                                }
                            }
                        });
                    }
                });
                break;
            case R.id.check_text:
                Toast.makeText(this, "验证码功能暂未实现可以随便输入6为数字", Toast.LENGTH_SHORT).show();
                break;
            case R.id.secret_text:
                Toast.makeText(this, "暂未实现其功能", Toast.LENGTH_SHORT).show();
                break;
            case R.id.register_back:
                finish();
                break;
            default:
                break;
        }
    }
}
