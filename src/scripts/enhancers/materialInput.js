(function ($) {

  "use strict";

  var callback = function () {
    var formControl = $(this),
      hasValue = formControl.val().length > 0;
    formControl.toggleClass("input-filled", hasValue);
  };

  $.enhancer("materialInput", function () {
    $(this).find(".form-control").on("blur", callback);
    // needs to run on initilization as well for prefilled controls
    callback.call($(this).find(".form-control"));
  });

})(jQuery);