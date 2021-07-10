class Subject {
	observers = [];

	addObserver(o){
		this.observers.push(o);
	}

	removeObserver(o){
		this.observers =this.observers.filter(observer => observer == o);
	}

	notify(event, object = this){
		this.observers.forEach(observer => observer.update(event, object))
	}
}

class Artist extends Subject{
    constructor(
            id= null, 
            name= null, 
            country= null
        ){
        
        this.id = id;
        this.name = name;
        this.country = country;
        this.albums = [];
        this.genres = [];
        this.notify("newArtist");
    }

    getId(){return this.id;}
    getname(){return this.name;}
    getCountry(){return this.country;}
    getAlbums(){return this.albums;}
    getGenres(){return this.genres;}
    setAttributes(attributesData){ 
        if(attributesData.name != undefined && attributesData.country != undefined) {
            this.name=attributesData.name;
            this.country=attributesData.country; 
        } else {
            throw new Error("InvalidInputKey");
        }
    }

    addAlbum(album){
        this.albums.push(album)
        this.notify("newAlbum", album);
    }

    addGenres(genres){
        const concatGenres = this.genres.concat(genres);
        let newSet = new Set();
        concatGenres.forEach(deltaGenre => newSet.add(deltaGenre));
        this.genres = Array.from(newSet); 
    }

    newSong(track){
        this.notify("newTrack", track);
    }

    deleteAlbum(album){
        this.albums = this.albums.filter( deltaAlbum => deltaAlbum !== album );
    }

    removed(){
        this.notify("deletedArtist");
    }


}
new Artist(id= 1);

module.exports = {
    Artist: Artist,
  };