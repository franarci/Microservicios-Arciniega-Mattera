
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

    getId(){return this.id;}
    getName(){return this.name;}
    getTracks(){return this.tracks;}
    getGenres(){return this.genres;}
}

module.exports = {
    TrackList: TrackList,
  };