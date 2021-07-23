const rp = require('request-promise');
const {InstanceDoesNotExist} = require("../errors");
let PORT = process.env.PORT_ENV;
let IP = process.env.UNQFY_IP;
const BASE_URL = `http://${IP}:${PORT}/api/`;

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
        try{
            artist =  await rp.get(this.options);
            return artist.name;
            } catch(e) {
                throw new InstanceDoesNotExist;
            }
    };
}


module.exports = UnqfyClient;