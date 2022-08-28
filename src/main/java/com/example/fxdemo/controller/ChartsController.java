package com.example.fxdemo.controller;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.Priority;
import javafx.scene.layout.VBox;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;

public class ChartsController {

    @FXML
    public AnchorPane chartsAnchorPane;
    @FXML
    WebView webView;

    @FXML
    Label chartsLabel;

    @FXML
    VBox chartsVbox;

    @FXML
    public void initialize() {
        VBox.setVgrow(chartsAnchorPane, Priority.ALWAYS);
        //设置webview
        WebEngine webEngine = webView.getEngine();
        webEngine.load(this.getClass().getResource("/html/charts.html").toExternalForm());
    }


}
