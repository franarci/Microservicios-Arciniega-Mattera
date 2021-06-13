const { Artist } = require('./artist');
class Track {
  constructor(
            id=null,
            name=null,
            duration=null,
            album=null,
            genres=null,
            artist=null
        ){
        
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.album = album;
        this.genres = genres;
        this.artist = artist;
        this.lyrics= "";
  }

    getIdTrack(){return this.id;}
    getName(){return this.name;}
    getDuration(){return this.duration;}
    getAlbumId(){return this.album;}
    getGenres(){return this.genres;}
    getArtists(){return this.artist;}
    getLyrics(){return this.lyrics;}
    setLyrics(lyrics){ 
      this.lyrics = lyrics;
    }
}

module.exports = {
    Track: Track,
  };