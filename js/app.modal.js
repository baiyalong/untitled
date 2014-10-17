/**
 * Created by yalong on 2014/10/11.
 */
"use strict";

app.modal = {
    init: function (config) {
        var modal = "<div class='modal fade' id={id} tabindex='-1' role='dialog' aria-labelledby={label} aria-hidden='true'>{content}</div>";
        modal = modal.replace("{id}", "app-{module}-modal".replace("{module}", config.prefix))
                     .replace("{label}", "app-{module}-modal-lable".replace("{module}", config.prefix))
                     .replace("{content}", "<div class='modal-dialog'><div class='modal-content'>{header}{body}{footer}</div><div>")
                     .replace("{header}", "<div class='modal-header'>" +
                                          "<button type='button' class='close' data-dismiss='modal'>" +
                                          "<span aria-hidden='true'>&times;</span>" +
                                          "<span class='sr-only'>Close</span>" +
                                          "</button>" +
                                          "<h4 class='modal-title' id={label}>{title}</h4>" +
                                          "</div>")
                                          .replace("{label}", "app-{module}-modal-lable".replace("{module}", config.prefix))
                                          .replace("{title}", config.name)
                     .replace("{body}", app.modal.form(config))
                     .replace("{footer}", "<div class='modal-footer'>" +
                                          "<button type='button' class='btn btn-default'><span class='glyphicon glyphicon-floppy-disk'></span></button>" +
                                          "</div>");
        $("#app-{module}-table".replace("{module}", config.prefix)).after(modal);
    },
    form: function (config) {
        var body = "<div class='modal-body'><form class='form-horizontal' role='form'>";
        $.each(config.property, function (index, element) {
            var item = "<div class='form-group>" +
                       "<label for={id} class='col-sm-2 control-label'>{name}</label>" +
                       "<div class='col-sm-10'>" +
                       "<input type={type} class='form-control' id={id}>" +
                       "</div></div>";
            item = item.replace("{id}", "app-{module}-modal-input-{code}".replace("{module}", config.prefix).replace("{code}", element.code))
                       .replace("{name}", element.name)
                       .replace("{type}", element.type);
            body += item;
        });
        body += "</form></div>";
        return body;
    },
    data: function (config) {
        var data;
        $.each(config.property, function (index, element) {
            var value = $("#app-{module}-modal-input-{code}".replace("{module}", config.prefix).replace("{code}", element.code)).val();
            element.validate(value) ? data[element.code] = value : (function () { return null; })();
        });
        return data;
    },
    add: function (config) {
        var data = app.modal.data(config);
        data ?
        app.ajax.add({
            url: config.url,
            data: data,
            callback: function (data) {
                app.table.get(config);
            }
        }) : null;
    },
    update: function (config, id) {
        var data = app.modal.data(config);
        data ?
        app.ajax.update({
            url: config.url + id,
            data: data,
            callback: function (data) {
                app.table.get(config);
            }
        }) : null;
    },
    show: function (config, trigger, id) {
        $("#app-{module}-modal".replace("{module}", config.prefix)).modal({

        });
        $("#app-{module}-modal-submit".replace("{module}", config.prefix)).die().live("click", function () {
            app.modal[trigger](config, id);
        });
    }

}



