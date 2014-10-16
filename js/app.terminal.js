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
                return [
                element.iD ,
                element.user ,
                element.iMEI ,
                element.phoneNumber ,
                element.appID ,
                element.deviceSN ,
                (function(){return element.oSType == 0 ? "Android" : "IOS";})() ,
                element.oSVersion ,
                element.kernelVersion ,
                element.deviceName ,
                element.deviceType ,
                element.wifiMac ,
                element.blueTooth ,
                element.operator ,
                element.power ,
                element.totalRomSpace ,
                element.availRomSpace ,
                element.totalSDSpace ,
				element.availSDSpace ,
                ];
            }
        }
    }
};
