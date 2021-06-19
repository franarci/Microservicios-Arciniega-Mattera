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

    getArtist(){ return this.artist; }
    getYear(){ return this.year; }
    setAttributes(attributesData){ 
        if(attributesData.year != undefined) {
            this.year=attributesData.year; 
        } else {
            throw new Error("InvalidInputKey");
        }
    }
}

module.exports = {
    Album: Album,
  };