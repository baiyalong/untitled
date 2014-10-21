/**
 * Created by yalong on 2014/10/11.
 */
"use strict";

$(function () {
    app.terminal = {
        config: {
            url: "/api/terminal/"
        },
        refresh: function (data) {
            app.ajax.get({
                url: app.terminal.config.url,
                data: data,
                callback: function (data) {
                    $("#app-terminal-table tbody").empty();
                    $.each(data, function (index, element) {
                        var tr = "<tr>" +
                            "<td>" + element.iD + "</td>" +
                            "<td>" + element.user + "</td>" +
                            "<td>" + element.iMEI + "</td>" +
                            "<td>" + element.phoneNumber + "</td>" +
                            "<td>" + element.appID + "</td>" +
                            "<td>" + element.deviceSN + "</td>" +
                            "<td>" + element.oSType + "</td>" +
                            "<td>" + element.oSVersion + "</td>" +
                            "<td>" + element.kernelVersion + "</td>" +
                            "<td>" + element.deviceName + "</td>" +
                            "<td>" + element.deviceType + "</td>" +
                            "<td>" + element.wifiMac + "</td>" +
                            "<td>" + element.blueTooth + "</td>" +
                            "<td>" + element.operator + "</td>" +
                            "<td>" + element.power + "</td>" +
                            "<td>" + element.totalRomSpace + "</td>" +
                            "<td>" + element.availRomSpace + "</td>" +
                            "<td>" + element.totalSDSpace + "</td>" +
                            "<td>" + element.availSDSpace + "</td>" +
                            "<td>method</td>" +
                            "</tr>";
                        tr = tr.replace("method",
                            "<div class='btn-group'>" +
                                // "<button type='button' class='btn btn-default app-terminal-trigger-update'><span class='glyphicon glyphicon-edit'></span></button>" +
                                "<button type='button' class='btn btn-default app-terminal-trigger-remove'><span class='glyphicon glyphicon-remove'></span></button>" +
                            "</div>"
                            );
                        $("#app-terminal-table tbody").append(tr);
                    })
                }
            });
        },
        search: function (data) {
            app.terminal.refresh(data);
        },
        get: function (id, callback) {
            app.ajax.get({
                url: app.terminal.config.url + id,
                callback: function (data) {
                    callback(data);
                }
            })
        },
        add: function () {
            app.ajax.post({
                url: app.terminal.config.url,
                data: app.terminal.formData(),
                callback: function (data) {
                    app.terminal.refresh();
                    app.terminal.formClear();

                }
            });
        },
        remove: function (id) {
            app.ajax.remove({
                url: app.terminal.config.url + id,
                callback: function (data) {
                    app.terminal.refresh();
                }
            });
        },
        update: function (id) {
            app.ajax.put({
                url: app.terminal.config.url + id,
                data: app.terminal.formData(),
                callback: function (data) {
                    app.terminal.refresh();
                    app.terminal.formClear();
                }
            });
        },
        formClear: function () {
            $("#app-terminal-input-id").val("");
            $("#app-terminal-input-code").val("");
            $("#app-terminal-input-description").val("");
        },
        formSet: function (data) {
            $("#app-terminal-input-id").val(data.iD);
            $("#app-terminal-input-code").val(data.code);
            $("#app-terminal-input-description").val(data.description);
        },
        formData: function () {
            return {
                code: $("#app-terminal-input-code").val(),
                description: $("#app-terminal-input-description").val()
            }
        }
    };


    //refresh
    $("header").load("/index.html header", function () {
        app.terminal.refresh();
    });
    $("#app-terminal-trigger-refresh").on("click", function () {
        app.terminal.refresh();
    });

    //add
    $("#app-terminal-trigger-add").on("click", function () {
        app.terminal.formClear();
        $("#app-terminal-submit-update").css("display", "none");
        $("#app-terminal-submit-add").css("display", "inline");
    });
    $("#app-terminal-submit-add").on("click", function () {
        app.terminal.add();
        $("#app-terminal-submit-update").css("display", "none");
        $("#app-terminal-submit-add").css("display", "none");
    });

    //remove
    $("#app-terminal-table tbody").on("click", ".app-terminal-trigger-remove", function () {
        var id = $(this).closest("tr").children().first().text();
        app.terminal.remove(id);
    });

    //update
    $("#app-terminal-table tbody").on("click", ".app-terminal-trigger-update", function () {
        var id = $(this).closest("tr").children().first().text();
        app.terminal.get(id, function (data) { app.terminal.formSet(data); });
        $("#app-terminal-submit-update").css("display", "inline");
        $("#app-terminal-submit-add").css("display", "none");
    });
    $("#app-terminal-submit-update").on("click", function () {
        var id = $("#app-terminal-input-id").val();
        app.terminal.update(id);
        $("#app-terminal-submit-update").css("display", "none");
        $("#app-terminal-submit-add").css("display", "none");
    });

    //search
    $("#app-terminal-submit-search").on("click", function () {
        var search = $("#app-terminal-input-search").val();
        app.terminal.search({
            search: search
        });
    });

});


//app.terminal = {
//    init: function () {
//        app.module.init(app.terminal.config);
//    },
//    config: [{
//        name:"终端",
//        prefix: "terminal",
//        url: "/api/terminal/",
//        property: [
//            { name: "ID", code: "iD", validate: function (input) { return true; } },
//            { name: "用户ID", code: "user" },
//            { name: "设备IMEI", code: "iMEI" },
//            { name: "手机号", code: "phoneNumber" },
//            { name: "应用ID", code: "appID" },
//            { name: "设备号", code: "deviceSN" },
//            { name: "操作系统类型", code: "oSType" },
//            { name: "操作系统版本号", code: "oSVersion" },
//            { name: "内核版本号", code: "kernelVersion" },
//            { name: "设备名", code: "deviceName" },
//            { name: "设备型号", code: "deviceType" },
//            { name: "Wifi Mac地址", code: "wifiMac" },
//            { name: "蓝牙地址", code: "blueTooth" },
//            { name: "运营商", code: "operator" },
//            { name: "电量", code: "power" },
//            { name: "手机总内存", code: "totalRomSpace" },
//            { name: "手机剩余内存", code: "availRomSpace" },
//            { name: "SD卡总内存", code: "totalSDSpace" },
//            { name: "SD卡剩余内存", code: "availSDSpace" },
//        ],
//        method: {
//            remove: {},
//            get: {}
//        }
//    }]
//};


