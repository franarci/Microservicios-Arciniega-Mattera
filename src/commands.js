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

class createUser extends Command{
    
    executeMethod(lsParams, unqfy){
        var username = lsParams[0]
        unqfy.createUser(username)
    }
}

const commands = { // aca se van a ir mapeando los comandos
    addArtist: new AddArtist(),
    getArtistById: new GetArtistById(), 
    createUser: new createUser()
}


module.exports = commands