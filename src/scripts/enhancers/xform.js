(function ($) {

	"use strict";

	$.enhancer("xform", function() {
		var form = $(this);

		form.find("select").wrap("<div class=\"select-wrapper\">").after("<span class=\"caret\">");

		form.find(".orientationVertical :radio").after("<span class=\"input-control\">")
			.parent().wrap("<div class=\"radio styled-radio styled-input-default\">");
		
		form.find(".orientationHorizontal :radio").after("<span class=\"input-control\">")
			.parent().wrap("<div class=\"radio-inline styled-radio-inline styled-input-default\">");

		form.find(".orientationVertical :checkbox").after("<span class=\"input-control\">")
			.parent().wrap("<div class=\"checkbox styled-checkbox styled-input-default\">");		

		form.find(".orientationHorizontal :checkbox").after("<span class=\"input-control\">")
			.parent().wrap("<div class=\"checkbox-inline styled-checkbox-inline styled-input-default\">");

		form.find(".field-validation-error").prev('input').addClass("input-validation-error");

		form.find("input[type=submit]").addClass("btn btn-submit");

		// Scroll to the form if the form isn't valid
		if (!form.data("form-valid")) {

			location.hash = form.data("form-id");
		}

		var qs = $.queryString.parse(decodeURIComponent(location.search));

		if(qs.trip) {
			form.find('[name=TripName]').val(unescape(qs.trip));
		}

	});

})(jQuery);
