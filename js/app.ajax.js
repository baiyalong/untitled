/**
 * Created by yalong on 2014/10/11.
 */
"use strict";
var app = {};
app.ajax = {
    get: function (config) {
        app.ajax.ajax(config, "GET");
    },
    post: function (config) {
        app.ajax.ajax(config, "POST");
    },
    put: function (config) {
        app.ajax.ajax(config, "PUT");
    },
    remove: function (config) {
        app.ajax.ajax(config, "DELETE");
    },
    ajax: function (config, method) {
        $.ajax({
            url: config.url,
            type: method,
            data: config.data == null ? {} : config.data,
            headers: { Authorization: "Token " + app.auth.get() },
            success: function (data, status, xhr) {
                config.callback(data);
            },
            error: function (xhr, status, error) {
                alert(status + error);
                error == "Unauthorized" ? (function () {
                    window.location.href = "/app.login.html";
                })() : null;
            }
        });
    },
}

app.auth = {
    token: "token",
    userName: "userName",
    set: function (token) {
        sessionStorage.setItem(app.auth.token, token);
    },
    get: function () {
        return sessionStorage.getItem(app.auth.token);
    },
    clear: function () {
        if (app.auth.get() != null) {
            app.ajax.remove({
                url: "/api/logout",
                data: {},
                callback: function (data) { }
            });
            sessionStorage.clear();
        }
    },
    verify: function () {
        var login = "/app.login.html";
        var currentPath = window.location.pathname;
        if (login != currentPath && app.auth.get() == null) {
            window.location.href = login;
        }
    },
    setUserName: function (userName) {
        sessionStorage.setItem(app.auth.userName, userName);
    },
    getUserName: function () {
        return sessionStorage.getItem(app.auth.userName);
    }
}

$(function () {
    app.auth.verify();
    $("#app-userName").text(app.auth.getUserName());
});