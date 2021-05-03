
class TrackList {
  constructor(id, name){
    this.id = id
    this.name = name
    this.tracks = []
    this.genres = []
  }
}

module.exports = {
    TrackList: TrackList,
  };