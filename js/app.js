/**
 * Created by yalong on 2014/10/11.
 */
"use strict";

var app = {};

app.config = {
    target: "#app-content"
}




$(function () {
    $.get("/api/terminal", function (data, status, xhr) {
        alert(status);
    });
});

