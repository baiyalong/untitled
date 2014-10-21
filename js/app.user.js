/**
 * Created by yalong on 2014/10/11.
 */
"use strict";


app.userGroup = {
    config: {
        url: "/api/userGroup/"
    },
    refresh: function (data) {
        app.ajax.get({
            url: app.userGroup.config.url,
            data: data,
            callback: function (data) {
                $("#app-userGroup-table tbody").empty();
                $.each(data, function (index, element) {
                    var tr = "<tr><td>id</td><td>name</td><td>description</td><td>method</td></tr>"
                                        .replace("id", element.iD)
                                        .replace("name", element.name)
                                        .replace("description", element.description)
                                        .replace("method",
                                                        "<div class='btn-group'>" +
                                                            "<button type='button' class='btn btn-default app-userGroup-trigger-update'><span class='glyphicon glyphicon-edit'></span></button>" +
                                                            "<button type='button' class='btn btn-default app-userGroup-trigger-remove'><span class='glyphicon glyphicon-remove'></span></button>" +
                                                            "<button type='button' class='btn btn-default app-userGroup-trigger-getUser'><span class='glyphicon glyphicon-forward'></span></button>" +
                                                        "</div>"
                                        );
                    $("#app-userGroup-table tbody").append(tr);
                })
            }
        });
    },
    search: function (data) {
        app.userGroup.refresh(data);
    },
    get: function (id, callback) {
        app.ajax.get({
            url: app.userGroup.config.url + id,
            callback: function (data) {
                callback(data);
            }
        })
    },
    add: function () {
        app.ajax.post({
            url: app.userGroup.config.url,
            data: app.userGroup.formData(),
            callback: function (data) {
                app.userGroup.refresh();
                app.userGroup.formClear();

            }
        });
    },
    remove: function (id) {
        app.ajax.remove({
            url: app.userGroup.config.url + id,
            callback: function (data) {
                app.userGroup.refresh();
            }
        });
    },
    update: function (id) {
        app.ajax.put({
            url: app.userGroup.config.url + id,
            data: app.userGroup.formData(),
            callback: function (data) {
                app.userGroup.refresh();
                app.userGroup.formClear();
            }
        });
    },
    formClear: function () {
        $("#app-userGroup-input-id").val("");
        $("#app-userGroup-input-name").val("");
        $("#app-userGroup-input-description").val("");
    },
    formSet: function (data) {
        $("#app-userGroup-input-id").val(data.iD);
        $("#app-userGroup-input-name").val(data.name);
        $("#app-userGroup-input-description").val(data.description);
    },
    formData: function () {
        return {
            name: $("#app-userGroup-input-name").val(),
            description: $("#app-userGroup-input-description").val()
        }
    },
    userGet: function (id) {

        var data1, data2, data3 = new Array();
        app.ajax.get({
            url: "/api/userGroup/{id}/user".replace("{id}", id),
            callback: function (d1) {
                data1 = d1;

                $("#app-user-table tbody").empty();
                app.user.tableFill(data1);
                $(".app-user-trigger-userAdd").css("display", "none");
                $(".app-user-trigger-userRemove").css("display", "inline");

                app.ajax.get({
                    url: "/api/user".replace("{id}", id),
                    callback: function (d2) {
                        data2 = d2;

                        $.each(data2, function (index2, element2) {
                            var flag = true;
                            $.each(data1, function (index1, element1) {
                                element1.iD != element2.iD ? null : flag = false;
                            });
                            flag ? data3.push(element2) : null;
                        })

                        app.user.tableFill(data3);
                    }
                });
            }
        });

    }
}


//refresh
$("header").load("/index.html header", function () {
    app.userGroup.refresh();
});
$("#app-userGroup-trigger-refresh").on("click", function () {
    app.userGroup.refresh();
});

//add
$("#app-userGroup-trigger-add").on("click", function () {
    app.userGroup.formClear();
    $("#app-userGroup-submit-update").css("display", "none");
    $("#app-userGroup-submit-add").css("display", "inline");
});
$("#app-userGroup-submit-add").on("click", function () {
    app.userGroup.add();
    $("#app-userGroup-submit-update").css("display", "none");
    $("#app-userGroup-submit-add").css("display", "none");
});

//remove
$("#app-userGroup-table tbody").on("click", ".app-userGroup-trigger-remove", function () {
    var id = $(this).closest("tr").children().first().text();
    app.userGroup.remove(id);
});

//update
$("#app-userGroup-table tbody").on("click", ".app-userGroup-trigger-update", function () {
    var id = $(this).closest("tr").children().first().text();
    app.userGroup.get(id, function (data) { app.userGroup.formSet(data); });
    $("#app-userGroup-submit-update").css("display", "inline");
    $("#app-userGroup-submit-add").css("display", "none");
});
$("#app-userGroup-submit-update").on("click", function () {
    var id = $("#app-userGroup-input-id").val();
    app.userGroup.update(id);
    $("#app-userGroup-submit-update").css("display", "none");
    $("#app-userGroup-submit-add").css("display", "none");
});

//>>
$(document).on("click", ".app-userGroup-trigger-getUser", function () {
    var id = $(this).closest("tr").children().first().text();
    $("#userGroupID").text(id);

    app.userGroup.userGet(id);
});
//search
$("#app-userGroup-submit-search").on("click", function () {
    var search = $("#app-userGroup-input-search").val();
    app.userGroup.search({
        search: search
    });
});


