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

module.exports = {
    ArtistAlreadyExist: ArtistAlreadyExist,
    ArtistDoesNotExist: ArtistDoesNotExist,
    ArtistNameDoesNotExist: ArtistNameDoesNotExist,
    ThisAlbumDoesNotExist: ThisAlbumDoesNotExist
}