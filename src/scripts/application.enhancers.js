/* global console */
(function ($, win, doc) {
	"use strict";

	var handlers = {},
		enhancers = {},
		enhancerRequires = {};

	// Init and enhancer
	function InitEnhancer(enhancer) {

		// Init any required (inherited) enhancers
		if (enhancerRequires[enhancer]) {
			InitEnhancer.call(this, enhancerRequires[enhancer]);
		}

		// Init enhancer by function or object
		if (typeof enhancers[enhancer] === "function") {
			enhancers[enhancer].call(this);
		}
		else if (typeof enhancers[enhancer] === "object" && typeof enhancers[enhancer].init === "function") {
			// Make a copy of the enhancer template object for each enhancer to use unique settings, etc
			var enhancerInstance = $.extend(true, {}, enhancers[enhancer]);
			enhancerInstance.init(this);
		}
		else {
			if (win.console && typeof console.error === "function") {
				console.error("Non-existing enhancer: '%s' on %o", enhancer, this);
			}
		}
	}

	function initHandlers() {
		// generic click handler
		$(doc).on("click", "[data-handler]", function (event) {
			var handler = $(this).attr("data-handler");
			// honour default behaviour when using modifier keys when clicking
			// for example:
			// cmd + click / ctrl + click opens a link in a new tab
			// shift + click opens a link in a new window
			if (this.tagName === "A" && (event.metaKey || event.ctrlKey || event.shiftKey)) {
				return;
			}
			if (handlers && typeof handlers[handler] === "function") {
				handlers[handler].call(this, event);
			}
			else {
				if (win.console && typeof console.error === "function") {
					console.error("Non-existing handler: '%s' on %o", handler, this);
				}
			}
		});
	}

	function initEnhancers(context) {

		var enhancers = !context ? $("[data-enhancer]") : $(context).find("[data-enhancer]");

		// kick off js enhancements
		enhancers.each(function () {
			var enhancer = $(this).attr("data-enhancer"),
				split = enhancer.split(" "),
				$this = this;
			split.forEach(function(elm) {
				InitEnhancer.call($this, elm);
			});
		});
	}

	// Init enhancers and handlers
	function init() {
		$(function () {
			initHandlers();
			initEnhancers();
		});
	}

	init();

	$.handler = function (key, fn) {
		handlers[key] = fn;
	};
	// method takes 2 or 3 arguments
	// 2 : p1 = the name of the enhancer, p2 = the enhancer function or object
	// 3 : p1 = the name of the enhancer, p2 = base enhancer to inherit, p3 = the enhancer function or object
	$.enhancer = function (p1, p2, p3) {
		if (!p3) {
			enhancers[p1] = p2;
		} else {
			enhancers[p1] = p3;
			enhancerRequires[p1] = p2;
		}
	};

	$.initEnhancer = function (target) {
		target = typeof target === "string" ? $(target) : target;

		var enhancer = target.attr("data-enhancer");

		InitEnhancer.call(target, enhancer);
	};

	$.initEnhancers = function (container) {
		container = typeof container === "string" ? $(container) : container;

		initEnhancers(container);
	};
})(jQuery, window, document);