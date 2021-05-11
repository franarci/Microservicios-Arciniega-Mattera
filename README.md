# Console commands

### Agregation commands
addArtist(artistName, country)
addAlbum(artistId, name, year)
addTrack(name, albumId, durationInsSegs, genres)
addPlaylist(name, userName, maxDurationInsSegs, genresToInclude)
createUser(username)

### Deletion commands
deleteArtist(name)
deleteAlbum(name)
deleteTrack(name)
deletePlaylist(name)
deleteUser(name)

### Action
listenTrack(username, trackName)
 
### Getters
getUser(username)
getListened(username)
getAlbum(name, artistName)
getTrack(name, artistName)
getArtist(name)
getPlaylist(name)
thisIs(artistName)
timesListened(username, trackName)

### Getters by Id
getArtistById(id)
getAlbumById(id)
getAlbumById(id)

### Getters by matching
getMatchingParcial(stringParcial)
getMatchingParcial(stringParcial)
getTracksMatchingArtist(artistName)
getTracksMatchingGenres(genres)
 
