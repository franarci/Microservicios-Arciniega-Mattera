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

module.exports = {
    ArtistAlreadyExist: ArtistAlreadyExist,
    ArtistDoesNotExist: ArtistDoesNotExist,
    ArtistNameDoesNotExist: ArtistNameDoesNotExist
}