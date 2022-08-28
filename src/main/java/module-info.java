module com.example.fxdemo {
    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.web;

    requires org.controlsfx.controls;
    requires com.dlsc.formsfx;
    requires validatorfx;
    requires org.kordamp.ikonli.javafx;
    requires org.kordamp.bootstrapfx.core;
    requires eu.hansolo.tilesfx;

    opens com.example.fxdemo to javafx.fxml;
    exports com.example.fxdemo;
    exports com.example.fxdemo.controller;
    opens com.example.fxdemo.controller to javafx.fxml;
}