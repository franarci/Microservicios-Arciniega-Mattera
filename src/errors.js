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

module.exports = {
    ArtistAlreadyExist: ArtistAlreadyExist,
    ArtistDoesNotExist: ArtistDoesNotExist
}