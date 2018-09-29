let baseURL = "https://earthquake.usgs.gov/fdsnws/event/1";
let queryURL = "/query?format=geojson&minmagnitude=3&limit=50&includeallmagnitudes";

$(document).ready(function () {

	// request to the api for information using the base url above plus the query url.
	// the query contains what is being requested. In this case it's 50 earthquakes with a minimum mag of 3
	$.ajax({
		type: "GET",				// it's getting information
		url: baseURL + queryURL,	// combining the url's to make a valid url
		dataType: "json",			// it's requesting info in json format
		success: getEvents		// this is the callback function used when the request is successful
	});

});

// our function used for the success of the api request. The information returned from the request is
// used as an argument for the callback function. Since we requested json, it's a json object.
function getEvents(obj) {

	// logging the object to the console, so you can see what it's comprised of
	console.log(obj);

	// obj["features"] is the object of the 50 earthquakes, and its keys are the details of each earthquake
	// fObj is featureObjects; fks is featureKeys
	let fObj = obj["features"];
	let fks = Object.keys(fObj);

	// to display info from a json, you use the keys to get that info, so fks[i] is a key of fObj
	// fObj[key] is the value (or info) in that key, value pair.
	// In this case, the values are json objects of each earthquake. Logging them to the console.
	for (let i = 0; i < fks.length; ++i) {
		console.log(fObj[fks[i]]);
	}

	// the html doesn't need to be created with the javascript, but it's easier for me. Someone should convince me
	// of some other way that makes more sense. Here, we start with blank
	let html = "";

	// for every earthquake (fObj[fks[i]]) item:
	for (let i = 0; i < fks.length; ++i) {
		// make a new date object using the time integer in the ["properties"]["time"] of each earthquake
		let d = new Date(parseInt(fObj[fks[i]]["properties"]["time"]));

		// add to the html. each earthquake is a paragraph tag. It's retrieving magnitude, and place, then
		// puts the date we got above into the html.
		html += "<p>";
		html += "<strong>Magnitude: </strong>" + fObj[fks[i]]["properties"]["mag"] + "<br/>";
		html += "<strong>Place: </strong>" + fObj[fks[i]]["properties"]["place"] + "<br/>";
		html += "<strong>Date: </strong>" + d;
		html += "<div><button type='button'>Details</button></div>";
		html += "</p>";
	}

	// now we put the html inside of a pre-existing html element with the id #content
	document.getElementById("content").innerHTML = html;

	// get the url for more details about the first earthquake event
	let detURL = fObj[fks[0]]["properties"]["detail"];

	// now use the detURL to make another api request
	$.ajax({
		type: "GET",				// it's getting information
		url: detURL,	// combining the url's to make a valid url
		dataType: "json",			// it's requesting info in json format
		success: getEventDets		// this is the callback function used when the request is successful
	});
}

function getEventDets(obj) {
	// just logging it to the console for now :)
	console.log(obj);
}