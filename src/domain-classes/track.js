
class Track {
  constructor(idTrack, trackName, duration, album){
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