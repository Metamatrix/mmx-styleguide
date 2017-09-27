(function ($) {

    "use strict";

    $.enhancer("dismissableAlert", function () {

    	var alert = $(this);

      alert.on("closed.bs.alert", function () {
      	if(alert.data("dismissable-id")) {
      		var cookieId = alert.data("dismissable-id") + "-closed";
        	$.cookies.set(cookieId, "true");
      	}
      });
      
    });

})(jQuery);
