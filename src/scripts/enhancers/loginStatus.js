(function ($, win) {
    "use strict";

    var serviceUrl = "",
        bankIdUrl = "",
        pollDelay = 1000,
        autostart = false,
        polling = false,
        loginType = "1",
        interval,
        startButtonDelay = 5;

    function updateStatus() {

        if (!polling) {

            polling = true;

            $.ajax({
                cache: false,
                data: "loginType=" + loginType,
                url: serviceUrl,
                dataType: "json",
                success: statusReceived,
                error: function () {
                    polling = false;
                }
            });
        };
    }

    function tryStartBankIdApp() {
        location.href = bankIdUrl;
    }

    function statusReceived(response) {

        if (response.ReturnUrl) {
            win.clearInterval(interval);
            $("#autostart-wrapper").addClass("hidden");
        }

        if (response.ReturnUrl) {
            win.setTimeout(function () {
                    location.href = response.ReturnUrl;
                }, pollDelay);
        }

        if (response.Message) {
            $("#login-status").text(response.Message);
        }

        if (response.Error) {
            $("#login-status-container").hide();
            $("#login-error-container").show();
            $("#login-error").text(response.Message);
        }
        if (response.CancelPoll) {
            clearInterval(interval);
        }
        polling = false;
    }

    $.enhancer("loginStatus", function () {

        var element = $(this);

        serviceUrl = element.data("service-url");
        bankIdUrl = element.data("bankid-url");
        autostart = element.data("autostart");
        loginType = element.data("logintype");

        if (element.data("startbutton-delay")) {
            startButtonDelay = Number(element.data("startbutton-delay"));
        }

        interval = win.setInterval(updateStatus, pollDelay);

        if (autostart) {
            setTimeout(tryStartBankIdApp, 1000);
            setTimeout(function () {
                $("#autostart-wrapper").removeClass("hidden");
            }, startButtonDelay * 1000);
        }

        $("#btn-start-bankid").on("click", function () {
            $(this).attr("disabled", "disabled");
        });

    });

})(jQuery, window);
