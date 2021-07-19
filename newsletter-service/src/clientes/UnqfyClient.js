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
    
    verifyArtist(artistId){
        this.options.uri = BASE_URL + "artists/";
        this.options.qs = {id: artistId};

        rp.get(this.options).then(() => {
            // no hacer nada?
        }).catch((error) => {
            throw InstanceDoesNotExist;
        });
    }
}

//console.log(decodeURIComponent('))

module.exports = UnqfyClient;