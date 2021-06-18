const express = require('express');
const {unqfy, saveUnqfy} = require('./saveAndLoadUNQfy');
const { errorHandler } = require('../apiErrors');

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
//appPlaylist.use(JSONerrorHandler);
//appPlaylist.use(verifyURL);
appPlaylist.use('/playlists', router);

// donde usar el UNEXPECTED_Failure_ERROR?
// donde usar el URL_InvalidInexistent_ERROR?

router.route('/')
    .post((req, res, error) => { // POST /api/playlist
        // ver si el json tiene la forma esperada JSON_Invalid_ERROR
        // ver si el json tiene valores en todas sus claves JSON_MissingParameter_ERROR
        try {
            
            if(Object.keys(req.body).length==3){
               const playlist = unqfy.createPlaylist(req.body.name, null, req.body.maxDuration, req.body.genres);
                saveUnqfy(unqfy);
                
                res.status(201);
                res.send(standardJSONOutput(playlist));
            } else {
                let trackIds = [];
                req.body.tracks.forEach(trackId => {
                    const track = unqfy.getInstanceByAttribute(trackId, 'track'); // track no existe
                    trackIds.push(track.id);
                });                
                const playlist = unqfy.createPlaylistFromTracks(req.body.name, trackIds);
                saveUnqfy(unqfy);
                
                res.status(201);
                res.send(standardJSONOutput(playlist));
            } 
        } catch{
          //  JSONerrorHandler(req);
            errorHandler(req, res, error);
        }
    })

router.route('/:id')
    .get((req, res, e) => { // GET /api/playlists/<id>
        try{
            const playlist = unqfy.getInstanceByAttribute(req.params.id, 'playlist');
            res.send(standardJSONOutput(playlist));
        } catch(e){
            errorHandler(req, res, e);
        }
    })
    .delete((req,res) => {// DELETE /api/playlists/<id>
        const playlist = unqfy.getInstanceByAttribute(req.params.id, 'playlist');
        unqfy.deletePlaylistById(playlist.id);
        saveUnqfy(unqfy)
        res.status(204);
        res.send();
    })  
    
module.exports = {appPlaylist:appPlaylist}