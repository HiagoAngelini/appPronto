$("input:first").focus();

var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize() {
	directionsDisplay = new google.maps.DirectionsRenderer();
	var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);

    var options = {
        zoom: 5,
		center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("mapa"), options);
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("trajeto-texto"));

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {

			pontoPadrao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(pontoPadrao);

			var geocoder = new google.maps.Geocoder();

			geocoder.geocode({
				"location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            },
            function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					$("#txtEnderecoPartida").val(results[0].formatted_address);
				}
            });
		});
	}
}





initialize();

/*window.onload = getMyLocation;

function getMyLocation() {
	if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(
			displayLocation,
			displayError);
	}
	else {
		alert("Oops, no geolocation support");
	}
}

function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	var div = document.getElementById("location");
	div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;


}*/

$("form").submit(function(event) {
	event.preventDefault();

	var enderecoPartida = $(position).val(results[0].formatted_address);
	var enderecoChegada = $("palmital").val();

	var request = {
		origin: enderecoPartida,
		destination: enderecoChegada,
		travelMode: google.maps.TravelMode.DRIVING
	};

	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
		}
	});
});






function displayError(error) {
	var errorTypes = {
		0: "Unknown error",
		1: "Permission denied",
		2: "Position is not available",
		3: "Request timeout"
	};
	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + " " + error.message;
	}
	var div = document.getElementById("location");
	div.innerHTML = errorMessage;
}
