const { Track } = require("./domain-classes/track")

class InstanceAlreadyExist extends Error{
    constructor(className, name){
        super(`The ${className} with name ${name} already exist`);
    }
}

//////////////////////////////////////////////////////////

class InstanceDoesNotExist extends Error{
    constructor(className, field, atribute){
        super(`The ${className} with ${field} ${atribute} does not exist`)
    }
}

module.exports = {
    InstanceDoesNotExist: InstanceDoesNotExist,
    InstanceAlreadyExist: InstanceDoesNotExist
}