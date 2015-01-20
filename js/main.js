function getLocation() {
   Modernizr.geolocation, fnWaiting.fadeOut(), placeLoc.fadeIn()
}

function utilityOption() {
   utility = document.getElementById("selectUtility").value
}

function currentLocation(a) {
   fnWaiting.fadeIn(), placeLoc.fadeOut();
   var b = a.coords.latitude,
      c = a.coords.longitude;
   currentlatlng = new google.maps.LatLng(b, c), getPlaces(currentlatlng)
}

function getPlaces(a) {
   userLoc = a, homeMarker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: a,
      icon: homeIcon
   });
   var b = {
      location: a,
      radius: 2e3,
      keyword: utility
   };
   service.search(b, searchUtility)
}

function searchUtility(a) {
   resultsArrayCol = a;
   var b = {
      location: currentlatlng,
      radius: 2e3,
      keyword: utility
   };
   service.search(b, searchRequest)
}

function searchRequest(a) {
   for (resultsArray = a, totalResults = resultsArrayCol.concat(resultsArray), resultsStore = Duplicates(totalResults, "id"), resultsStore = resultsStore.sort(function() {
         return Math.random() - .5
      }), i = 0; i < resultsStore.length; i++);
   0 == resultsStore && showError("There is nothing here"), selectLoc(resultsStore)
}

function selectLoc(a) {
   placeRef = {
      reference: a[dataCount].reference
   }, service.getDetails(placeRef, showPlace)
}

function showPlace(a, b) {
   if (b == google.maps.places.PlacesServiceStatus.OK) {
      for (i in markersArray) markersArray[i].setMap(null);
      destMarker = new google.maps.Marker({
         map: map,
         animation: google.maps.Animation.BOUNCE,
         position: a.geometry.location,
         icon: destIcon
      }), markersArray.push(destMarker), placeName = a.name, routemap(userLoc, a.geometry.location), directionsDisplay.setMap(null), directionsDisplay.suppressMarkers = !0, directionsDisplay.setMap(map), placeSite = a.website ? a.website : a.url, placeAddress = a.formatted_address, $(".uDestination").html("You can try <br/><a href='" + placeSite + "' target='_blank'>" + placeName + '</a><a href ="' + a.url + '" class="rating star' + Math.ceil(a.rating) + '"><span class="">based on ' + a.user_ratings_total + ' ratings</span></a><br/>Call Them at <a href="tel:' + a.international_phone_number + '"> ' + a.international_phone_number + " </a>"), $(".mapAddress").html(placeAddress), $(".btmRow,.recommendation,.mapAddress,.uDestination").fadeIn(function() {
         fnWaiting.fadeOut()
      })
   }
}

function routemap(a, b) {
   var c = {
      origin: a,
      destination: b,
      travelMode: google.maps.TravelMode.WALKING
   };
   directionsService.route(c, function(a, b) {
      b == google.maps.DirectionsStatus.OK && directionsDisplay.setDirections(a)
   })
}

function codeAddress() {
   fnWaiting.fadeIn(function() {
      placeLoc.fadeOut();
      var a = document.getElementById("gLocation").value;
      geocoder.geocode({
         address: a
      }, function(a, b) {
         b == google.maps.GeocoderStatus.OK ? (currentlatlng = a[0].geometry.location, getPlaces(currentlatlng)) : showError("Unable to locate you. try again")
      })
   })
}

function showError(a) {
   fnWaiting.fadeOut(), placeLoc.fadeIn(), $(".locationInfo").text(a).fadeIn()
}

function Duplicates(a, b) {
   var c = [],
      d = {};
   for (var e in a) d[a[e][b]] = a[e];
   for (e in d) c.push(d[e]);
   return c
}
var resultref, marker, markersArray = [],
   dataCount = 0,
   iteration = 0,
   destIcon = "https://cloud.githubusercontent.com/assets/8266671/5778965/0f1e8bee-9dc5-11e4-8b68-2b27d80a2fd2.png",
   homeIcon = "https://cloud.githubusercontent.com/assets/8266671/5778967/0fb3649e-9dc5-11e4-90a9-cd7f2f2456fe.png",
   resultsStore, totalResults = [],
   resultsArray, resultsArrayCol, userLoc, currentlatlng;
fnWaiting = $(".loading"), placeLoc = $(".locator"), $mapCanvas = $(".mapCanvas");
var lowSat = [{
      featureType: "all",
      stylers: [{
         saturation: -50
      }]
   }],
   mapOptions = {
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: lowSat,
      mapTypeControl: !1,
      panControl: !1,
      zoomControl: !0,
      mapTypeControl: !1,
      scaleControl: !1,
      streetViewControl: !1,
      overviewMapControl: !1
   };
map = new google.maps.Map(document.getElementById("googlemap"), mapOptions), geocoder = new google.maps.Geocoder;
var service = new google.maps.places.PlacesService(map),
   trafficLayer = new google.maps.TrafficLayer;
trafficLayer.setMap(map), $(document).ready(function() {
   var a = window.location.href,
      b = a.split("?");
   "location" == b[1] ? placeLoc.css("opacity", 1) : getLocation()
});
var directionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: !0
   }),
   directionsService = new google.maps.DirectionsService;
$(".locator").on("submit", function(a) {
   utilityOption(), codeAddress(), a.preventDefault()
}), $(".resultRe").click(function() {
   return dataCount < resultsStore.length - 1 ? dataCount++ : dataCount = 0, selectLoc(resultsStore), window.scroll(0, 0), !1
});
var autoOptions = {
      types: ["geocode"]
   },
   autoInput = document.getElementById("gLocation");
autocomplete = new google.maps.places.Autocomplete(autoInput, autoOptions);
