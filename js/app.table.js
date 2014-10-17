/**
 * Created by yalong on 2014/10/11.
 */
"use strict";

app.table = {
    init: function (config) {
        var table = "<table class='table table-condensed table-hover' id='app-{module}-table'>{thead}</table>";
        table = table.replace("{module}", config.prefix).replace("{thead}", app.table.thead(config));
        $(app.table.config.target).append(table);
        app.table.get(config);
    },
    thead: function (config) {
        var tr = "<thead><tr>";
        $.each(config.property, function (index, element) {
            var th = "<th>{name}</th>";
            th = th.replace("{name}", element.name);
            tr += th;
        });
        var th = "<th>{trigger}</th>";
        th = th.replace("{trigger}", app.table.config.trigger.get +
            (function (config) {
                return "add" in config.method ? app.table.config.trigger.add : null;
            })(config));
        tr += th;
        tr += "</tr></thead>";
        return tr;
    },
    tbody: function (config, data) {
        var tbody = "<tbody>";
        $.each(data, function (index, element) {
            var tr = "<tr>";
            $.each(config.property, function (index2, element2) {
                var td = "<td>{value}</td>";
                td = td.replace("{value}", element[element2.code]);
                tr += td;
            });
            var td = "<td>{trigger}</td>";
            td = td.replace("{trigger}",
                (function (config) {
                    var trigger = "update" in config.method ? app.table.config.trigger.update : "";
                    trigger += "remove" in config.method ? app.table.config.trigger.remove : "";
                    return trigger;
                })(config));
            tr += td;
            tr += "</tr>";
            tbody += tr;
        });
        tbody += "</tbody>";
        return tbody;
    },
    get: function (config) {
        var tid = "#app-{module}-table".replace("{module}", config.prefix);
        app.ajax.get({
            url: config.url,
            callback: function (data) {
                $(tid).find("tbody").remove();
                $(tid).append(app.table.tbody(config, data));
            }
        });
    },
    remove: function () {

    },
    config: {
        target: "#app-content",
        trigger: {
            add: "",
            remove: "",
            update: "",
            get: ""
        },
    },

}



