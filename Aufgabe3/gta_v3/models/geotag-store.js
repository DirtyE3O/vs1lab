// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
class InMemoryGeoTagStore{
    #tags;

    constructor() {
        this.#tags = [];
    }

    addGeoTag(tag) {
        this.#tags.push(tag);
    }

    removeGeoTag(name) {
        for (let i = 0; i < this.#tags.length; i++) {
            if (this.#tags[i].name === name) {
            this.#tags.splice(i, 1); // 1 Element entfernen
            i--; // Korrektur für gelöschtes Element
            }
        }
    }

    getNearbyGeoTags(location, radius) {
        const result = [];
        const latitude = location.latitude;
        const longitude = location.longitude;
        const radiusSquare = radius * radius;

        for (var i = 0; i < this.#tags.length; i++) {
        const tag = this.#tags[i];

        const latitudeDiff = tag.latitude - latitude;
        const longitudeDiff = tag.longitude - longitude;
            if (latitudeDiff * latitudeDiff + longitudeDiff * longitudeDiff <= radiusSquare) { //Pythagoras
            result.push(tag);
            }
        }

    return result;
    }

    searchNearbyGeoTags(location, radius, keyword) {
    const nearbyTags = this.getNearbyGeoTags(location, radius);
    const result = [];

    for (let i = 0; i < nearbyTags.length; i++) {
        const tag = nearbyTags[i];
        if (tag.name.includes(keyword) || tag.hashtag.includes(keyword)) {
            result.push(tag);
        }
    }
    return result;
}

}

module.exports = InMemoryGeoTagStore
