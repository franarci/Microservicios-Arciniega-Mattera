
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const { Playlist } = require('./src/domain-classes/playlist');
const { Album } = require('./src/domain-classes/album');
const { Track } = require('./src/domain-classes/track');
const { TrackList } = require('./src/domain-classes/tracklist');
const { Artist } = require('./src/domain-classes/artist');
const { User } = require('./src/domain-classes/user');
const { InstanceDoesNotExist,
        InstanceAlreadyExist } = require('./src/errors');
const artist = require('./src/domain-classes/artist');
const albumBelongs = require('./src/belongs-classes/albumBelongs');
const trackBelongs = require('./src/belongs-classes/trackBelongs');
const { ArtistBelongs } = require('./src/belongs-classes/artistBelongs');
const { AlbumBelongs } = require('./src/belongs-classes/albumBelongs');
const { PlaylistBelongs } = require('./src/belongs-classes/playlistBelongs');
const { TrackBelongs } = require('./src/belongs-classes/trackBelongs');
const { UserBelongs } = require('./src/belongs-classes/userBelongs');
const { isRegExp } = require('util');
/*
por el error 
node:internal/modules/cjs/loader:927
  throw err;
  ^
descomentar la siguiente linea
const { createSecureServer } = require('./node_modules/http2');
*/


class UNQfy {
	constructor(){
		this.artists = []
		this.tracks = []
		this.playlists = []
		this.albums = []
		this.users = []
		this.artistIdGenerator = 0
		this.trackIdGenerator = 0
		this.playlistIdGenerator = 0
		this.albumIdGenerator = 0
		this.userIdGenerator = 0
	}
	// artistData: objeto JS con los datos necesarios para crear un artista
	//   artistData.name (string)
	//   artistData.country (string)
	// retorna: el nuevo artista creado
	addArtist(artistData) {
	/* Crea un artista y lo agrega a unqfy.
	El objeto artista creado debe soportar (al menos):
	- una propiedad name (string)
	- una propiedad country (string)
	*/  
        const artistBelongs = new ArtistBelongs(this.artists)

        if(!artistBelongs.execute(artistData)){
			const artist = 
				new Artist(
					this.getAndIncrementId('artist'), 
					artistData.name, 
					artistData.country
				)
			this.artists.push(artist);
			return artist;
		} else {
			throw new InstanceAlreadyExist('artist', artistData.name);
		}
	}
	
	// albumData: objeto JS con los datos necesarios para crear un album
	//   albumData.name (string)
	//   albumData.year (number)
	// retorna: el nuevo album creado
	addAlbum(artistId, albumData) {
	/* Crea un album y lo agrega al artista con id artistId.
	El objeto album creado debe tener (al menos):
		- una propiedad name (string)
		- una propiedad year (number)*/
        const albumBelongs = new AlbumBelongs(this.albums);

        if(!albumBelongs.execute(albumData)){
            const album = 
                new Album(
                    this.getAndIncrementId('album'),
                    albumData.name,
                    this.getInstanceByAttribute(artistId, 'artist'),
                    albumData.year
                );
    
            const artist = this.getInstanceByAttribute(artistId, 'artist');
            artist.addAlbum(album);
            this.albums.push(album);
            return album;
        } else{
            throw new InstanceAlreadyExist('album', albumData.name);
        }
	}

	// trackData: objeto JS con los datos necesarios para crear un track
	//   trackData.name (string)
	//   trackData.duration (number)
	//   trackData.genres (lista de strings)
	// retorna: el nuevo track creado
	addTrack(albumId, trackData) {
	/* Crea un track y lo agrega al album con id albumId.
	El objeto track creado debe tener (al menos):
		- una propiedad name (string),
		- una propiedad duration (number),
		- una propiedad genres (lista de strings) */

        const trackBelongs = new TrackBelongs(this.tracks);
        const album = this.getInstanceByAttribute(albumId, 'album');
        const artist = album.getArtist();

        if(!trackBelongs.execute(trackData)){
            const track = 
                new Track(
                    this.getAndIncrementId('track'),
                    trackData.name,
                    trackData.duration,
                    album,
                    trackData.genres,
                    artist
                );
            
            album.addTrack(track);
            this.tracks.push(track);
            return track;
        } else {
            throw new InstanceAlreadyExist("track", trackData.name);
        }
    }

