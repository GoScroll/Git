package com.example.syz.demo.screenPage.PublishActivity;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.syz.demo.R;
import com.example.syz.demo.util.Text;

public class PublishActivity extends AppCompatActivity implements View.OnClickListener {

    private TextView cancelButton;
    private TextView selectPlate;
    private View bindingView;
    private String platText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.publish_activity);

        initView();
    }

    private void initView() {

        cancelButton = (TextView) findViewById(R.id.cancel);
        selectPlate = (TextView) findViewById(R.id.select_plate);
        bindingView = (View) findViewById(R.id.bindingView);

        cancelButton.setOnClickListener(this);
        selectPlate.setOnClickListener(this);

        Intent intent = getIntent();
        platText = intent.getStringExtra("title");
        if (!(platText == null)) {
            selectPlate.setText(platText);
        }

        LightStatusbar();
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.cancel:
                finish();
                overridePendingTransition(R.anim.silde_stay,R.anim.silde_bottom_out);
                break;
            case R.id.select_plate:
                Intent intent = new Intent(this, SelectPlateActivity.class);
                startActivity(intent);
            default:
                break;
        }
    }

    private void LightStatusbar() {
        if (Build.VERSION.SDK_INT >= 21) {
            View decorView = getWindow().getDecorView();
            int option =  View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
            decorView.setSystemUiVisibility(option);
            getWindow().setStatusBarColor(Color.TRANSPARENT);
        }
        int statusBarHeight = getStatusBarHeight(this);
        ViewGroup.LayoutParams params = bindingView.getLayoutParams();
        params.height = statusBarHeight;
        bindingView.setVisibility(View.VISIBLE);
        bindingView.setLayoutParams(params);
    }

    private int getStatusBarHeight(Activity activity) {
        int statusBarHeight = 0;
        int resourceId = activity.getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            statusBarHeight = activity.getResources().getDimensionPixelSize(resourceId);
        }

        return statusBarHeight;
    }

}
