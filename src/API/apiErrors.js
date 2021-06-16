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
    constructor(className) {
        super(`InvalidOrInexistent${className}`, 404, 'RESOURCE_NOT_FOUND', 'hola pepe');
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

function errorHandler(error, request, res, next){
    const reqQueryName = request.query.name;
    const reqBody = request.body;
    const reqParamsId = request.params.id;
    const errMsg = error.message;

    const artistName_DoesNot_ExistsMessage = `The artist with name ${reqQueryName} does not exist`;
    const artistName_Already_ExistsMessage = `The artist with name ${reqQueryName} already exist`;
    const artistID_Body_DoesNot_ExistsMessage = `The artist with id ${reqBody.artistId} does not exist`;
    const artistID_Params_DoesNot_ExistsMessage = `The artist with id ${reqParamsId} does not exist`;

    const albumName_DoesNot_ExistsMessage = `The album with name ${reqQueryName} does not exist`;
    const albumName_Already_ExistsMessage = `The album with name ${reqQueryName} already exist`;
    const albumID_DoesNot_ExistsMessage = `The album with id ${reqParamsId} does not exist`;

    if(!request.query){
        if (errMsg == artistName_Already_ExistsMessage){ 
            const err = new AlreadyExists_ERROR('Artist');
            res.status(err.status).json({status: err.status, errorCode: err.errorCode});
        } else if (errMsg == albumName_Already_ExistsMessage){
            const err = new AlreadyExists_ERROR('Album');
            res.status(err.status).json({status: err.status, errorCode: err.errorCode});
        } else if (errMsg == artistName_DoesNot_ExistsMessage){
            const err = new ALBUMARTIST_DelGetPostInexistent_ERROR('Album');
            res.status(err.status).json({status: err.status, errorCode: err.errorCode});
        }
    }
    else if(!!reqBody && !reqBody){
        if (errMsg == artistID_Body_DoesNot_ExistsMessage){
            const err = new AddAlbumToNonExistentArtist_ERROR('Artist');
            res.status(err.status).json({status: err.status, errorCode: err.errorCode});
        }
    }
    else if(!!request.params){
        if (errMsg == artistID_Params_DoesNot_ExistsMessage){
            const err = new ALBUMARTIST_DelGetPostInexistent_ERROR('Album');
            res.status(err.status).json({status: err.status, errorCode: err.errorCode});
        } else if (errMsg == albumID_DoesNot_ExistsMessage){
            const err = new ALBUMARTIST_DelGetPostInexistent_ERROR('Album');
            res.status(err.status).json({status: err.status, errorCode: err.errorCode});
        } else if (errMsg == `The playilist with id ${reqParamsId} does not exist`){
            const err = new PLAYLIST_DelGetInexistent_ERROR();
            res.status(err.status).json({status: err.status, errorCode: err.errorCode});
        }
    }
    else if(!!request.query){
        if (errMsg == albumName_DoesNot_ExistsMessage){
            const err = new ALBUMARTIST_DelGetPostInexistent_ERROR('Album');
            res.status(err.status).json({status: err.status, errorCode: err.errorCode});
        }    
    }

    else if (errMsg == ''){
        const err = new LYRICS_DoesntMatch_ERROR();
        res.status(err.status).json({status: err.status, errorCode: err.errorCode});
    } 
    /* else if (errMsg == `The track with name ${} does not exist`){ //como traigo el nombre del track que no existe
        const err = new PLAYLIST_AddInexistentTrack_ERROR();
        res.status(err.status).json({status: err.status, errorCode: err.errorCode});
    } */
    else if (errMsg == ''){
        const err = new PLAYLIST_MissingParameter_ERROR();
        res.status(err.status).json({status: err.status, errorCode: err.errorCode});
    } else if (errMsg == ''){
        const err = new UNEXPECTED_Failure_ERROR();
        res.status(err.status).json({status: err.status, errorCode: err.errorCode});
    } else {
      // continua con el manejador de errores por defecto
        next(error);
    } 
}

const keysOfBody_POST_PATCH_apiArtists = ['name', 'country'];

const keysOfBody_POST_apiAlbums = ['artistId', 'name', 'year'];
const keysOfBody_PATCH_apiAlbums = ['year'];

const keysOfBody_POST_apiPlaylists_genres = ['name', 'maxDuration', 'genres'];
const keysOfBody_POST_apiPlaylists_tracks = ['name', 'tracks'];

function jsonShapeChecker(jsonKeys, referenceKeys){
    if(jsonKeys != referenceKeys){
        const err = new JSON_Invalid_ERROR();
        res.status(err.status).json({status: err.status, errorCode: err.errorCode});
    } else{
        const err = new JSON_MissingParameter_ERROR();
        res.status(err.status).json({status: err.status, errorCode: err.errorCode});
    }
}

function JSONerrorHandler(req){
    const data = req;
    const bodyJSONKeys = data.body.keys();

    const requestShape = `${data.method} ${data.originalUrl}`;
    if(requestShape == 'POST /api/artists' || requestShape == `PATCH /api/artists/${data.params.id}`){
        jsonShapeChecker(bodyJSONKeys, keysOfBody_POST_PATCH_apiArtists);
    } else if (requestShape == 'POST /api/albums'){
        jsonShapeChecker(bodyJSONKeys, keysOfBody_POST_apiAlbums);
    } else if (requestShape == `PATCH /api/albums/${req.params.id}`){
        jsonShapeChecker(bodyJSONKeys, keysOfBody_PATCH_apiAlbums);
    } else if (bodyJSONKeys == keysOfBody_POST_apiPlaylists_genres){
        jsonShapeChecker(bodyJSONKeys, keysOfBody_POST_apiPlaylists_genres);
    } else if (bodyJSONKeys == keysOfBody_POST_apiPlaylists_tracks){
        jsonShapeChecker(bodyJSONKeys, keysOfBody_POST_apiPlaylists_tracks);
    }
} 

function verifyURL(recivedURL, desiredURL, res){
    if(recivedURL != desiredURL){
        const err = new URL_InvalidInexistent_ERROR();
        res.status(err.status).json({status: err.status, errorCode: err.errorCode});
        throw err;
    }
}


module.exports = {errorHandler, JSONerrorHandler, verifyURL, URL_InvalidInexistent_ERROR:URL_InvalidInexistent_ERROR}