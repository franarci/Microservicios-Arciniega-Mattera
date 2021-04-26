
class Artist {
    constructor(id, name, country){
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

module.exports = {
    Artist: Artist,
  };