const { TrackList } = require('./tracklist');
//const tracklist = require('./tracklist');

class Album extends TrackList {
    constructor(id=null, name=null, artist=null){
        super(id, name)
        this.artist = artist
    }    

    addTrack(track){
        this.tracks.push(track)
    }
}

module.exports = {
    Album: Album,
  };