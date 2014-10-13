/**
 * Created by yalong on 2014/10/11.
 */
"use strict";


app.nav = {
    init: function (config) {
        $.each(config.event, function (index, element) {
            $(element.trigger).click(function () {
                $(config.target).load(element.html, function (data, status, xhr) {
                    status != "success" ? alert(status + data) : function () {
                        element.func();
                    };
                });
            });
        });
    }
};


app.nav.config = {
    target: "#app-content",
    event: [
        {
            trigger: "#app-user",
            html: "app.user.html",
            func: app.user.init
        },
        {
            trigger: "#app-terminal",
            html: "app.terminal.html",
            func: app.terminal.init
        },
        {
            trigger: "#app-command",
            html: "app.command.html",
            func: app.command.init
        }
    ]
};


$(function () {
    app.nav.init(app.nav.config);
});
