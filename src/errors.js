const { Track } = require("./domain-classes/track")

class InstanceAlreadyExist extends Error{
    constructor(className){
        super(`That ${className} already exist`);
    }
}

//////////////////////////////////////////////////////////

class InstanceDoesNotExist extends Error{
    constructor(atribute, className){
        super(`The ${className} with name ${atribute} does not exist`)
    }
}

module.exports = {
    InstanceDoesNotExist: InstanceDoesNotExist,
    InstanceAlreadyExist: InstanceDoesNotExist
}