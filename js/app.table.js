/**
 * Created by yalong on 2014/10/11.
 */
"use strict";

app.table = {
    init: function (config) {
        var table = "<table class='table table-condensed table-hover' id='app-{module}-table'>{thead}</table>";
        table = table.replace("{module}", config.prefix).replace("{thead}", this.thread(config));
        $(this.config.target).append(table);
        this.get(config);
    },
    thead: function (config) {
        var tr = "<tr>";
        $.each(config.property, function (index, element) {
            var th = "<th>{name}</th>";
            th = th.replace("{name}", element.name);
            tr += th;
        });
        var th = "<th>{trigger}</th>";
        th = th.replace("{trigger}", this.config.trigger.get +
            (function (config) {
                return "add" in config.method ? this.config.trigger.add : null;
            })(config));
        tr += th;
        tr += "</tr>";
        return tr;
    },
    tbody: function (config, data) {
        var tbody = "";
        $.each(data, function (index, element) {
            var tr = "<tr>";
            $.each(config.property, function (index2, element2) {
                var td = "<td>{value}<td>";
                td = td.replace("{value}", element[element2.code]);
                tr += td;
            });
            var td = "<td>{trigger}</td>";
            td = td.replace("{trigger}",
                (function (config) {
                    var trigger = "update" in config.method ? this.config.trigger.update : "";
                    trigger += "remove" in config.method ? this.config.trigger.remove : "";
                    return trigger;
                })(config));
            tr += td;
            tr += "</tr>";
            tbody += tr;
        });
        return tbody;
    },
    get: function (config) {
        //empty
        app.ajax.get({
            url: cofig.url,
            callback: function (config, data) {
                $("#app-{module}-table".replace("{module}", config.prefix)).append(tbody(config, data));
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



