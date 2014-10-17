/**
 * Created by yalong on 2014/10/11.
 */
"use strict";

app.terminal = {
    init: function () {
        app.module.init(app.terminal.config);
    },
    config: [{
        name:"终端",
        prefix: "terminal",
        url: "/api/terminal/",
        property: [
            { name: "ID", code: "iD", validate: function (input) { return true; } },
            { name: "用户ID", code: "user" },
            { name: "设备IMEI", code: "iMEI" },
            { name: "手机号", code: "phoneNumber" },
            { name: "应用ID", code: "appID" },
            { name: "设备号", code: "deviceSN" },
            { name: "操作系统类型", code: "oSType" },
            { name: "操作系统版本号", code: "oSVersion" },
            { name: "内核版本号", code: "kernelVersion" },
            { name: "设备名", code: "deviceName" },
            { name: "设备型号", code: "deviceType" },
            { name: "Wifi Mac地址", code: "wifiMac" },
            { name: "蓝牙地址", code: "blueTooth" },
            { name: "运营商", code: "operator" },
            { name: "电量", code: "power" },
            { name: "手机总内存", code: "totalRomSpace" },
            { name: "手机剩余内存", code: "availRomSpace" },
            { name: "SD卡总内存", code: "totalSDSpace" },
            { name: "SD卡剩余内存", code: "availSDSpace" },
        ],
        method: {
            remove: {},
            get: {}
        }
    }]
};


