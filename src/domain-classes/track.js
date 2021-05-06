
class Track {
  constructor(
            idTrack=null,
            name=null,
            duration=null,
            album=null,
            genres=null,
            artists=null
        ){
        
        this.idTrack = idTrack;
        this.name = name;
        this.duration = duration;
        this.album = album;
        this.genres = genres;
        this.artists = artists;
  }

    getIdTrack(){return this.idTrack;}
    getName(){return this.name;}
    getDuration(){return this.duration;}
    getAlbum(){return this.album;}
    getGenres(){return this.genres;}
    getArtists(){return this.artists;}
}

module.exports = {
    Track: Track,
  };