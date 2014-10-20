/**
 * Created by yalong on 2014/10/11.
 */
"use strict";

$(function () {
    app.command = {
        config: {
            url: "/api/command/"
        },
        refresh: function () {
            app.ajax.get({
                url: app.command.config.url,
                callback: function (data) {
                    $("#app-command-table tbody").empty();
                    $.each(data, function (index, element) {
                        var tr = "<tr><td>id</td><td>code</td><td>description</td><td>method</td></tr>"
                                            .replace("id", element.iD)
                                            .replace("code", element.code)
                                            .replace("description", element.description)
                                            .replace("method",
                                                            "<div class='btn-group'>" +
                                                                "<button type='button' class='btn btn-default app-command-trigger-update'><span class='glyphicon glyphicon-edit'></span></button>" +
                                                                "<button type='button' class='btn btn-default app-command-trigger-remove'><span class='glyphicon glyphicon-remove'></span></button>" +
                                                            "</div>"
                                            );
                        $("#app-command-table tbody").append(tr);
                    })
                }
            });
        },
        get: function (id, callback) {
            app.ajax.get({
                url: app.command.config.url + id,
                callback: function (data) {
                    callback(data);
                }
            })
        },
        add: function () {
            app.ajax.post({
                url: app.command.config.url,
                data: app.command.formData(),
                callback: function (data) {
                    app.command.refresh();
                    app.command.formClear();

                }
            });
        },
        remove: function (id) {
            app.ajax.remove({
                url: app.command.config.url + id,
                callback: function (data) {
                    app.command.refresh();
                }
            });
        },
        update: function (id) {
            app.ajax.put({
                url: app.command.config.url + id,
                data: app.command.formData(),
                callback: function (data) {
                    app.command.refresh();
                    app.command.formClear();
                }
            });
        },
        formClear: function () {
            $("#app-command-input-id").val("");
            $("#app-command-input-code").val("");
            $("#app-command-input-description").val("");
        },
        formSet: function (data) {
            $("#app-command-input-id").val(data.iD);
            $("#app-command-input-code").val(data.code);
            $("#app-command-input-description").val(data.description);
        },
        formData: function () {
            return {
                code: $("#app-command-input-code").val(),
                description: $("#app-command-input-description").val()
            }
        }
    };


    //refresh
    $("header").load("/index.html header", function () {
        app.command.refresh();
    });
    $("#app-command-trigger-refresh").on("click", function () {
        app.command.refresh();
    });

    //add
    $("#app-command-trigger-add").on("click", function () {
        app.command.formClear();
        $("#app-command-submit-update").css("display", "none");
        $("#app-command-submit-add").css("display", "inline");
    });
    $("#app-command-submit-add").on("click", function () {
        app.command.add();
        $("#app-command-submit-update").css("display", "none");
        $("#app-command-submit-add").css("display", "none");
    });

    //remove
    $("#app-command-table tbody").on("click", ".app-command-trigger-remove", function () {
        var id = $(this).closest("tr").children().first().text();
        app.command.remove(id);
    });

    //update
    $("#app-command-table tbody").on("click", ".app-command-trigger-update", function () {
        var id = $(this).closest("tr").children().first().text();
        app.command.get(id, function (data) { app.command.formSet(data); });
        $("#app-command-submit-update").css("display", "inline");
        $("#app-command-submit-add").css("display", "none");
    });
    $("#app-command-submit-update").on("click", function () {
        var id = $("#app-command-input-id").val();
        app.command.update(id);
        $("#app-command-submit-update").css("display", "none");
        $("#app-command-submit-add").css("display", "none");
    });

});



//app.command = {
//    init: function () {
//        //app.module.init(app.command.config);
//        $(app.config.target).load("/app.command.html");

//        $("#app-command-trigger-refresh").on("click", function () {
//            app.command.get();
//        });
//        $("#app-command-trigger-add").on("click", function () {
//            $("#app-command-input-code").val();
//            $("#app-command-input-description").val();
//        });

//    },
//    get: function () {
//        app.ajax.get({
//            url: app.command.config.url,
//            callback: function (data) {
//                $.each(data, function (index, element) {
//                    var tr = "<tr><td>id</td><td>code</td><td>description</td><td>method</td></tr>"
//                    .replace("id", element.iD)
//                    .replace("code", element.code)
//                    .replace("description", element.description)
//                    .replace("method",
//                                    "<div class='btn-group'>" +
//                                        "<button type='button' class='btn btn-default app-command-trigger-update'><span class='glyphicon glyphicon-edit'></span></button>" +
//                                        "<button type='button' class='btn btn-default app-command-trigger-remove'><span class='glyphicon glyphicon-remove'></span></button>" +
//                                    "</div>"
//                    );
//                    $("#app-command-table tbody").empty().append(tr);
//                });
//            }
//        });
//    },
//    add: function () {

//    },
//    remove: function () {

//    },
//    update: function () {

//    },
//    config: {
//        url: "/app/command/",
//    }


//    //config: [{
//    //    name: "命令",
//    //    prefix: "command",
//    //    url: "/api/command/",
//    //    property: [
//    //        {
//    //            name: "编码",
//    //            code: "code",
//    //            validate: function (input) {
//    //                return true;
//    //            }
//    //        },
//    //        {
//    //            name: "描述",
//    //            code: "description",
//    //            validate: function (input) {
//    //                return true;
//    //            }
//    //        }
//    //    ],
//    //    method: {
//    //        add: {

//    //        },
//    //        remove: {

//    //        },
//    //        update: {

//    //        },
//    //        get: {

//    //        }
//    //    }

//    //}]
//}

