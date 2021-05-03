
class Track {
  constructor(idTrack=null, trackName=null, duration=null, album=null){
    this.idTrack = idTrack;
    this.trackName = trackName;
    this.duration = duration;
    this.album = album;
    this.genres = [];
    this.artists = [];
  }
}

module.exports = {
    Track: Track,
  };