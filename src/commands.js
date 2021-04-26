//const { UNQfy } = require('../unqfy')

class Command{
    
    executeMethod(){
        throw "Error, this method is not implemented"
    }
}

class AddArtist extends Command{
    
    executeMethod(lsParams, unqfy){
        var mapParams = {
            name: lsParams[0],
            country: lsParams[1]
        }
        unqfy.addArtist(mapParams)
    }
}

const commands = { // aca se van a ir mapeando los comandos
    addArtist: new AddArtist() 
}


module.exports = commands