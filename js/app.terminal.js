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
        thead: [
            "ID",
            "用户ID",
            "设备IMEI",
            "手机号",
            "应用ID",
            "设备号",
            "操作系统类型",
            "操作系统版本号",
            "内核版本号",
            "设备名",
            "设备型号",
            "Wifi Mac地址",
            "蓝牙地址",
            "运营商",
            "电量",
            "手机总内存",
            "手机剩余内存",
            "SD卡总内存",
            "SD卡剩余内存"
            ],
        tbody: {
            callback: function (index, element) {
                var tr = "";
                tr += "<td>" + element.iD + "</td>";
                tr += "<td>" + element.user + "</td>";
                tr += "<td>" + element.iMEI + "</td>";
                tr += "<td>" + element.phoneNumber + "</td>";
                tr += "<td>" + element.appID + "</td>";
                tr += "<td>" + element.deviceSN + "</td>";
                tr += "<td>" + (function(){return element.oSType == 0 ? "Android" : "IOS";})() + "</td>";
                tr += "<td>" + element.oSVersion + "</td>";
                tr += "<td>" + element.kernelVersion + "</td>";
                tr += "<td>" + element.deviceName + "</td>";
                tr += "<td>" + element.deviceType + "</td>";
                tr += "<td>" + element.wifiMac + "</td>";
                tr += "<td>" + element.blueTooth + "</td>";
                tr += "<td>" + element.operator + "</td>";
                tr += "<td>" + element.power + "</td>";
                tr += "<td>" + element.totalRomSpace + "</td>";
                tr += "<td>" + element.availRomSpace + "</td>";
                tr += "<td>" + element.totalSDSpace + "</td>";
				tr += "<td>" + element.availSDSpace + "</td>";
                return tr;
            }
        }
    }
};
