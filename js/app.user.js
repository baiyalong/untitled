/**
 * Created by yalong on 2014/10/11.
 */
"use strict";

app.user = {
    init: function () {
        app.module.init(app.user.config);
    },
    config: [{
        name: "命令",
        prefix: "command",
        url: "/api/command/",
        property: [
            {
                name: "ID",
                code: "iD",
                validate: function (input) {
                    return true;
                }
            },
            {
                name: "用户名",
                code: "name",
                validate: function (input) {
                    return true;
                }
            }
        ],
        method: {
            add: {

            },
            remove: {

            },
            update: {

            },
            get: {

            }
        }

    }]
};

