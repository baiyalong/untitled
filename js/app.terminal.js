/**
 * Created by yalong on 2014/10/11.
 */
"use strict";

app.terminal = {
    init: function () {
        app.grid.init(app.terminal.config);


    }
};


app.terminal.config = {
    refresh: {
        trigger: "#app-terminal-refresh"
    },
    add: {
        trigger: "",
        data: function () { }
    },
    remove: {},
    get: {
        trigger: "",
        url: "/api/terminal/",
        target: "#app-terminal-table",
        thead: ["��ʶ", "����", "����", "����", "����"],
        tbody: {
            callback: function (index, element) {
                var tr;
                tr += "<td>" + element.id + "</td>";


                return tr;
            }
        }
    }
};
