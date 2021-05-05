//const { UNQfy } = require('../unqfy')

class Command{
    
    executeMethod(){
        throw "Error, this method is not implemented"
    }
}

class AddArtist extends Command{
    
    executeMethod(lsParams, unqfy){
        var artist = new Object()
        artist.name = lsParams[0]
        artist.country = lsParams[1]
        unqfy.addArtist(artist)
    }
}

class GetArtistById extends Command{
    
    executeMethod(lsParams, unqfy){
        var id = lsParams[0]
        unqfy.getArtistById(id)
    }
}

class AddAlbum extends Command{
    
    executeMethod(lsParams, unqfy){

    }
}

class AddTrack extends Command{
    
    executeMethod(lsParams, unqfy){

    }
}

const commands = { // aca se van a ir mapeando los comandos
    addArtist: new AddArtist(),
    getArtistById: new GetArtistById(),
    addAlbum: new AddAlbum(),
    addTrack: new AddTrack()
}


module.exports = commands