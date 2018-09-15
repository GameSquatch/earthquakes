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
  let ks = Object.keys(obj);

  for (let i = 0; i < ks.length; ++i) {
    console.log(ks[i], typeof obj[ks[i]] == "object" ? obj[ks[i]] : 0);
  }
}