
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const { Playlist } = require('./src/domain-classes/playlist');
const { Album } = require('./src/domain-classes/album');
const { Track } = require('./src/domain-classes/track');
const { TrackList } = require('./src/domain-classes/tracklist');
const { Artist } = require('./src/domain-classes/artist');
const { User } = require('./src/domain-classes/user');
const {ArtistAlreadyExist, 
        ArtistDoesNotExist, 
        ArtistNameDoesNotExist, 
        ThisAlbumDoesNotExist,
		UsernameAlreadyExist } = require('./src/errors');
const artist = require('./src/domain-classes/artist');
const { ArtistBelongs } = require('./src/belongs-classes/artistBelongs');
const { AlbumBelongs } = require('./src/belongs-classes/albumBelongs');
const { PlaylistBelongs } = require('./src/belongs-classes/playlistBelongs');
const { TrackBelongs } = require('./src/belongs-classes/trackBelongs');
const { UserBelongs } = require('./src/belongs-classes/userBelongs');
const { createSecureServer } = require('./node_modules/http2');
//const artistBelongs = require('./src/belongs-classes/artistBelongs');


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

		//if(!this.belongs(artistData.name) && !this.belongs(artistData.country)){ 
        if(!artistBelongs.execute(artistData)){
			const artist = 
				new Artist(
					this.getAndIncrementId('artist'), 
					artistData.name, 
					artistData.country
				)
			this.artists.push(artist)
			//this.artistIdGenerator++
			return artist
		} else {
			throw new ArtistAlreadyExist
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
        album = 
            new Album(
                this.getAndIncrementId('album'),
                albumData.name,
                this.getArtistById(adtistId),
                albumData.year
            )

        const artist = this.getArtistById(artistId)
        artist.addAlbum(album)
        this.albums.push(album)
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
		track = 
			new Track(
				this.getAndIncrementId('track'),
				albumId,
				trackData.name,
				trackData.artist,
				trackData.genres
			)
		
        const album = this.getAlbumById(albumId)
        album.addTrack(track)
        this.tracks.push(track)
    }

	getArtistById(id){
		let _id = parseInt(id)
		if(this.artists.some(artist => artist.id == id)){
			//console.log('el artista que se busca es:')
			console.log(this.artists.find(a => a.id ==id))
			return this.artists.find(a => a.id ==id)
		} else{
			throw new ArtistDoesNotExist(id)
		}
	}

	getAlbumById(id) {
        let _id = parseInt(id)
        if(this.album.some(album => album.id == id)){
			//console.log('el artista que se busca es:')
			console.log(this.albums.find(a => a.id == id))
			return this.album.find(a => a.id == id)
		} else{
			throw new ThisAlbumDoesNotExist(id)
		}
    }

	getTrackById(id) {}

	getPlaylistById(id) {}

	// genres: array de generos(strings)
	// retorna: los tracks que contenga alguno de los generos en el parametro genres
	getTracksMatchingGenres(genres) {
		let res = []
        this.tracks.map(track => {
            for(let genre of genres){
                if(track.genres.includes(genre)){
                    res.push(track)
                }
            }
        })
        console.log(res)
		return res
	}


	// artistName: nombre de artista(string)
	// retorna: los tracks interpredatos por el artista con nombre artistName
	getTracksMatchingArtist(artistName) {
		if(this.artists.some(artist.name === artistName)){
		const artist = this.artists.find(artist => artist.name === artistName)
		let allTracks = [];
		artist.albums.map(album => allTracks.push(...album.tracks))
		console.log(allTracks)
		return allTracks}
		else{
			throw new ArtistNameDoesNotExist(artistName)
		}
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

	}

	createUser(userName){
		if(!new UserBelongs(this.users).execute(userName)){
			let id = this.getAndIncrementId('user');
			let newser = new User(
				id,
			 	userName
			);
		   	this.users.push(newser);
			return newser;
		} 
		else {
			 throw new UsernameAlreadyExist;
		}
   }

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
                        ArtistAlreadyExist, 
                        ArtistDoesNotExist, 
                        ArtistNameDoesNotExist,
						UsernameAlreadyExist,
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
        const attribute = `${input}IdGenerator`
        const ret = this[attribute]
        this[attribute]++ 
		
		return ret
	}
}


// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
    UNQfy: UNQfy,
};

