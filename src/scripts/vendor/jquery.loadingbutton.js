(function($) {

	$.loadingButton = function(element, options) {

		var settings = $.extend({}, $.loadingButton.defaults, options),
			btn = $(element);

		function setLoadingState() {

			if(!settings.condition()) {
				return;
			}

			console.log(settings)

			if(settings.loadingClass) {
				btn.addClass(settings.loadingClass);
			}

			var isInput = btn.is("input"),
				btnText = isInput ? btn.val() : btn.text(),
				loadingText = btn.data("loading-text");

			if (loadingText) {
				btn.data("default-text", btnText);

				if (isInput) {
					btn.val(loadingText);
				} else {
					btn.text(loadingText);
				}
			}

			if(settings.disable) {
				setTimeout(function() {
					btn.prop("disabled", true);
				}, 1);
			}
		}

		function restoreButton() {
			if(settings.loadingClass) {
				btn.removeClass(settings.loadingClass);
			}

			if(settings.disable) {
				btn.prop("disabled", false);
			}

			var isInput = btn.is("input"),
				defaultText = btn.data("default-text");

			if (defaultText) {
				if (isInput) {
					btn.val(defaultText);
				} else {
					btn.text(defaultText);
				}

			}
		}

		// Init
		if(settings.loadingText) {
			btn.data("loading-text", settings.loadingText);
		}

		btn.click(function() {
			setLoadingState();
		})
		.on("reset", function() {
			restoreButton();
		});

	};

	$.fn.loadingButton = function(options) {

		return $(this).each(function() {

			new $.loadingButton(this, options);

		});

	};

	$.loadingButton.defaults = {
		condition: function() {
			return true;
		},
		disable: true,
		loadingClass: null,
		loadingText: null
	};

	$(function() {
		$("[data-loading-button]").loadingButton();
	});

})(jQuery);