package com.example.syz.demo.util;

public class SearchOrderData {
    private int orderNumber;
    private String orderText;

    public SearchOrderData(int orderNumber, String orderText) {
        this.orderNumber = orderNumber;
        this.orderText = orderText;
    }

    public int getOrderNumber() {
        return orderNumber;
    }

    public String getOrderText() {
        return orderText;
    }
}
