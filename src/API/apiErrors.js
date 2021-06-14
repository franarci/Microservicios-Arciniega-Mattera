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
        super(`InvalidOrInexistent${className}`, 404, 'RESOURCE_NOT_FOUND');
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

function errorHandler(error, req, res){
    if (err.messageor.message == `The artist with name ${req.query.name} already exist`){ // -------                                                                                                               
        const err = new AlreadyExists_ERROR('Artist');//                                           |                                                                     
        res.status(err.status);//                                                                  |                                             
        res.json({status: err.status, errorCode: err.errorCode});//                                |                                                                             
    } else if (error.message == `The album with name ${req.query.name} already exist`){//       REFACTOR                                                                                                     
        const err = new AlreadyExists_ERROR('Album');//                                            |                                                                 
        res.status(err.status);//                                                                  |                                             
        res.json({status: err.status, errorCode: err.errorCode});//                                |                                                                             
    } //--------------------------------------------------------------------------------------------                                                                                                                
    else if (req.body == ''){
        const err = new URL_InvalidInexistent_ERROR();
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else if (error.message == ''){
        const err = new LYRICS_DoesntMatch_ERROR();
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } // -----------------------------------------------------------------------------------------------
    else if (error.message == `The artist with id ${req.body.artistId} does not exist`){//             |
        const err = new AddAlbumToNonExistentArtist_ERROR('Artist');//                                 |
        res.status(err.status);//                                                                      |         
        res.json({status: err.status, errorCode: err.errorCode});//                                    |   
    } else if (error.message == `The artist with id ${req.params.id} does not exist`){//               | 
        const err = new ALBUMARTIST_DelGetPostInexistent_ERROR('Album');//                             | 
        res.status(err.status);//                                                                      |                         
        res.json({status: err.status, errorCode: err.errorCode});//                                    |                 
    } else if (error.message == `The artist with name ${req.query.name} does not exist`){//            |                             
        const err = new ALBUMARTIST_DelGetPostInexistent_ERROR('Album');//                          REFACTOR     
        res.status(err.status);//                                                                      |                         
        res.json({status: err.status, errorCode: err.errorCode});//                                    |                 
    } else if (error.message == `The album with id ${req.params.id} does not exist`){//                |                                 
        const err = new ALBUMARTIST_DelGetPostInexistent_ERROR('Album');//                             |                 
        res.status(err.status);//                                                                      |                                 
        res.json({status: err.status, errorCode: err.errorCode});//                                    |                 
    } else if (error.message == `The album with name ${req.query.name} does not exist`){//             |                             
        const err = new ALBUMARTIST_DelGetPostInexistent_ERROR('Album');//                             |                             
        res.status(err.status);//                                                                      |                                     
        res.json({status: err.status, errorCode: err.errorCode});//                                    |                                                                 
    }//------------------------------------------------------------------------------------------------- 
    else if (error.message == `The track with name ${req} does not exist`){ //como traigo el nombre del track que no existe
        const err = new PLAYLIST_AddInexistentTrack_ERROR();
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else if (error.message == `The playilist with id ${req.params.id} does not exist`){
        const err = new PLAYLIST_DelGetInexistent_ERROR();
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else if (error.message == ''){
        const err = new PLAYLIST_MissingParameter_ERROR();
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else if (error.message == ''){
        const err = new UNEXPECTED_Failure_ERROR();
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else {
      // continua con el manejador de errores por defecto
        next(err);
    } 
}

const keysOfBody_POST_PATCH_apiArtists = ['name', 'country'];

const keysOfBody_POST_apiAlbums = ['artistId', 'name', 'year'];
const keysOfBody_PATCH_apiArtists = ['year'];

const keysOfBody_PATCH_apiPlaylists = ['name', 'maxDuration', 'genres'];
const keysOfBody_POST_apiPlaylists = ['name', 'tracks'];

function jsonShapeChecker(jsonKeys, referenceKeys){
    if(jsonKeys != referenceKeys){
        const err = new JSON_Invalid_ERROR();
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    } else{
        const err = new JSON_MissingParameter_ERROR();
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
    }
}

function JSONerrorHandler(req){
    const requestShape = `${req.method} ${req.oririnalUrl}`;
    if(requestShape == 'POST /api/artists' || requestShape == `PATCH /api/artists/${req.params.id}`){
        jsonShapeChecker(req.body.keys(), keysOfBody_POST_PATCH_apiArtists);
    } else if (requestShape == 'POST /api/albums'){
        jsonShapeChecker(req.body.keys(), keysOfBody_POST_apiAlbums);
    } else if (requestShape == `PATCH /api/albums/${req.params.id}`){
        jsonShapeChecker(req.body.keys(), keysOfBody_PATCH_apiAlbums);
    } else if (req.body.keys() == keysOfBody_PATCH_apiPlaylists){
        jsonShapeChecker(req.body.keys(), keysOfBody_PATCH_apiPlaylists);
    } else if (req.body.keys() == keysOfBody_POST_apiPlaylists){
        jsonShapeChecker(req.body.keys(), keysOfBody_POST_apiPlaylists);
    }
} 

module.exports = {errorHandler, JSONerrorHandler}