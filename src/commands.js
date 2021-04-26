//const { UNQfy } = require('../unqfy')

class Command{
    
    executeMethod(){
        throw "Error, this method is not implemented"
    }
}

class AddArtist extends Command{
    
    executeMethod(lsParams, unqfy){
        var n_ame = lsParams[0]
        var country = lsParams[1]
        unqfy.addArtist({n_ame, country})
    }
}

const commands = { // aca se van a ir mapeando los comandos
    addArtist: new AddArtist() 
}


module.exports = commands