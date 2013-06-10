require(["epi", "epi/i18n!epi/shell/nls/episerver.shell.resources.texts"], function (epi, res) {

    (function ($) {

        epi.quickLinks = function () {

            // object returned by function. Exposes public methods and variables.
            var pub = {};

            pub.init = function (e, gadgetInstance) {

                var enableDisableInput = function (e) {
                    $(this).closest("table").find("input").attr("readonly", "readonly").removeClass("epi-quickLinksActiveInput")
                    $(this).closest("tr").find("input").attr("readonly", "").addClass("epi-quickLinksActiveInput");
                };

                var hoverInputIn = function (e) {
                    $(this).closest("tr").find("input").attr("readonly", "").addClass("epi-quickLinksHoverInput");
                };

                var hoverInputOut = function (e) {
                    $(this).closest("tr").find("input").attr("readonly", "").removeClass("epi-quickLinksHoverInput");
                };

                var deleteLink = function (e) {
                    var row = $(this).closest("tr").addClass("epi-noDisplay");
                    row.find("input:text").addClass("deletedLink").removeClass("required");
                    row.find("input:hidden[name*=IsDeleted]").attr("value", "true");
                };

                var addNewLink = function (e) {
                    var nextLinkIndexControl = $(this).closest(".epi-quickLinksEdit").find(".nextLinkIndex");
                    var table = $(this).closest(".epi-quickLinksEdit").find("table:first");
                    var gadgetInstance = $(this).data("gadgetInstance");
                    var url = gadgetInstance.getActionPath({ action: "LinkRow" });
                    var i = nextLinkIndexControl.attr("value");
                    $.get(url, { rowIndex: i }, function (data) {
                        table.find("tbody").append(data);
                        table.find("tbody tr:last").find("input[Name*=Text]").click().focus();
                        table.find("tbody tr:last").find("input").hover(hoverInputIn, hoverInputOut);
                        table.find("tbody tr:last").find("input[Name*=Url]").attr("value", "http://");
                    });

                    //Increment the new link index
                    nextLinkIndexControl.attr("value", ++i);
                };

                var bindEvents = function (e, gadgetInstance) {
                    $(".epi-quickLinks", this).epiCollapsiblePanel();
                    $("a.epi-quickLinksDelete", this).live("click", deleteLink);
                    $(".epi-quickLinksEdit tbody tr td input", this).live("click", enableDisableInput);
                    $(".epi-quickLinksEdit tbody tr td input", this).hover(hoverInputIn, hoverInputOut);
                    $(".epi-quickLinks-add a.epi-button-child-item", this)
                    .click(addNewLink)
                    .data("gadgetInstance", gadgetInstance);

                    $("form", this).validate({
                        ignore: ".deletedLink",
                        submitHandler: function (form) {
                            var data = $(form).serializeArray();
                            var message = res.saving;

                            gadgetInstance.ajax({
                                type: "POST",
                                url: gadgetInstance.getActionPath({ action: "Save" }),
                                data: data,
                                feedbackMessage: message,
                                success: function (e) {
                                    gadgetInstance.loadView();
                                }
                            });
                        }
                    });

                    //Replace the orginal url validation method with our own
                    jQuery.validator.addMethod("url", function (value, element) {
                        return this.optional(element) || /^((https?|ftp):[\/]{2,2}\w+)|(mailto:[^\/]+@)/.test(value);
                    });
                }

                // Listen to the view loaded event to set up bindings
                $(this).bind("epigadgetloaded", bindEvents);
            };

            return pub;

        } ();

    } (epiJQuery));
});