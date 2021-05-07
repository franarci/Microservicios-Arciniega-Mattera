const { Track } = require("./domain-classes/track")

class ArtistAlreadyExist extends Error{
    constructor(){
        super('That artist already exist')
    }
}

class ArtistDoesNotExist extends Error{
    constructor(id){
        super(`The artist with id ${id} does not exist`)
    }

}

class ArtistNameDoesNotExist extends Error {
    constructor(artistName){
        super(`The artist with name ${artistName} does not exist`)
    }
}

class ThisAlbumDoesNotExist extends Error{
    constructor(id){
        super(`The album doesn't exist`)
    }
}

class UsernameAlreadyExist extends Error{
    constructor(){
        super('That username already exist')
    }
}

class UserDoesNotExist extends Error{
    constructor(userName){
        super(`The user with name ${userName} does not exist`)
    }
}

class TrackDoesNotExist extends Error{
    constructor(trackName){
        super(`The track with name ${trackName} does not exist`)
    }
}

class AlbumAlreadyExists extends Error{
    constructor(){
        super('That album already exist')
    }
}

class TrackAlreadyExists extends Error{
    constructor(){
        super('That track already exist')
    }
}

module.exports = {
    ArtistAlreadyExist: ArtistAlreadyExist,
    ArtistDoesNotExist: ArtistDoesNotExist,
    ArtistNameDoesNotExist: ArtistNameDoesNotExist,
    ThisAlbumDoesNotExist: ThisAlbumDoesNotExist,
    UsernameAlreadyExist: UsernameAlreadyExist,
    AlbumAlreadyExists: AlbumAlreadyExists,
    TrackAlreadyExists: TrackAlreadyExists,
    UserDoesNotExist: UserDoesNotExist,
    TrackDoesNotExist: TrackDoesNotExist
}