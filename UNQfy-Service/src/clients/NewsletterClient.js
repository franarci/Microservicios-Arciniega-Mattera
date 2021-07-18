const rp = require('rp');
const BASE_URL = "http://localhost:5004/api/";

class NewsletterClient {
    constructor() {
        this.options = this.getOptions();
    }

    getOptions() {
        const options = {
            uri: BASE_URL,
            json: true
        };
        return options;
    }
    async newAlbum(eventData){
        const artist = eventData.artist.name;
        this.options.body = {
            artistId: eventData.artist.id,
            subject: "Nuevo album para el artista " + artist,
            message: "Se ha agregado el album "+eventData.changedObject.name + " al artista " + artist
        }

        this.options.uri = BASE_URL + "notify";
        await rp.post(this.options);
    }

}