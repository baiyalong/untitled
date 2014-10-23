/**
 * Created by yalong on 2014/10/11.
 */
"use strict";

$(function () {
    app.login = {
        login: function () {
            $("#app-login-submit").on("click", function () {
                app.ajax.post({
                    url: "/api/login/",
                    data: {
                        userName: $("#app-login-input-name").val(),
                        password: $("#app-login-input-password").val()
                    },
                    callback: function (data) {
                        app.auth.set(data.token);
                        app.auth.setUserName(data.userName);
                        window.location.href = "/index.html";
                    }
                });
            });
        }
    }

    $(function () {
        app.auth.clear();
        app.login.login();
    });
});

