$(document).ready(function() {
  initialize_gmaps();
});

var currentDay = (document.getElementById('current-day').innerHTML) -1;

//**** Come back to: a) limit to number of hotels. b) Not allow duplicate items. c) don't load with defaults? ****//

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
  populateList("hotel", thisHotel);


}

function addRestaurant(){
  var thisRestaurant = $("#restaurant-selector option:selected").text();
  var restaurantCoordinates = findCoordinates("restaurant", thisRestaurant);

  drawLocation(restaurantCoordinates, {
    icon: '/images/restaurant.png'
  });

  addToMapLocations("restaurant", restaurantCoordinates);

  populateList("restaurant", thisRestaurant);


}

function addActivities(){
  var thisActivity = $("#activities-selector option:selected").text();
  var activityCoordinates = findCoordinates("activity", thisActivity);
  drawLocation(activityCoordinates, {
    icon: '/images/star-3.png'
  });
  
  addToMapLocations("activity", activityCoordinates);


  populateList("activity", thisActivity);
}



function removeHotel(element){
	var thisHotel = $(element).prev().text();

	// remove from itinerary list
	$(element).parent().remove();

	// remove from place array
	var hotelCoordinates = findCoordinates("hotel", thisHotel);
	// call function to modify array
	removeFromArray(days[currentDay].hotelLocations, hotelCoordinates);
	// remove from map
	initialize_gmaps(currentDay);
}


function removeRestaurant(element){
	var thisRestaurant = $(element).prev().text();

	// remove from itinerary list
	$(element).parent().remove();

	// remove from place array
	var restaurantCoordinates = findCoordinates("restaurant", thisRestaurant);
	// call function to modify array
	removeFromArray(days[currentDay].restaurantLocations, restaurantCoordinates);
	// remove from map
	initialize_gmaps(currentDay);
}

function removeActivity(element){
	var thisActivity = $(element).prev().text();

	// remove from itinerary list
	$(element).parent().remove();

	// remove from place array
	var activityCoordinates = findCoordinates("activity", thisActivity);

	// call function to modify array
	removeFromArray(days[currentDay].activityLocations, activityCoordinates);
	// remove from map
	initialize_gmaps(currentDay);
}



/* DAYS */


function switchDay (selectedDay){
	var selectedDayButton = $(selectedDay).text();
	$("#current-day").removeAttr("id");
	$(selectedDay).attr("id", "current-day");

	currentDay = selectedDayButton-1;
	document.getElementById("dayLabel").innerHTML = "Day " + (currentDay+1);

	initialize_gmaps(currentDay);

}

function addDay (addButton){
	days.push({
		hotelLocations: [],
    	restaurantLocations: [],
    	activityLocations: []
	});

	$(addButton).before( "<button class=\"btn btn-circle day-btn\" onclick=\"switchDay(this)\">" + days.length + "</button> " );

	switchDay($(addButton).prev());
}

function removeDay (dayButton){
	var theDay = $("#dayLabel").text();
	theDay = Number(theDay.replace("Day ", ""));
	days.splice(theDay,1);
	
	// removing from middle

	// removing from end
	// removing from front

	
	$("#current-day").removeAttr("id");
	//switchDay()

}


/* HELPER FUNCTIONS */

function populateList (type, itemToAdd){
	var idToModify;
	if (type==="hotel"){
		idToModify = "#hotel-list";
		removeFunx = "removeHotel(this)";
	} else if (type==="restaurant"){
		idToModify = "#restaurant-list";
		removeFunx = "removeRestaurant(this)";
	} else { // activities
		idToModify = "#activities-list";
		removeFunx = "removeActivity(this)";
	}

	$( idToModify ).append( "<div class=\"itinerary-item\"><span class=\"title\">" + itemToAdd + "</span>\n<button class=\"btn btn-xs btn-danger remove btn-circle\" onclick=\"" + removeFunx + "\">x</button></div>" );
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


function findPlaceName (type, location){
	var arrayToSearch;
	if (type==="hotel"){
		arrayToSearch = all_hotels;
	} else if (type==="restaurant"){
		arrayToSearch = all_restaurants; 
	} else { // activities
		arrayToSearch = all_activities;
	}

	for (var i=0; i<arrayToSearch.length; i++){
		if (arrayToSearch[i].place[0].location[0]==location[0] && arrayToSearch[i].place[0].location[1]==location[1]){
			return arrayToSearch[i].name;
		}
	}
}


function addToMapLocations (type, coords){
	
	if (type==="hotel"){
		days[currentDay].hotelLocations.push(coords);
	} else if (type==="restaurant"){
		days[currentDay].restaurantLocations.push(coords);
	} else { // activities
		days[currentDay].activityLocations.push(coords);
	}
}


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