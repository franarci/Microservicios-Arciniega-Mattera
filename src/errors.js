const { Track } = require("./domain-classes/track")

class InstanceAlreadyExist extends Error{
    constructor(className, name){
        super(`The ${className} with name ${name} already exist`);
    }
}

//////////////////////////////////////////////////////////
/*
la clase className 
con el campo field
y el valor value
no existe
*/
class InstanceDoesNotExist extends Error{
    constructor(className, field, value){
        super(`The ${className} with ${field} ${value} does not exist`)
    }
}

module.exports = {
    InstanceDoesNotExist: InstanceDoesNotExist,
    InstanceAlreadyExist: InstanceAlreadyExist
}