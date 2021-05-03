
class Artist {
    constructor(id= null, name= null, country= null){
        this.id = id
        this.name = name
        this.country = country
        this.albums = []
        this.genres = []
    }

     getName(){
        return this.name
    }


}
new Artist(id= 1)


module.exports = {
    Artist: Artist,
  };