/**
 * Created by yalong on 2014/10/11.
 */
"use strict";

app.command = {
    init: function () {
        app.module.init(app.command.config);
    },
    config: [{
        name: "命令",
        prefix: "command",
        url: "/api/command/",
        property: [
            {
                name: "编码",
                code: "code",
                validate: function (input) {
                    return true;
                }
            },
            {
                name: "描述",
                code: "description",
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
}

