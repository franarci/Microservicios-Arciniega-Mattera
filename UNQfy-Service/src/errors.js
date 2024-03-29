class InstanceAlreadyExist extends Error{
    constructor(className, name){
        super(`The ${className} with name ${name} already exist`);
    }
}

class InstanceDoesNotExist extends Error{
    constructor(className, field, value){
        super(`The ${className} with ${field} ${value} does not exist`)
    }
}

class InstanceRequestedByIndirectAttributeDoesNotExist extends Error{
    constructor(className, knownClass, attributeOfKnownClass, value){
        super(`The ${className} with ${knownClass} ${attributeOfKnownClass} ${value} does not exist`)
    }
}

module.exports = {
    InstanceDoesNotExist: InstanceDoesNotExist,
    InstanceAlreadyExist: InstanceAlreadyExist,
    InstanceRequestedByIndirectAttributeDoesNotExist: InstanceRequestedByIndirectAttributeDoesNotExist
}