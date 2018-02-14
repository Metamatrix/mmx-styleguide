(function(app, $) {
	$.enhancer("loginForm", function() {

		var loginType = $(this).find("select"),
			ssn = $("#LoginViewModel_PersonalNumber"),
			ssnWrapper = ssn.closest(".collapse");

		// Hide and show social security nr field depending on the type of bankid selected 
		loginType.on("change", function() {

			if ($(this).val() === "1") {
				ssnWrapper.collapse("hide");
			} else {
				ssnWrapper.collapse("show");
			}

		});

		// Set mobile bank id as default if using a small screen
		if (Modernizr.mq("(max-width:767px)")) {
			loginType.val("0");
			ssnWrapper.collapse("show");
		}
		else if (Modernizr.mq("(min-width:768px)")) {
			ssnWrapper.removeClass("in");
		}
	});
})(Application, jQuery);
