/**
 * Created by yalong on 2014/10/11.
 */
"use strict";

app.module = {
    init: function (config) {
        $.each(config, function (index, element) {
            app.table.init(element);
            ("add" in element.method || "update" in element.method) ? app.modal.init(element) : null;
        });
    }
}



