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
        track.genre = lsParams.splice(3);
        
        console.log(track.genre);
        unqfy.addTrack(track.albumId, {name: track.name, duration: track.duration, genres: track.genre});
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

class GetPlaylistByName extends Command{

    executeMethod(lsParams, unqfy){
        const playlistName = lsParams[0];

        const lsPlaylistsMatching = unqfy.getPlaylistsMatchingName(playlistName);
        
        // busco en los matches de nombre el que machee con el artista pasado
        console.log(lsPlaylistsMatching[0]);
    }
}



class CreateUser extends Command{
    
    executeMethod(lsParams, unqfy){
        var username = lsParams[0];
        unqfy.createUser(username);
    }
}

class GetUser extends Command{
    executeMethod(lsParams,unqfy){
        const username = lsParams[0]
        console.log(unqfy.getInstanceByAttribute(username,'user','username'))
    }
}

class ListenTrack extends Command{
    executeMethod(lsParams, unqfy){
        let userName = lsParams[0]
        let trackName = lsParams[1]
        const user = unqfy.getInstanceByAttribute(userName, 'user', 'username')
        const track = unqfy.getInstanceByAttribute(trackName, 'track', 'name')
        unqfy.listenTrack(user,track)
        console.log("User ", userName, "listened ", trackName)
    }
    
}

class GetListened extends Command{
    executeMethod(lsParams, unqfy){
        let userName = lsParams[0]
        const user = unqfy.getInstanceByAttribute(userName, 'user', 'username')
        unqfy.getListened(user)
        console.log("Listened: ", unqfy.getListened(user))
    }
}

class TimesListened extends Command{
    executeMethod(lsParams, unqfy){
        let userName = lsParams[0]
        let trackName = lsParams[1]
        let user = unqfy.getInstanceByAttribute(userName, 'user', 'username')
        let track = unqfy.getInstanceByAttribute(trackName, 'track', 'name')
        unqfy.timesListened(user,track)
        console.log(userName, " listened ", unqfy.timesListened(user,track)," times ", trackName  )
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

class GetMatchingParcial extends Command{

    executeMethod(lsParams, unqfy){
        let stringParcial = lsParams[0]
        console.log(unqfy.getMatchingParcial(stringParcial))
    }
    
}  

class AddPlaylist extends Command{

    executeMethod(lsParams, unqfy){
        const name = lsParams[0];
        const user = unqfy.getInstanceByAttribute(lsParams[1], 'user', 'name');
        const maxDuration = lsParams[2];
        const genresToInclude = lsParams.slice(3);

        unqfy.createPlaylist(name, user, maxDuration, genresToInclude);
    }
}

class GetTracksMatchingArtist{

    executeMethod(lsParams, unqfy){
    let artistName = lsParams[0]
    console.log(unqfy.getTracksMatchingArtist(artistName))
    }
}

class GetTracksMatchingGenres{

    executeMethod(lsParams, unqfy){
        let genres = lsParams[0]
        console.log(unqfy.getTracksMatchingGenres(genres))
    }
}
    
class GetThisIs extends Command {
    executeMethod(lsParams, unqfy){
            let artistName = lsParams[0]
            const top3 = unqfy.getTop3FromArtist(unqfy.getInstanceByAttribute(artistName, 'artist', 'name'))
            console.log("This is ", artistName, ": ", top3)
    }
}

class Delete extends Command {
    constructor(classOfInstance) {
        super()
        this.classOfInstance = classOfInstance
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }      
    
    executeMethod(lsParams,unqfy){
        let name = lsParams[0]
        const classOfInstanceCapitalized = this.capitalizeFirstLetter(this.classOfInstance);

        unqfy[`delete${classOfInstanceCapitalized}`](unqfy.getInstanceByAttribute(name, this.classOfInstance, 'name'));

        console.log(`The ${this.classOfInstance} ${name} was deleted`);
    }
}

const commands = { // aca se van a ir mapeando los comandos
    addArtist: new AddArtist(),
    addAlbum: new AddAlbum(),
    addTrack: new AddTrack(),
    addPlaylist: new AddPlaylist(),

    deleteArtist: new Delete('artist'),
    deleteAlbum: new Delete('album'),
    deleteTrack: new Delete('track'),
    deletePlaylist: new Delete('playlist'),
    deleteUser: new Delete('user'),

    createUser: new CreateUser(),
    listenTrack: new ListenTrack(),
    timesListened: new TimesListened(),
    
    getArtistById: new GetArtistById(),
    getAlbumById: new GetInstanceById('album'),
    getUser: new GetUser(),
    
    getListened: new GetListened(),
    getAlbum: new GetInstanceByNameAndArtist('album'),
    getTrack: new GetInstanceByNameAndArtist('track'),
    getArtist: new GetArtistByName(),
    getPlaylist: new GetPlaylistByName(),

    getMatchingParcial: new GetMatchingParcial('stringParcial'),
    getAlbumById: new GetInstanceById('album'),
    getMatchingParcial: new GetMatchingParcial('stringParcial'),
    getTracksMatchingArtist: new GetTracksMatchingArtist('artist'),
    getTracksMatchingGenres: new GetTracksMatchingGenres('genres'),

    thisIs: new GetThisIs()
}


module.exports = commands;