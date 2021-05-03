const { TrackList } = require('./tracklist');
//const tracklist = require('./tracklist');

class Album extends TrackList {
    constructor(
            id=null, 
            name=null, 
            artist=null,
            year=null
        ){
        
        super(id, name)
        this.artist = artist,
        this.year = year
    }    

}

module.exports = {
    Album: Album,
  };