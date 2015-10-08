$(document).ready(function() {
  initialize_gmaps();
});

function addHotel(){
  var thisHotel = $("#hotel-selector option:selected").text();

  // map stuff -> 
  //find the hotel in our array. Then grab the latitude and long from the stored data - .place[0].location = [lat, long] 
  var hotelCoordinates = findCoordinates("hotel", thisHotel);
  // add the location to the appropriate locations array in gmaps.js
  drawLocation(hotelCoordinates, {
    icon: '/images/lodging_0star.png'
  });
  addToMapLocations("hotel", hotelCoordinates);
  
  $( "#hotel-list" ).append( "<div class=\"itinerary-item\"><span class=\"title\">" + thisHotel + "</span>\n<button class=\"btn btn-xs btn-danger remove btn-circle\" onclick=\"removeHotel()\">x</button></div>" );

}

function addRestaurant(){
  var thisRestaurant = $("#restaurant-selector option:selected").text();
  var restaurantCoordinates = findCoordinates("restaurant", thisRestaurant);

  drawLocation(restaurantCoordinates, {
    icon: '/images/restaurant.png'
  });

  addToMapLocations("restaurant", restaurantCoordinates);

  $( "#restaurant-list" ).append( "<div class=\"itinerary-item\"><span class=\"title\">" + thisRestaurant + "</span>\n<button class=\"btn btn-xs btn-danger remove btn-circle\" onclick=\"removeRestaurant()\">x</button></div>" );

}

function addActivities(){
  var thisActivity = $("#activities-selector option:selected").text();
  var activityCoordinates = findCoordinates("activity", thisActivity);
  drawLocation(activityCoordinates, {
    icon: '/images/star-3.png'
  });
  
  addToMapLocations("activity", activityCoordinates);


  $( "#activities-list" ).append( "<div class=\"itinerary-item\"><span class=\"title\">" + thisActivity + "</span>\n<button class=\"btn btn-xs btn-danger remove btn-circle\" onclick=\"removeActivity()\">x</button></div>" );

}



function removeHotel(element){
	var thisHotel = $(element).prev().text();

	// remove from itinerary list
	$(element).parent().remove();

	// remove from place array
	var hotelCoordinates = findCoordinates("hotel", thisHotel);
	// call function to modify array
	removeFromArray(hotelLocations, hotelCoordinates);
	// remove from map
	initialize_gmaps();
}





function findCoordinates (type, place){
	var arrayToSearch;
	if (type==="hotel"){
		arrayToSearch = all_hotels;
	} else if (type==="restaurant"){
		arrayToSearch = all_restaurants;
	} else { // activities
		arrayToSearch = all_activities;
	}

	for (var i=0; i<arrayToSearch.length; i++){
		if (arrayToSearch[i].name === place){
			return arrayToSearch[i].place[0].location;
		}
	}
}

function addToMapLocations (type, coords){
	
	if (type==="hotel"){
		hotelLocation.push(coords);
	} else if (type==="restaurant"){
		restaurantLocations.push(coords);
	} else { // activities
		activityLocations.push(coords);
	}
}

/*var restaurantLocations = [
  [40.705137, -74.013940],
  [40.708475, -74.010846]
];*/

function removeFromArray(inputArr, location){
	//var resultArr;
	for (var i=0; i<inputArr.length; i++){
		if (inputArr[i][0]==location[0] && inputArr[i][1]==location[1]){
			inputArr.splice(i,1);
			return;
		} 
	}
	//return resultArr;
}