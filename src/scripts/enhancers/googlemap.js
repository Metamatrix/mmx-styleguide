(function ($, win, modernizr) {

	"use strict";

	$.enhancer("googleMap", function () {
		var map,
			google,
			mapCanvas = this,
			geocoder,
			ready = false,
			mapKey = 'AIzaSyCXAqKp9r9-ZeIZ-ayV6MkqG7qmIc8z_28',
			location = $(this).data("location"),
			initialized = false,
			googleApiLoaded = win["google"] != null && win["google"]["map"] != null;

		function init() {
			if (!initialized && !googleApiLoaded) {
				$.getScript('http://maps.googleapis.com/maps/api/js?key=' + mapKey + '&sensor=false');

				initWhenLoaded();

			} else {
				initMap();
			}
		}

		function initWhenLoaded() {

			googleApiLoaded = win["google"] != null && win["google"]["maps"] != null;

			if(googleApiLoaded) {
				initMap();
				return;
			}

			setTimeout(initWhenLoaded, 500);
		}

		function initMap() {

			google = win.google;

			// Create a map object, and include the MapTypeId to add
			// to the map type control.
			var mapOptions = {
				zoom: 11,
				center: new google.maps.LatLng(55.6468, 37.581),
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE]
				},
				scrollwheel: false,
				disableDefaultUI: modernizr.mq('(max-width: 1024px)'),
				draggable: (modernizr.touchevents && modernizr.mq('(max-width: 1024px)')) ? false : true
			};

			// Creat the map
			map = new google.maps.Map(mapCanvas, mapOptions);

			if (location) {
				setLocation(location);
			}

			ready = true;

		}

		function setLocation(address) {
			
			geocoder = geocoder || new google.maps.Geocoder();

			geocoder.geocode({ 'address': address }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var location = results[0].geometry.location;

					map.setCenter(location);
					map.setZoom(15);

					var marker = new google.maps.Marker({
						map: map,
						position: location,
						title: address
					});
				}
				else {
					console.log('Error: could nog get location.');
				}
			});
		};

		init();

	});

})(jQuery, window, Modernizr);