app.user = {
    config: {
        url: "/api/user/"
    },
    refresh: function (data) {
        app.ajax.get({
            url: app.user.config.url,
            data: data,
            callback: function (data) {
                $("#userGroupID").empty();
                $("#app-user-table tbody").empty();
                app.user.tableFill(data);
                $(".app-user-trigger-userAdd").css("display", "none");
            }
        });
    },
    search: function (data) { app.user.refresh(data) },
    tableFill: function (data) {
        $.each(data, function (index, element) {
            var tr = "<tr><td>id</td><td>name</td><td>email</td><td>tel</td><td>method</td></tr>"
                                .replace("id", element.iD)
                                .replace("name", element.name)
                                .replace("email", element.email)
                                .replace("tel", element.phoneNumber)
                                .replace("method",
                                                "<div class='btn-group'>" +
                                                    "<button type='button' class='btn btn-default app-user-trigger-update'><span class='glyphicon glyphicon-edit'></span></button>" +
                                                    "<button type='button' class='btn btn-default app-user-trigger-remove'><span class='glyphicon glyphicon-remove'></span></button>" +
                                                    "<button style='display:inline' type='button' class='btn btn-default app-user-trigger-userAdd'><span class='glyphicon glyphicon-plus'></span></button>" +
                                                    "<button style='display:none' type='button' class='btn btn-default app-user-trigger-userRemove'><span class='glyphicon glyphicon-minus'></span></button>" +
                                                "</div>"
                                );
            $("#app-user-table tbody").append(tr);
        })
    },
    get: function (id, callback) {
        app.ajax.get({
            url: app.user.config.url + id,
            callback: function (data) {
                callback(data);
            }
        })
    },
    add: function () {
        app.ajax.post({
            url: app.user.config.url,
            data: app.user.formData(),
            callback: function (data) {
                app.user.refresh();
                app.user.formClear();

            }
        });
    },
    remove: function (id) {
        app.ajax.remove({
            url: app.user.config.url + id,
            callback: function (data) {
                app.user.refresh();
            }
        });
    },
    update: function (id) {
        app.ajax.put({
            url: app.user.config.url + id,
            data: app.user.formData(),
            callback: function (data) {
                app.user.refresh();
                app.user.formClear();
            }
        });
    },
    formClear: function () {
        $("#app-user-input-id").val("");
        $("#app-user-input-name").val("");
        $("#app-user-input-password").val("");
        $("#app-user-input-email").val("");
        $("#app-user-input-tel").val("");
    },
    formSet: function (data) {
        $("#app-user-input-id").val(data.iD);
        $("#app-user-input-name").val(data.name);
        $("#app-user-input-password").val(data.password);
        $("#app-user-input-email").val(data.email);
        $("#app-user-input-tel").val(data.phoneNumber);
    },
    formData: function () {
        return {
            name: $("#app-user-input-name").val(),
            password: $("#app-user-input-password").val(),
            email: $("#app-user-input-email").val(),
            phoneNumber: $("#app-user-input-tel").val()
        }
    }
};


//refresh
$("header").load("/index.html header", function () {
    app.user.refresh();
});
$("#app-user-trigger-refresh").on("click", function () {
    app.user.refresh();
});

//add
$("#app-user-trigger-add").on("click", function () {
    app.user.formClear();
    $("#app-user-submit-update").css("display", "none");
    $("#app-user-submit-add").css("display", "inline");
});
$("#app-user-submit-add").on("click", function () {
    app.user.add();
    $("#app-user-submit-update").css("display", "none");
    $("#app-user-submit-add").css("display", "none");
});

//remove
$("#app-user-table tbody").on("click", ".app-user-trigger-remove", function () {
    var id = $(this).closest("tr").children().first().text();
    app.user.remove(id);
});

//update
$("#app-user-table tbody").on("click", ".app-user-trigger-update", function () {
    var id = $(this).closest("tr").children().first().text();
    app.user.get(id, function (data) { app.user.formSet(data); });
    $("#app-user-submit-update").css("display", "inline");
    $("#app-user-submit-add").css("display", "none");
});
$("#app-user-submit-update").on("click", function () {
    var id = $("#app-user-input-id").val();
    app.user.update(id);
    $("#app-user-submit-update").css("display", "none");
    $("#app-user-submit-add").css("display", "none");
});

//+
$(document).on("click", ".app-user-trigger-userAdd", function () {
    var uid = $(this).closest("tr").children().first().text();
    var gid = $("#userGroupID").text();
    app.ajax.post({
        url: "/api/userGroup/{gid}/user/{uid}".replace("{gid}", gid).replace("{uid}", uid),
        data: {},
        callback: function (data) {
            app.userGroup.userGet(gid);
        }
    });
});


//-
$(document).on("click", ".app-user-trigger-userRemove", function () {
    var uid = $(this).closest("tr").children().first().text();
    var gid = $("#userGroupID").text();
    app.ajax.remove({
        url: "/api/userGroup/{gid}/user/{uid}".replace("{gid}", gid).replace("{uid}", uid),
        callback: function (data) {
            app.userGroup.userGet(gid);
        }
    });
});

//search
$("#app-user-submit-search").on("click", function () {
    var search = $("#app-user-input-search").val();
    app.user.search({
        search: search
    });
});



//app.user = {
//    init: function () {
//        app.module.init(app.user.config);
//    },
//    config: [{
//        name: "命令",
//        prefix: "command",
//        url: "/api/command/",
//        property: [
//            {
//                name: "ID",
//                code: "iD",
//                validate: function (input) {
//                    return true;
//                }
//            },
//            {
//                name: "用户名",
//                code: "name",
//                validate: function (input) {
//                    return true;
//                }
//            }
//        ],
//        method: {
//            add: {

//            },
//            remove: {

//            },
//            update: {

//            },
//            get: {

//            }
//        }

//    }]
//};

