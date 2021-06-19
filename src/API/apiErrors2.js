const {InstanceDoesNotExist, InstanceAlreadyExist} = require('../errors')

class APIError extends Error {
    constructor(statusCode, errorCode, message = null) {
        super(null);
        this.status = statusCode;
        this.errorCode = errorCode;
        this.message = message
    }
}
 
class AlreadyExists_ERROR extends APIError {
    constructor() {
        super(409, 'RESOURCE_ALREADY_EXISTS', "Resource already exists");
    }  
}

class NonExistentRelated_ERROR extends APIError {
    constructor() {
        super(404, 'RELATED_RESOURCE_NOT_FOUND', "Related resource does not exist");
    }
}

class NonExistent_ERROR extends APIError {
    constructor() {
        super(404, 'RESOURCE_NOT_FOUND', "Resource does not exist");
    }
}

class URL_InvalidInexistent_ERROR extends APIError {
    constructor() {
        super(404, 'RESOURCE_NOT_FOUND');
    }  
}

class Invalid_ERROR extends APIError {
    constructor() {
        super(400, 'BAD_REQUEST', "Invalid JSON, invalid input key or missing parameter");
    }  
}

class UNEXPECTED_Failure_ERROR extends APIError {
    constructor() {
        super(500, 'INTERNAL_SERVER_ERROR');
    }  
}

function errorHandler(error, request, res, next){
    console.error(error);
    const errMsg = error.message;
    var err;


    if(error.type === 'entity.parse.failed' || errMsg === 'InvalidInputKey' || errMsg === "MissingParameter"){
        err = new Invalid_ERROR();
        res.status(err.status).json({status: err.status, errorCode: err.errorCode});
    }
    else if(error instanceof InstanceDoesNotExist) {
        err = new NonExistent_ERROR();
        res.status(err.status).json({status: err.status, errorCode: err.errorCode});
    }
    else if (errMsg === 'RelatedResourceNotFound'){
        err = new NonExistentRelated_ERROR;
        res.status(err.status).json({status: err.status, errorCode: err.errorCode});
    }
    else if (error instanceof InstanceAlreadyExist) {
        err = new AlreadyExists_ERROR;
        res.status(err.status).json({status: err.status, errorCode: err.errorCode})
    } else{
        err = new UNEXPECTED_Failure_ERROR;
        res.status(err.status).json({status: err.status, errorCode: err.errorCode})
    }
}
module.exports = {errorHandler}