
class Track {
  constructor(idTrack=null, trackName=null, duration=null, album=null){
    this.idTrack = idTrack;
    this.trackName = trackName;
    this.duration = duration;
    this.album = album;
    this.genres = [];
    this.artists = [];
  }

    getIdTrack(){return this.idTrack = idTrack;}
    getTrackName(){return this.trackName = trackName;}
    getDuration(){return this.duration = duration;}
    getAlbum(){return this.album = album;}
    getGenres(){return this.genres = [];}
    getArtists(){return this.artists = [];}
}

module.exports = {
    Track: Track,
  };