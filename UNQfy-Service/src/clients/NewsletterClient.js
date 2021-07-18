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
        this.options.body = {
            album: eventData.changedObject.name,
            artist: eventData.artist.name
        }
        await rp.post(this.options);
    }

}