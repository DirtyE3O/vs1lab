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
    let latitude;
    let longitude;

    const tagLatitude = document.getElementById("tag-latitude");
    const tagLongitude = document.getElementById("tag-longitude");
    const searchLatitude = document.getElementById("search-latitude");
    const searchLongitude = document.getElementById("search-longitude");

    function setLocation() {
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

        if (image) {
            image.remove();
        }
        if (caption) {
            caption.remove();
        }
        let map = new MapManager();
        map.initMap(latitude, longitude);

        const mapTags = document.getElementById("map");
        let taglist_json = mapTags.getAttribute("data-tags");

        if (!taglist_json) {
            taglist_json = "[]";
        }

        const taglist = JSON.parse(taglist_json);

        map.updateMarkers(latitude, longitude, taglist);

    }

    const savedLat = sessionStorage.getItem("savedLatitude");
    const savedLon = sessionStorage.getItem("savedLongitude");

    if (savedLat && savedLon) {
        latitude = savedLat;
        longitude = savedLon;
        setLocation();
    } else {
        LocationHelper.findLocation((helper) => {
            latitude = helper.latitude;
            longitude = helper.longitude;
            sessionStorage.setItem("savedLatitude", latitude);
            sessionStorage.setItem("savedLongitude", longitude);
            setLocation();
        });
    }
}


// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", updateLocation); //Locationupdate
