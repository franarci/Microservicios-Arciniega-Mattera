const { Track } = require("./domain-classes/track")

class UsernameAlreadyExist extends Error{
    constructor(){
        super('That username already exist')
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

class ArtistAlreadyExist extends Error{
    constructor(){
        super('That artist already exist')
    }
}

//////////////////////////////////////////////////

class InstanceDoesNotExist extends Error{
    constructor(atribute, className){
        super(`The ${className} with name ${atribute} does not exist`)
    }
}


module.exports = {
    InstanceDoesNotExist: InstanceDoesNotExist,

    ArtistAlreadyExist: ArtistAlreadyExist,
    AlbumAlreadyExists: AlbumAlreadyExists,
    TrackAlreadyExists: TrackAlreadyExists,
    UsernameAlreadyExist: UsernameAlreadyExist
    
}