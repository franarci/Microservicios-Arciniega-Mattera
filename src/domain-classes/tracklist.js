
class TrackList {
    constructor(id=null, name=null){
        this.id = id
        this.name = name
        this.tracks = []
        this.genres = []
    }

    addTrack(track){
        this.tracks.push(track)
    }

    
}

module.exports = {
    TrackList: TrackList,
  };