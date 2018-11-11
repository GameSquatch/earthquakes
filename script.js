let baseURL = "https://earthquake.usgs.gov/fdsnws/event/1";
let queryURL = "/query?format=geojson&minmagnitude=4.5&limit=15&includeallmagnitudes";
let tabs;
let events;
let currentTab;
let content;
let screenH;
let modalCont;
let loaderCont, loader, loadBox1, loaderHTML;
let detailModalCont, detailMag, detailDepth, detailIntensity, detailLat, detailLong, detailPlace, detailTsu, detailExit;



$(document).ready(function () {
	events = [];
	// this object will contain the tab content. Instead of loading a whole new page, I am just going to create the html
	// needed for each tab. This is for a very specific reason. The website www.sololearn.com can't use multiple pages,
	// and that's where I post a lot of my projects.
	tabs = {
		"Home": "",
		"Timeline": "",
		"Visual Map": "",
		"About": ""
	};
	currentTab = "Home";
	
	content = $("#content");
	modalCont = $("#modalContainer");
	// all detail DOM elements
	detailModalCont = $("#detailModalContainer");
	detailMag = $("#detailMagnitude");
	detailDepth = $("#detailDepth");
	detailIntensity = $("#detailIntensity");
	detailLat = $("#detailLatitude");
	detailLong = $("#detailLongitude");
	detailPlace = $("#detailPlace");
	detailTsu = $("#detailTsunami");
	detailExit = $("#detailExit");

	// create loader html since the #content div's html will be overwritten when tabbing
	loaderHTML = 	'<div id="loaderContainer">' + 
						'<div id="loader">' + 
							'<div id="ldBx1" class="loadBox"></div>' + 
							'<div id="ldBx2" class="loadBox"></div>' + 
							'<div id="ldBx3" class="loadBox"></div>' + 
						'</div>' + 
					'</div>';
	content.append(loaderHTML);//append it to the DOM in #content

	// these MUST be defined after the html strings are appended in order to access them in the DOM.
	loaderCont = $("#loaderContainer");
	loader = $("#loader");
	loadBox1 = $("#ldBx1");

	let loaderW = parseInt(loader.css("width"));
	loader.css("height", loaderW + "px");

	let loadBox1W = parseInt(loadBox1.css("width"));
	$(".loadBox").css("height", loadBox1W + "px");

	// The modal should be the screen's height, so it's set to that here
	screenH = parseInt(window.innerHeight);
	modalCont.css("height", screenH + "px");
	detailModalCont.css("height", screenH + "px");

	// adjusting loader heights when resizing the window
	$(window).on("resize", () => {
		let loaderW = parseInt(loader.css("width"));
		loader.css("height", loaderW + "px");

		let loadBox1W = parseInt(loadBox1.css("width"));
		$(".loadBox").css("height", loadBox1W + "px");
	})

	// Selecting tab, adding class
	$("#tabs").children().click((event) => {
		// TODO add check to see if clicked same tab that you are already on
		if ($(event.target).hasClass("currentTab")) {
			$("html").scrollTop(0);
			$("body").scrollTop(0);
		}
		else {
			$("#tabs").children().removeClass("currentTab");
			$(event.target).addClass("currentTab");
			currentTab = event.target.innerHTML;
			changeContent(currentTab);
		}
	});

	// display search modal page
	$("#searchIcon").click(() => {
		screenH = parseInt(window.innerHeight);
		modalCont.css({"height": screenH + "px", "display": "block", "position": "fixed"});

		$("body").css("position", "fixed");
	});

	// hide the modal search page when exiting
	$("#modalExit").click(() => {
		modalCont.css({"display": "none", "position": "fixed"});
		$("body").css("position", "initial");
	});

	// hide the detail modal
	detailExit.click(() => {
		detailModalCont.css("display", "none");
	});
	
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

	// hide the loader when content is loaded
	loaderCont.css("display", "none");

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

	// createTabHTML(obj)

	// the html doesn't need to be created with the javascript, but it's easier for me. Someone should convince me
	// of some other way that makes more sense. Here, we start with blank
	let html = "";

	// for every earthquake (fObj[fks[i]]) item:
	for (let i = 0; i < fks.length; ++i) {
		// push each event into an array to access at any point in the app, like for details, for example
		events.push(fObj[fks[i]]);

		// make a new date object using the time integer in the ["properties"]["time"] of each earthquake
		let d = new Date(parseInt(fObj[fks[i]]["properties"]["time"]));
		
		// add to the html. each earthquake is a paragraph tag. It's retrieving magnitude, and place, then
		// puts the date we got above into the html.
		html += "<div class='cardContainer'>";
		html += "<div class='bg'></div>";
		html += "<div class='magnitude'><span>" + fObj[fks[i]]["properties"]["mag"] + "</span></div>";
		html += "<div class='where'><span>" + fObj[fks[i]]["properties"]["place"] + "</span></div>";
		html += "<div class='when'><span>" + d.toUTCString() + "</span></div>";
		html += "<button class='btn' type='button' onclick='showDets(" + i + ")'>Details</button>";
		html += "</div>";

	}

	// now we put the html inside of a pre-existing html element with the id #content
	tabs["Home"] = html;
	content.html(html);
	
}

// this is the function that the buttons use. When the buttons were created, each one was given a unique argument,
// so this will get the details from the array using that unique index. The details array was created using the same index.
function showDets(i) {// !!! DEFINED IN HTML CREATED IN THE getEvents() FUNCTION ABOVE !!!
	// fill the detail modal with the info of the event that was clicked, i
	let eventProps = events[i]["properties"];
	
	detailMag.html("<strong>Magnitude:</strong> " + eventProps["mag"]);
	detailDepth.html("<strong>Depth:</strong> " + events[i]["geometry"]["coordinates"][2]);
	eventProps["cdi"] == "" ? detailIntensity.html("<strong>Reported Intensity:</strong> " + eventProps["cdi"]) : detailIntensity.html("No reports of a felt earthquake.");
	detailLat.html("<strong>Latitude:</strong> " + events[i]["geometry"]["coordinates"][1]);
	detailLong.html("<strong>Longitude:</strong> " + events[i]["geometry"]["coordinates"][0]);
	detailPlace.html("<strong>Place:</strong> " + eventProps["place"]);
	detailTsu.html("<strong>Tsunami Flag:</strong> " + eventProps["tsunami"]);

	// show the detail modal block
	detailModalCont.css({"height": screenH + "px", "display": "block", "position": "fixed"});

	// send another request using the url obtained in the events request
	// MAY NOT BE NECESSARY AT FIRST
	// $.ajax({
	// 	type: "GET",				// it's getting information
	// 	url: u,				// combining the url's to make a valid url
	// 	dataType: "json",			// it's requesting info in json format
	// 	success: getEventDets		// this is the callback function used when the request is successful
	// });

}
// the function when requesting details from the api succeeds
function getEventDets(obj) {
	// just logging it to the console for now :)
	console.log(obj);
}

function createTabHTML(obj) {
	// obj["features"] is the object of the 50 earthquakes, and its keys are the details of each earthquake
	// fObj is featureObjects; fks is featureKeys
	let fObj = obj["features"];
	let fks = Object.keys(fObj);

	// Home tab HTML
	let html = "";

	// for every earthquake (fObj[fks[i]]) item:
	for (let i = 0; i < fks.length; ++i) {
		// make a new date object using the time integer in the ["properties"]["time"] of each earthquake
		let d = new Date(parseInt(fObj[fks[i]]["properties"]["time"]));

		// add to the html. each earthquake is a paragraph tag. It's retrieving magnitude, and place, then
		// puts the date we got above into the html.
		html += "<div class='cardContainer'>";
		html += "<div class='bg'></div>";
		html += "<div class='magnitude'><span>" + fObj[fks[i]]["properties"]["mag"] + "</span></div>";
		html += "<div class='where'><span>" + fObj[fks[i]]["properties"]["place"] + "</span></div>";
		html += "<div class='when'><span>" + d.toUTCString() + "</span></div>";
		html += "<button class='btn' type='button' onclick='showDets(" + i + ")'>Details</button>";
		html += "</div>";

		// push the details url into the array declared in the ready function above
		dets.push(fObj[fks[i]]["properties"]["detail"]);
	}
	// store the html in the global tabs object
	tabs["Home"] = html;

	// Timeline HTML
	html = "";
	// TODO make the rest of this
}

function changeContent(tabName) {
	
	content.html(tabs[tabName]);
}
