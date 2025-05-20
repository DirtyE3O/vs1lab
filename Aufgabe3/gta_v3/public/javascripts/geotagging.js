// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");



/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
function updateLocation() {
    LocationHelper.findLocation((helper) => {
        var latitude = helper.latitude;
        var longitude = helper.longitude;

        var tagLatitude = document.getElementById("tag-latitude");
        var tagLongitude = document.getElementById("tag-longitude");
        var searchLatitude = document.getElementById("search-latitude");
        var searchLongitude = document.getElementById("search-longitude");

        if (tagLatitude != null) {
            tagLatitude.value = latitude;
        }
        if (tagLongitude != null) {
            tagLongitude.value = longitude;
        }
        if (searchLatitude != null) {
            searchLatitude.value = latitude;
        }
        if (searchLongitude != null) {
            searchLongitude.value = longitude;
        }
        let image = document.querySelector("#mapView");
        let caption = document.querySelector("#map span");

        if ( image) {
            image.remove();
        }
        if (caption) {
            caption.remove();
        }
        let map = new MapManager();
        map.initMap(latitude, longitude);
        map.updateMarkers(latitude, longitude);
    });
}


// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", updateLocation); //Locationupdate
