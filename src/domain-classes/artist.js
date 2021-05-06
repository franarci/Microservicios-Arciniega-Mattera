
class Artist {
    constructor(
            id= null, 
            name= null, 
            country= null
        ){
        
        this.id = id
        this.name = name
        this.country = country
        this.albums = []
        this.genres = []
    }

    getId(){return this.id;}
    getname(){return this.name;}
    getCountry(){return this.country;}
    getAlbums(){return this.albums;}
    getGenres(){return this.genres;}

    addAlbum(album){
        this.albums.push(album)
    }


}
new Artist(id= 1)


module.exports = {
    Artist: Artist,
  };