const rp = require('request-promise');
const InstanceDoesNotExist = require("../errors");
const BASE_URL = "http://localhost:5001/api/";

class UnqfyClient {
    constructor(){
        this.options = this.getOptions();
    }
    getOptions() {
        const options = {
            uri: BASE_URL,
            json: true,
        };
        return options;
    }
    
    async verifyArtist(artistId){
        this.options.uri = BASE_URL + `artists/${artistId}`;
        let artist;
        try {
            artist =  await rp.get(this.options);
            return artist.name;
        }  
        catch(error) {
                throw error;
        };
    }
}


module.exports = UnqfyClient;