const { TrackList } = require('./tracklist');

class Playlist extends TrackList {
    constructor(
            id=null, 
            name=null,
            tracks=null,
            genres=null, 
            duration=null,
            user=null
        ){
    
        super(id, name, tracks, genres),
        this.duration = duration,
        this.user = user
    }

    getDuration(){ return this.duration; }

    hasTrack(trackSearched){
        return this.tracks.some(track => track.name.localeCompare(trackSearched.name))
    }
}

module.exports = {
    Playlist: Playlist,
  }