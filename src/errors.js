const { Track } = require("./domain-classes/track")

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
    UserDoesNotExist: UserDoesNotExist,
    TrackDoesNotExist: TrackDoesNotExist
}