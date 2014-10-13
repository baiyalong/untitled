/**
 * Created by yalong on 2014/10/11.
 */
"use strict";

app.command = {
    init: function () {
        this.refresh();
        $(this.config.ajaxEvent.add.trigger).click(this.add(this.config.ajaxEvent.add));
        $(this.config.ajaxEvent.update.trigger).each(function (index, element) {
            element.click(this.update(this.config.ajaxEvent.update, element));
        });
        $(this.config.ajaxEvent.remove.trigger).each(function (index, element) {
            element.click(this.remove(this.config.ajaxEvent.remove, element));
        });
    },

    getList: function (config) {
        $.get(config.path, function (data, status, xhr) {
            status == "success" ? function () {
                $(config.target).empty();
                $(config.target).append(config.head);
                $.each(data, function (index, element) {
                    $(config.target).append(config.tr(index, element));
                });
            } : alert(status + data)
        });
    },

    refresh: function () {
        this.getList(app.command.config.ajaxEvent.getList);
    },

    add: function (config) {
        var data = {
            code: $(config.form.code).val(),
            description: $(config.form.description).val()
        };
        $.post(config.path, data, function (data, status, xhr) {
            status == "success" ? function () {
                this.refresh();
            } : alert(status + data);
        });
    },

    update: function (config, element) {

    },

    remove: function (config, element) {
        var id = element.closest("td").siblings(config.id);
        $.ajax({
            url: config.path.replace("{id}", id),
            type: "DELETE",
            success: function (data, status, xhr) {
                this.refresh();
            },
            error: function (xhr, status, error) {
                alert(status + error);
            }
        });
    }
};


app.command.config = {
    ajaxEvent: {
        add: {
            path: "/api/command/",
            trigger: "#app-command-submit",
            form: {
                code: "#app-command-input-code",
                description: "#app-command-input-description"
            }
        },
        remove: {
            path: "/api/command/{id}",
            trigger: ".app-command-delete",
            id: ".app-command-id"
        },
        update: {
            path: "/api/command/{id}",
            trigger: ".app-command-update"
        },
        get: {
            path: "/api/command/{id}"
        },
        getList: {
            path: "/api/command",
            target: "#app-command-list",
            head: "<tr>" +
                "<th>序号</th>" +
                "<th>标识</th>" +
                "<th>编码</th>" +
                "<th>描述</th>" +
                "<th>操作</th>" +
                "</tr>",
            tr: function (index, element) {
                return "<tr>" +
                    "<td>" + index + "</td>" +
                    "<td class='app-command-id'>" + element.id + "</td>" +
                    "<td>" + element.code + "</td>" +
                    "<td>" + element.description + "</td>" +
                    "<td>" +
                    "<div class='btn-group'>" +
                    "<button class='app-command-update' type='button' class='btn btn-default'><span class='glyphicon glyphicon-edit'></span></button>" +
                    "<button class='app-command-delete' type='button' class='btn btn-default'><span class='glyphicon glyphicon-remove'></span></button>" +
                    "</div>" +
                    "</td>" +
                    "</tr>";
            }
        }
    }
};
