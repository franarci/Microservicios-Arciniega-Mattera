
class Track {
  constructor(idTrack, trackName, duration, album, genre){
    this.idTrack = idTrack;
    this.trackName = trackName;
    this.duration = duration;
    this.album = album;
    this.genre = genre;
    this.artists = [];
  }
}

module.exports = {
    Track: Track,
  };