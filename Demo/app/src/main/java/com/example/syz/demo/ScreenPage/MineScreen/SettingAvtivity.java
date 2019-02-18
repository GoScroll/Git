package com.example.syz.demo.screenPage.MineScreen;

import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.widget.TextView;

import com.example.syz.demo.R;

public class SettingAvtivity extends AppCompatActivity {

    private Toolbar setting_toolbar;
    private TextView title;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.setting_avtivity);

       setting_toolbar = (Toolbar) findViewById(R.id.setting_toolbar);
       setSupportActionBar(setting_toolbar);
       getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                finish();
                break;
        }
        return true;
    }
}
