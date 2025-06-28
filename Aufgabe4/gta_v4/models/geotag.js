// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** *
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
class GeoTag {

     #id;
    constructor(name, latitude, longitude, hashtag) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.hashtag = hashtag;
    }

    setId(id){
        this.#id = id;
    }

    getId(){
        return this.#id;
    }

    toJSON() {
        return {
            id: this.#id,
            name: this.name,
            latitude: this.latitude,
            longitude: this.longitude,
            hashtag: this.hashtag
        };
    }
}

module.exports = GeoTag;
