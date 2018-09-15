let baseURL = "https://earthquake.usgs.gov/fdsnws/event/1";
let queryURL = "/query?format=geojson&minmagnitude=3&limit=50&includeallmagnitudes";

$(document).ready(function() {
  // $.getJSON(baseURL + queryURL, querySuccess);
  $.ajax({
    type: "GET",
    url: baseURL + queryURL,
    dataType: "json",
    success: querySuccess1
   });

});

function querySuccess1(obj) {
  
  console.log(obj);
  let fks = Object.keys(obj["features"]);
  let fObj = obj["features"];

  for (let i = 0; i < fks.length; ++i) {
    console.log(fObj[fks[i]]);
  }

  let html = "";

  for (let i = 0; i < fks.length; ++i) {
    html += "<p><strong>Title: </strong>" + fObj[fks[i]]["properties"]["title"] + "<br/>";
    html += "<strong>Tsunami #: </strong>" + fObj[fks[i]]["properties"]["tsunami"] + "</p>";
  }

  document.getElementById("content").innerHTML = html;
}