let baseURL = "https://earthquake.usgs.gov/fdsnws/event/1";
let queryURL = "/query?format=geojson&minmagnitude=3&limit=50&includeallmagnitudes";
let dets;

$(document).ready(function () {
	dets = [];
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
	/*for (let i = 0; i < fks.length; ++i) {
		console.log(fObj[fks[i]]);
	}*/

	// the html doesn't need to be created with the javascript, but it's easier for me. Someone should convince me
	// of some other way that makes more sense. Here, we start with blank
	let html = "";

	// for every earthquake (fObj[fks[i]]) item:
	for (let i = 0; i < fks.length; ++i) {
		// make a new date object using the time integer in the ["properties"]["time"] of each earthquake
		let d = new Date(parseInt(fObj[fks[i]]["properties"]["time"]));

		// add to the html. each earthquake is a paragraph tag. It's retrieving magnitude, and place, then
		// puts the date we got above into the html.
		/*
		// This is what the javascript needs to create in order to use the design. Of course, the fetched data will fill in the contents.
		<div class="cardContainer">
		
			<div class="magBox">
				<div class="cardMag"><span>5.9</span></div>
			</div>
			
			<div class="cardPlace">
				<div class="where">Where</div>
				<div class="whereContent">5 km SSW of Butt, CA</div>
			</div>
			
			<div class="cardDate">
				<div class="when">When</div>
				<div class="whenContent">September 9, 2018</div>
			</div>
			
		</div>

		*/
		html += "<div class='cardContainer'>";
		html += "<div class='magBox'>";
		html += "<div class='cardMag'><span>" + fObj[fks[i]]["properties"]["mag"] + "</span></div>";
		html += "</div>";
		html += "<div class='cardPlace'>";
		html += "<div class='where'>Where</div>";
		html += "<div class='whereContent'>" + fObj[fks[i]]["properties"]["place"] + "</div>";
		html += "</div>";
		html += "<div class='cardDate'>";
		html += "<div class='when'>When</div>";
		html += "<div class='whenContent'>" + d + "</div>";
		html += "</div>";
		html += "</div>";

		/*
		html += "<p>";
		html += "<strong>Magnitude: </strong>" + fObj[fks[i]]["properties"]["mag"] + "<br/>";
		html += "<strong>Place: </strong>" + fObj[fks[i]]["properties"]["place"] + "<br/>";
		html += "<strong>Date: </strong>" + d;
		html += "<div><button type='button' onclick='showDets(" + i + ")'>Details</button></div>";
		html += "</p>";
		*/

		// push the details url into the array declared in the ready function above
		dets.push(fObj[fks[i]]["properties"]["detail"]);
	}

	// now we put the html inside of a pre-existing html element with the id #content
	$("#events").html(html);

	// get the url for more details about the first earthquake event
	let detURL = fObj[fks[0]]["properties"]["detail"];

	// now use the detURL to make another api request
	
}

function getEventDets(obj) {
	// just logging it to the console for now :)
	console.log(obj);
}

// this is the function that the buttons use. When the buttons were created, each one was given a unique argument,
// so this will get the details from the array using that unique index. The details array was created using the same index.
function showDets(i) {
	let u = dets[i];
	$.ajax({
		type: "GET",				// it's getting information
		url: u,				// combining the url's to make a valid url
		dataType: "json",			// it's requesting info in json format
		success: getEventDets		// this is the callback function used when the request is successful
	});

	$("#content").html("<p>" + dets[i] + "</p>");
}
