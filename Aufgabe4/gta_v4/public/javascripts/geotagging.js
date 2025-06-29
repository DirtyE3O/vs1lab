// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console.
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

const map = new MapManager();


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
document.addEventListener("DOMContentLoaded", function () {
    updateLocation();

    const tagForm = document.querySelector('#tag-form');
    if (tagForm) {
        tagForm.addEventListener('submit', handleTagSubmit);
    }

    const discoveryForm = document.querySelector('#discoveryFilterForm');
    if (discoveryForm) {
        discoveryForm.addEventListener('submit', handleDiscoverySubmit);
    }
});

async function handleTagSubmit(event){
    event.preventDefault();

    const name = document.getElementById("tag-name")?.value;
    const latitude = parseFloat(document.getElementById("tag-latitude")?.value);
    const longitude = parseFloat(document.getElementById("tag-longitude")?.value);
    const hashtag = document.getElementById("tag-hashtag")?.value;

    if (!name || isNaN(latitude) || isNaN(longitude)) {
        console.error("Missing or invalid input.");
        return;
    }

    const tagData = { name, latitude, longitude, hashtag };

    try {
        const response = await fetch("/api/geotags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tagData)
        });

        if (!response.ok) {
            throw new Error("Failed to create GeoTag.");
        }

        const result = await response.json();
        console.log("GeoTag created:", result);

       appendNewTagToList(result);


    } catch (error) {
        console.error("Error adding GeoTag:", error);
    }

}

function appendNewTagToList(tag) {
    const list = document.getElementById("discoveryResults");
    const listItem = document.createElement("li");
    listItem.innerText = `${tag.name} (${tag.latitude}, ${tag.longitude}) ${tag.hashtag}`;
    list.appendChild(listItem);
}


async function handleDiscoverySubmit(event) {

    event.preventDefault();

    const searchTerm = document.getElementById("search-term")?.value || "";
    console.log("Searching for:", searchTerm);
    const latitude = parseFloat(document.getElementById("search-latitude")?.value);
    const longitude = parseFloat(document.getElementById("search-longitude")?.value);

    const params = new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
        searchterm: searchTerm
    });

    try {
        const response = await fetch(`/api/geotags?${params}`);
        console.log(`/api/geotags?${params}`);
        if (!response.ok) throw new Error("Network response not ok");

        const tags = await response.json();
        console.log(tags)

        updateDiscoveryResults(tags, latitude, longitude);

    } catch (error) {
        console.error("Discovery fetch error:", error);
    }
}
function updateDiscoveryResults(tags, latitude, longitude) {
    // update list
    const list = document.getElementById("discoveryResults");
    list.innerHTML = ""; // clear current

    tags.forEach(tag => {
        const listItem = document.createElement("li");
        listItem.innerText = `${tag.name} (${tag.latitude}, ${tag.longitude}) ${tag.hashtag}`;
        list.appendChild(listItem);
    });

    //upadte map
    map.updateMarkers(latitude, longitude, tags);
}