	// genres: array de generos(strings)
	// retorna: los tracks que contenga alguno de los generos en el parametro genres
	getTracksMatchingGenres(genres) {
		let res = [];
        this.tracks.map(track => {
            for(let genre of genres){
                if(track.genres.includes(genre)){
                    res.push(track);
                }
            }
        })
		const res1 = new Set(res)
		let result = [...res1]
		return result;
	}

	// artistName: nombre de artista(string)
	// retorna: los tracks interpredatos por el artista con nombre artistName
	getTracksMatchingArtist(artistName) {
        if(this.artists.some(artist => artist.name === artistName)){
            const artist = this.artists.find(artist => artist.name === artistName);
            let allTracks = [];
            artist.albums.map(album => allTracks.push(...album.tracks))
		    return allTracks;
        }
		else{
			throw new InstanceDoesNotExist('artist', artistName);
		}
	}

	//stringParcial: string
	//retorna: la busqueda por matching parcial de los artistas, albumes o tracks 
	getMatchingParcial(stringParcial){
		
		let matchingByArtist = this.artists.filter(artist => artist.name.match(stringParcial))/* artist.name.match(/stringParcial/gi) */
		let matchingByAlbum = this.albums.filter(album => album.name.match(stringParcial))
		let matchingByTrack = this.tracks.filter(track => track.name.match(stringParcial))
		
		return(matchingByArtist || matchingByAlbum || matchingByTrack)
	}
	

	// name: nombre de la playlist
	// genresToInclude: array de generos
	// maxDuration: duración en segundos
	// retorna: la nueva playlist creada
	createPlaylist(name, genresToInclude, maxDuration) {
	/*** Crea una playlist y la agrega a unqfy. ***
	El objeto playlist creado debe soportar (al menos):
		* una propiedad name (string)
		* un metodo duration() que retorne la duración de la playlist.
		* un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
	*/
		const playlistBelongs = new PlaylistBelongs(this.playlists)
		if(!playlistBelongs.execute(name)){

			let matchedTracks = this.getTracksMatchingGenres(genresToInclude)
			let durationLimit = maxDuration
			let playlistTracks = []
			let totalDuration = 0

			while(durationLimit>0 && matchedTracks.length>0){
				let randomN = Math.floor(Math.random() * matchedTracks.length);
				let randomTrack= matchedTracks[randomN]

				matchedTracks =	matchedTracks.filter( track => 
					track.name !== randomTrack.name
				)
				
				if(durationLimit - randomTrack.duration>=0){
					playlistTracks.push(randomTrack)
					durationLimit = durationLimit - randomTrack.duration
					totalDuration += randomTrack.duration
				}		
			}
		
			let playlist = new Playlist(
								this.getAndIncrementId('playlist'),
								name,
								playlistTracks,
								genresToInclude,
								totalDuration
							)
			this.playlists.push(playlist)
			return playlist
		 } else {
			throw new InstanceAlreadyExist('playlist', name);
		}
	}


	createUser(userName){
		if(!new UserBelongs(this.users).execute(userName)){
			let id = this.getAndIncrementId('user');
			let newser = new User(
				id,
			 	userName
			)
		   	this.users.push(newser);
			return newser;
		} 
		else {
			 throw new InstanceAlreadyExist('user', userName);
		}
    }

	getUser(userToSearch){ // se puede reemplazar por getInstanceByAttribute
		let userName = userToSearch.username
		if(this.users.some(user => user.username == userName)){
			return this.users.find(u => u.username ==userName)
		} else {
			throw new InstanceDoesNotExist('user', 'name', userName)
		}
	}
 
	getTrack(trackToSearch){ // se puede reemplazar por getInstanceByAttribute
		let trackName = trackToSearch.name 
		if(this.tracks.some(track => track.name == trackName)){
			 return this.tracks.find(t => t.name == trackName)
		} else {
			 throw new InstanceDoesNotExist('track', 'name', trackName)
		}
	}
 
