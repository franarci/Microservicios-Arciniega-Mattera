
class Track {
	constructor(id=null, album=null, genre=null, artist=null, name=null){
		this.id = id
		this.album = album
		this.genres = genre
		this.artist = artist
		this.name = name
	}
}

module.exports = {
    Track: Track,
  };