class APIError extends Error {
    constructor(statusCode, errorCode, message = null) {
        super(null);
        this.status = statusCode;
        this.errorCode = errorCode;
        this.message = message
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


function errorHandler(){}

module.exports = {errorHandler}