	listenTrack(userToSearch, track){
		 let user = this.getUser(userToSearch)
		 user.listenTrack(this.getTrack(track))
		 return user
	}
 
	getListened(user){
		 return this.getUser(user).getListened()
	}
 
	timesListened(userToSearch, trackToSearch){
		 let track = this.getTrack(trackToSearch)
		 return this.getUser(userToSearch).timesListened(track)
	}

    deleteTrack(track){
        const albumOfTrack = track.album;
        
        albumOfTrack.deleteTrack(track);

        this.tracks = this.tracks.filter( deltaTrack => !deltaTrack === track );
    }

    deleteAlbum(album){
        const artistOfAlbum = album.artist;

        artistOfAlbum.deleteAlbum(album);
        album.tracks.forEach( deltaTrack => this.deleteTrack(deltaTrack) ); // vacio el album y actualizo la lista de tracks de unqfy
        this.albums = this.albums.filter( deltaAlbum => !deltaAlbum === album ); // actualizo la lista de albums de unqfy
    }
    
    deleteArtist(artist){
        this.artists = this.artists.filter( deltaArtist => !deltaArtist === artist );
        artist.albums.forEach( deltaAlbum => this.deleteAlbum(deltaAlbum) );
    }

    deletePlaylist(playlistId){}

	save(filename) {
        const serializedData = picklify.picklify(this);
        fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
	}

	static load(filename) {
        const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
        //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
        const classes = [UNQfy, 
                        Playlist, 
                        Artist, 
                        Album, 
                        Track, 
                        TrackList,
                        User,
                        ArtistBelongs,
                        AlbumBelongs,
                        PlaylistBelongs,
                        TrackBelongs,
                        UserBelongs
                    ];
        return picklify.unpicklify(JSON.parse(serializedData), classes);
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	getAndIncrementId(input){
        const attribute = `${input}IdGenerator`;
        const ret = this[attribute] ;
        this[attribute]++ ;
		
		return ret;
	}
//                         2            Track            
    getInstanceByAttribute(atributeP, classOfInstance, atributeName='id') {
        let atribute = atributeP;
        if(atributeName='id'){atribute = parseInt(atribute);}
        const listOfInstances = `${classOfInstance}s`;

        if( this[listOfInstances].some(instance => instance[atributeName] == atribute) ){
			return this[listOfInstances].find(instance => instance[atributeName] == atribute);
		} else{
			throw new InstanceDoesNotExist(classOfInstance,atributeName, atribute);
		}
    }
    /*    
//                                  Track/Album                   artist        metallica   
    getInstancesMatchingByAttribute(classOfReturnedInstances, attributeName, attributeValue){
        let ret = [];
        
        if(this[`${attributeName}s`].some(instance => instance.name.localeCompare(attributeValue)) == 0){
            ret = this[`${classOfReturnedInstances}s`].filter(instance => instance[attributeName].localeCompare(attributeValue) == 0);
            let allInstances = [];
            instance[attributeName]()
        }
        return ret;
    } 
    
tracks matching by artist
    if(this.artists.some(artist => artist.name === artistName)){
            const artist = this.artists.find(artist => artist.name === artistName);
            let allTracks = [];
            artist.albums.map(album => allTracks.push(...album.tracks))
		    return allTracks;
        }
		else{
			throw new InstanceDoesNotExist('artist', artistName);
		}
 */
    getTracksMatchingName(trackName) {
        let ret = [];
        this.tracks.map(track => {
            if(track.name == trackName){
                ret.push(track);
            }
        });
        
        if(ret.length == 0){throw new InstanceDoesNotExist('track', 'name',trackName)};
        
        return ret;
    } 
    

    getAlbumsMatchingName(albumName){
        let ret = [];
        this.albums.map(album => {
            if(album.name == albumName){
                ret.push(album);
            }
        });
        
        if(ret.length == 0){throw new InstanceDoesNotExist('album', 'name', albumName)};
        
        return ret;
    }


}



// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
    UNQfy: UNQfy,
};

