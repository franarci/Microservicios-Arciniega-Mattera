//const { UNQfy } = require('../unqfy')

class Command{
    
    executeMethod(){
        throw "Error, this method is not implemented";
    }
}

class AddArtist extends Command{
    
    executeMethod(lsParams, unqfy){
        var artist = new Object();
        artist.name = lsParams[0];
        artist.country = lsParams[1];
        unqfy.addArtist(artist);
    }
}

class GetArtistById extends Command{
    
    executeMethod(lsParams, unqfy){
        var id = lsParams[0];
        unqfy.getInstanceById(id, 'artist');
    }
}

class AddAlbum extends Command{
    
    executeMethod(lsParams, unqfy){
        var album = new Object();
        var artistId = lsParams[0]
        album.name = lsParams[1];
        album.year = lsParams[2];
        unqfy.addAlbum(artistId, album);
    }
}

class AddTrack extends Command{
    
    executeMethod(lsParams, unqfy){
        var track = new Object();
        track.name = lsParams[0];
        track.duration = lsParams[1];
        track.genre = lsParams[2];
        unqfy.addTrack(album);
    }
}

class CreateUser extends Command{
    
    executeMethod(lsParams, unqfy){
        var username = lsParams[0];
        unqfy.createUser(username);
    }
}

const commands = { // aca se van a ir mapeando los comandos
    addArtist: new AddArtist(),
    getArtistById: new GetArtistById(),
    addAlbum: new AddAlbum(),
    addTrack: new AddTrack(),
    getArtistById: new GetArtistById(), 
    createUser: new CreateUser()
}


module.exports = commands;