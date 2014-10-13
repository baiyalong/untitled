/**
 * Created by yalong on 2014/10/11.
 */
"use strict";

app.ajax = {
    get: function (config) {
        $.get(config.url, function (data, status, xhr) {
            status == "success" ? config.callback(data) : alert(status + data);
        });
    },
    post: function (config) {
        $.post(config.url, config.data, function (data, status, xhr) {
            status == "success" ? config.callback(data) : alert(status + data);
        });
    },
    put: function (config) {
        $.ajax({
            url: config.url,
            type: "PUT",
            success: function (data, status, xhr) {
                config.callback(data);
            },
            error: function (xhr, status, error) {
                alert(status + error);
            }
        });
    },
    remove: function (config) {
        $.ajax({
            url: config.url,
            type: "DELETE",
            success: function (data, status, xhr) {
                config.callback(data);
            },
            error: function (xhr, status, error) {
                alert(status + error);
            }
        });
    }
}