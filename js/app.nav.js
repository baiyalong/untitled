/**
 * Created by yalong on 2014/10/11.
 */
"use strict";


app.nav = {
    init: function (config) {
        $.each(config.event, function (index, element) {
            $(element.trigger).click(function () {
                element.init();
            });
        });
    }
};


app.nav.config = {
    event: [
        {
            trigger: "#app-user",
            init: app.user.init
        },
        {
            trigger: "#app-terminal",
            init: app.terminal.init
        },
        {
            trigger: "#app-command",
            init: app.command.init
        }
    ]
};


$(function () {
    app.nav.init(app.nav.config);
});
