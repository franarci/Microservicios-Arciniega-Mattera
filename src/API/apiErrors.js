class APIError extends Error {
    constructor(name, statusCode, errorCode, message = null) {
      super(message || name);
      this.name = name;
      this.status = statusCode;
      this.errorCode = errorCode;
    }
}
 
class AlreadyExists_ERROR extends APIError {
    constructor(className) {
        super(`The${className}AlreadyExists`, 409, 'RESOURCE_ALREADY_EXISTS');
    }  
}

class AddAlbumToNonExistentArtist_ERROR extends APIError {
    constructor() {
        super('TheArtistDoesNotExists', 404, 'RELATED_RESOURCE_NOT_FOUND');
    }  
}

class URL_InvalidInexistent_ERROR extends APIError {
    constructor() {
        super('InvalidOrInexistentURL', 404, 'RESOURCE_NOT_FOUND');
    }  
}

class ALBUMARTIST_DelGetPostInexistent_ERROR extends APIError {
    constructor() {
        super('InvalidOrInexistentURL', 404, 'RESOURCE_NOT_FOUND');
    }  
}

class JSON_Invalid_ERROR extends APIError {
    constructor() {
        super('InvalidJSONError', 400, 'BAD_REQUEST');
    }  
}

class JSON_MissingParameter_ERROR extends APIError {
    constructor() {
        super('MissingParameterError', 400, 'BAD_REQUEST');
    }  
}

class UNEXPECTED_Failure_ERROR extends APIError {
    constructor() {
        super('UnexpectedFailure', 500, 'INTERNAL_SERVER_ERROR');
    }  
}

class LYRICS_DoesntMatch_ERROR extends APIError {

    constructor() {
        super('TheSongWithThisLyricsDoesNotExists', 404, 'RESOURCE_NOT_FOUND');
    }  
}

class PLAYLIST_AddInexistentTrack_ERROR extends APIError {
    constructor() {
        super('TheSongWithThisLyricsDoesNotExists', 404, 'RESOURCE_NOT_FOUND');
    }  
}

class PLAYLIST_DelGetInexistent_ERROR extends APIError {
    constructor() {
        super('TheSongWithThisLyricsDoesNotExists', 404, 'RESOURCE_NOT_FOUND');
    }  
}

class PLAYLIST_MissingParameter_ERROR extends APIError {
    constructor() {
        super('TheSongWithThisLyricsDoesNotExists', 404, 'RESOURCE_NOT_FOUND');
    }  
}

function errorHandler(err, req, res){
    // Chequeamos que tipo de error es y actuamos en consecuencia
    if (err instanceof AlreadyExists_ERROR ){
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else if (err instanceof URL_InvalidInexistent_ERROR ){
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else if (err instanceof LYRICS_DoesntMatch_ERROR ){
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else if (err instanceof AddAlbumToNonExistentArtist_ERROR ){
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else if (err instanceof ALBUMARTIST_DelGetPostInexistent_ERROR ){
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else if (err instanceof JSON_Invalid_ERROR ){
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else if (err instanceof JSON_MissingParameter_ERROR ){
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else if (err instanceof PLAYLIST_AddInexistentTrack_ERROR ){
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else if (err instanceof PLAYLIST_DelGetInexistent_ERROR ){
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else if (err instanceof PLAYLIST_MissingParameter_ERROR ){
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else if (err instanceof UNEXPECTED_Failure_ERROR ){
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else {
      // continua con el manejador de errores por defecto
        next(err);
    } 
}

module.exports = {
    AlreadyExists_ERROR: AlreadyExists_ERROR,
    URL_InvalidInexistent_ERROR: URL_InvalidInexistent_ERROR,
    LYRICS_DoesntMatch_ERROR: LYRICS_DoesntMatch_ERROR,
    
    AddAlbumToNonExistentArtist_ERROR: AddAlbumToNonExistentArtist_ERROR,
    ALBUMARTIST_DelGetPostInexistent_ERROR: ALBUMARTIST_DelGetPostInexistent_ERROR,
    
    JSON_Invalid_ERROR: JSON_Invalid_ERROR,
    JSON_MissingParameter_ERROR: JSON_MissingParameter_ERROR,
    
    PLAYLIST_AddInexistentTrack_ERROR: PLAYLIST_AddInexistentTrack_ERROR,
    PLAYLIST_DelGetInexistent_ERROR: PLAYLIST_DelGetInexistent_ERROR,
    PLAYLIST_MissingParameter_ERROR: PLAYLIST_MissingParameter_ERROR,
    
    UNEXPECTED_Failure_ERROR: UNEXPECTED_Failure_ERROR,

    errorHandler,
}