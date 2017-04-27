(function($) {
	"use strict";

	$.handler("scrollLink", function (e) {
	
		e.preventDefault();

		var href = $(this).attr("href"),
			target = $($(this).attr("href"));

		if (target.length) {
			var scrollToOpts = {
				offset: -50,
				onAfter: function() {
					location.hash = href.replace("#", "");
				}
			};

			$("html,body").scrollTo($(target), 150, scrollToOpts);
		}
	});

})(jQuery);