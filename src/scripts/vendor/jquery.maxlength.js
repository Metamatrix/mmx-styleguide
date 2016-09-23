// jQuery maxlength plugin v 1.0
// usage > $('textarea[maxlenght]').maxLength();
(function ($) {
	
	$.fn.maxLength = function() {

		// First test if the browser supports maxlength by creating a new textarea and check for the attribute
		var testElement = document.createElement('textarea'),
			supportsMaxlength = ('maxLength' in testElement),
			el = $(this);

		// Attach key up event for textareas with a maxlength attribute (if the browser doesn't support maxlength for textarea)
		if (!supportsMaxlength) {
			el.keyup(function () {
				var $this = $(this),
					max = parseInt($this.attr('maxlength')),
					text = $this.val();
 
				// Make sure the text isn't longer than the maxlength
				if (text.length > max) {
					$this.val(text.substr(0, max));
				}
			});
		}

		return el;

	};
	
})(jQuery);
