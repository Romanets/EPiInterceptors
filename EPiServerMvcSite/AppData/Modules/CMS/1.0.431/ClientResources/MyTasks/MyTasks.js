(function ($, epi) {
    epi.myTasks = function () {
        var temp = {};

        temp.init = function (e, context) {
            $(this).bind("epigadgetloaded", viewLoaded);
        };

        var viewLoaded = function (e, context) {
            $(".epi-toolTip", this).epiToolTip();

            if ($("input[name=DueDate]", this).length) {
                dojo.require('dijit.form.DateTextBox');
                var inputTextBox = $("input[name=DueDate]", this)[0];
                new dijit.form.DateTextBox({ name: inputTextBox.name }, inputTextBox.id);
            }

            $("a[href*='#AddTask']", this).click(function () {
                context.loadView({ action: "AddTask" });
                return false;
            });
        };

        return temp;
    } ();
} (epiJQuery, epi));