const { TrackList } = require("./tracklist");

class Album extends TrackList {
  constructor(artist){
    this.artist = artist;
  }
    
}

module.exports = {
    Album: Album,
  };