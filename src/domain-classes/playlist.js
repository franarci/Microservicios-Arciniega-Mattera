const { TrackList } = require('./tracklist');

class Playlist extends TrackList {
    constructor(
            id=null, 
            name=null,
            tracks=null,
            genres=null, 
            duration=null
        ){
    
        super(id, name, tracks, genres),
        this.duration = duration;
    }

    duration(){ return this.duration; }

    hasTrack(){
        //TODO
    }
}

module.exports = {
    Playlist: Playlist,
  }