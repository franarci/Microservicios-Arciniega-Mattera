
class TrackList {
    constructor(id=null, name=null, tracks=[], genres=[]){
        this.id = id
        this.name = name
        this.tracks = tracks
        this.genres = genres
    }

    addTrack(track){
        this.tracks.push(track);
    }

    deleteTrack(track){
        this.tracks = this.tracks.filter( deltaTrack => deltaTrack !== track );
    }

    getId(){return this.id;}
    getName(){return this.name;}
    getTracks(){return this.tracks;}
    getGenres(){return this.genres;}
}

module.exports = {
    TrackList: TrackList,
  };