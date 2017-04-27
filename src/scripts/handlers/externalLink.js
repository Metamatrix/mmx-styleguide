(function($) {

	$.handler("externalLink", function(e) {

		e.preventDefault();

		window.open(this.href);

	});
	
})(jQuery);
