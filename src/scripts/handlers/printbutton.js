(function($, win) {
	"use strict";

	$.handler("printButton", function (e) {
	
		e.preventDefault();

		win.print();

	});

})(jQuery, window);