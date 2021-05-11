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
        console.log(unqfy.getInstanceByAttribute(id, 'artist'));
    }
}

class GetInstanceByNameAndArtist extends Command{ //este se usara para track y album porque pide nombre y artista
    constructor(classOfInstance){
        super()
        this.classOfInstance = classOfInstance
    }

    executeMethod(lsParams, unqfy){
        const name = lsParams[0];
        const artistName = lsParams[1];
        let lsInstances = [];

        if(this.classOfInstance == 'album'){
            lsInstances = unqfy.getAlbumsMatchingName(name);
        }
        if(this.classOfInstance == 'track'){
            lsInstances = unqfy.getTracksMatchingName(name);
        }
        
        // busco en los matches de nombre el que machee con el artista pasado
        console.log(lsInstances.find(instance => instance.artist.name === artistName));

        //pero esto solo aplica para tracks, hay que hacer el metodo generico en unqfy para que pueda aplicar para ambos
    }
}

class GetArtistByName extends Command{
    
    executeMethod(lsParams, unqfy){
        const name = lsParams[0];
        console.log(unqfy.getInstanceByAttribute(name, 'artist', 'name'));
    }
} 

class GetPlaylistByNameAndUser extends Command{

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
        track.albumId = lsParams[1]
        track.duration = lsParams[2];
        track.genre = JSON.parse(lsParams[3]);
        
        console.log(track.genre);
        unqfy.addTrack(track.albumId, {name: track.name, duration: track.duration, genre: track.genre});
    }
}

class CreateUser extends Command{
    
    executeMethod(lsParams, unqfy){
        var username = lsParams[0];
        unqfy.createUser(username);
    }
}

class ListenTrack extends Command{
    executeMethod(lsParams, unqfy){
        let userName = lsParams[0]
        let trackName = lsParams[1]
        unqfy.listenTrack(userName, trackName)
    }
}

class GetListened extends Command{
    executeMethod(lsParams, unqfy){
        let userName = lsParams[0]
        unqfy.getListened(userName)
    }
}

class TimesListened extends Command{
    executeMethod(lsParams, unqfy){
        let userName = lsParams[0]
        let trackName = lsParams[1]
        unqfy.getListened(userName, trackName)
    }
}

class GetInstanceById extends Command{
    constructor(classOfInstance){
        super(),
        this.classOfInstance = classOfInstance
    }

    executeMethod(lsParams, unqfy){
        var id = lsParams[0];
        console.log(unqfy.getInstanceByAttribute(id, 'album'));
    }
}

    class GetMatchingParcial{

        executeMethod(lsParams, unqfy){
            let stringParcial = lsParams[0]
            console.log(unqfy.getMatchingParcial(stringParcial))
        }
        
    }  


const commands = { // aca se van a ir mapeando los comandos
    addArtist: new AddArtist(),
    getArtistById: new GetArtistById(),
    addAlbum: new AddAlbum(),
    addTrack: new AddTrack(),
    createUser: new CreateUser(),
    listenTrack: new ListenTrack(),
    getListened: new GetListened(),
    timesListened: new TimesListened(),
    getAlbum: new GetInstanceByNameAndArtist('album'),
    getTrack: new GetInstanceByNameAndArtist('track'),

    getArtist: new GetArtistByName(),
    getPlaylist: new GetPlaylistByNameAndUser(),

    getAlbumById: new GetInstanceById('album'),
    getMatchingParcial: new GetMatchingParcial('stringParcial')
}


module.exports = commands;