class APIError extends Error {
    constructor(name, statusCode, errorCode, message = null) {
      super(message || name);
      this.name = name;
      this.status = statusCode;
      this.errorCode = errorCode;
    }
}
 
class AlreadyExists_Error extends APIError {
    constructor(className) {
        super(`The${className}AlreadyExists`, 409, 'RESOURCE_ALREADY_EXISTS');
    }  
}

class AddAlbumToNonExistentArtist_Error extends APIError {
    constructor() {
        super('TheArtistDoesNotExists', 404, 'RELATED_RESOURCE_NOT_FOUND');
    }  
}

class URL_InvalidInexistent_Error extends APIError {
    constructor() {
        super('InvalidOrInexistentURL', 404, 'RESOURCE_NOT_FOUND');
    }  
}

class DelGetPostInexistentAlbumOrArtist_Error extends APIError {
    constructor() {
        super('InvalidOrInexistentURL', 404, 'RESOURCE_NOT_FOUND');
    }  
}

class JSON_Invalid_Error extends APIError {
    constructor() {
        super('InvalidJSONError', 400, 'BAD_REQUEST');
    }  
}

class JSON_MissingParameter_Error extends APIError {
    constructor() {
        super('MissingParameterError', 400, 'BAD_REQUEST');
    }  
}

class UnexpectedFailure_Error extends APIError {
    constructor() {
        super('UnexpectedFailure', 500, 'INTERNAL_SERVER_ERROR');
    }  
}

class UnexpectedFailure_Error extends APIError {
    constructor() {
        super('UnexpectedFailure', 404, 'RESOURCE_NOT_FOUND');
    }  
}