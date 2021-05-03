const { Tracklist } = require('./src/domain-classes/tracklist');
//const tracklist = require('./tracklist');

class Album extends Tracklist {
    constructor(artist){
        this.artist = artist;
    }    
}

module.exports = {
    Album: Album,
  };