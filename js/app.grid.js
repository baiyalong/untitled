/**
 * Created by yalong on 2014/10/11.
 */
"use strict";

app.grid = {
    init: function (config) {
        this.refresh(config);
        $(config.refresh.trigger).click(this.refresh(config.get));
        $(config.add.trigger).click(this.add(config.add));
        //$(config.update.trigger).each(function (index, element) {
        //    element.click(this.update());
        //});
        $(config.remove.trigger).each(function (index, element) {
            element.click(this.remove(config.remove, element));
        });
    },
    refresh: function (config) {
        this.get(config);
    },
    get: function (config) {
        app.ajax.get({
            url: config.url,
            data: null,
            callback: function (data) {
                $(config.target).empty();
                $(config.target).append(this.thead(config.thead));
                $.each(data, function (index, element) {
                    $(config.target).append(this.tbody(config.tbody, index, element));
                });
            }
        });
    },
    add: function (config) {
        app.ajax.post({
            url: config.url,
            data: config.data(),
            callback: function (data) {
                this.refresh();
            }
        });
    },
    update: function (config) {
        app.ajax.put({
            url: config.url,
            data: config.data(),
            callback: function (data) {
                this.refresh();
            }
        });
    },
    remove: function (config, element) {
        var id = element.closest("td").siblings(config.id);
        app.ajax.remove({
            url: config.url.replace("{id}", id),
            data: null,
            callback: function (data) {
                this.refresh();
            }
        });
    },
    thead: function (config) {
        var tr = "<tr>";
        $.each(config, function (index, element) {
            var th = "<th>" + element + "</th>";
            tr += th;
        });
        tr += "</tr>";
        return tr;
    },
    tbody: function (config, index, element) {
        var tr = "<tr>";
        config.callback(index, element);
        tr += "</tr>";
        return tr;
    }
}