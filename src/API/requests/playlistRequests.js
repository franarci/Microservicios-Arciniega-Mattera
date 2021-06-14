const express = require('express');
const {getUNQfy, saveUNQfy} = require('../../../main');
const { 
    errorHandler, 
    JSONerrorHandler,
    verifyURL } = require('../apiErrors');

const unqfy = getUNQfy();
const appPlaylist = express();
const router = express.Router();
router.use(express.json());

function getNotRecursiveTracks(recursiveTracksList){
    let ret = [];

    recursiveTracksList.forEach(trackRec => 
        ret.push({track_name:trackRec.name, track_duration:trackRec.duration})
    );

    return ret;
}

function standardJSONOutput(playlist){
    return {
        id: playlist.id,
        name: playlist.name,
        duration: playlist.duration,
        tracks: getNotRecursiveTracks(playlist.tracks),
    }
}

appPlaylist.use(errorHandler);
appPlaylist.use(JSONerrorHandler);
appPlaylist.use(verifyURL);
appPlaylist.use('/playlists', router);

// donde usar el UNEXPECTED_Failure_ERROR?
// donde usar el URL_InvalidInexistent_ERROR?

router.route('/')
    .post((req, res) => { // POST /api/playlist
        // ver si el json tiene la forma esperada JSON_Invalid_ERROR
        // ver si el json tiene valores en todas sus claves JSON_MissingParameter_ERROR
        try {
            
            if(req.body.keys.length==3){
                unqfy.createPlaylist(req.body.name, null, req.body.maxDuration, req.body.name.genres);
                const playlist = unqfy.getInstanceByAttribute(req.body.name, 'playlist', 'name'); 
                saveUNQfy(unqfy);
                
                res.status(201);
                res.send(standardJSONOutput(playlist));
            } else {
                let trackObjLs = [];
                req.body.tracks.forEach(trackName => {
                    const trackObj = unqfy.getInstanceByAttribute(trackName, 'track', 'name'); // track no existe
                    trackObjLs.push(trackObj);
                });                
                unqfy.createPlaylist(req.body.name, trackObjLs);
                const playlist = unqfy.getInstanceByAttribute(req.body.name, 'playlist', 'name'); 
                saveUNQfy(unqfy);
                
                res.status(201);
                res.send(standardJSONOutput(playlist));
            } 
        } catch{
            JSONerrorHandler(req);
            errorHandler(error, req, res);
        }
    })

try{
    router.route('/:id')
    .get((req, res) => { // GET /api/playlists/<id>
        const playlist = unqfy.getInstanceByAttribute(req.params.id, 'playlist');
        res.send(standardJSONOutput(playlist));
    })
    .delete((req,res) => {// DELETE /api/playlists/<id>
        const playlist = unqfy.getInstanceByAttribute(req.params.id, 'playlist');
        unqfy.deletePlaylist(playlist);
        res.status(204);
        res.send();
    })  
} catch(e){
    errorHandler(e, req, res);
}
    
module.exports = {appPlaylist:appPlaylist}