const express = require('express');
const {unqfy, saveUnqfy} = require('./saveAndLoadUNQfy');
const { errorHandler } = require('../apiErrors2');
const {InstanceDoesNotExist} = require('../../errors');

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

function standardJSONListOutput(playlists){
    const ret = playlists.map(playlist => standardJSONOutput(playlist));
    return ret;
}


//appPlaylist.use(JSONerrorHandler);
//appPlaylist.use(verifyURL);
appPlaylist.use('/playlists', router);

// donde usar el UNEXPECTED_Failure_ERROR?
// donde usar el URL_InvalidInexistent_ERROR?

router.route('/')
    .post((req, res, next) => { // POST /api/playlist
        // ver si el json tiene la forma esperada JSON_Invalid_ERROR
        // ver si el json tiene valores en todas sus claves JSON_MissingParameter_ERROR
        try{
            const keys = Object.keys(req.body);
            if(keys.length>2){
                const playlist = unqfy.createPlaylist(req.body.name, null, req.body.maxDuration, req.body.genres);
                saveUnqfy(unqfy);
                res.status(201);
                res.send(standardJSONOutput(playlist));
            } else if(keys.length==2){
                let trackIds = [];
                req.body.tracks.forEach(trackId => {
                    const track = unqfy.getInstanceByAttribute(trackId, 'track'); // track no existe
                    trackIds.push(track.id);
                });                
                const playlist = unqfy.createPlaylistFromTracks(req.body.name, trackIds);
                saveUnqfy(unqfy);
                
                res.status(201);
                res.send(standardJSONOutput(playlist));
            }  else {
                next(new Error("MissingParameter"));
            }
        } catch(error) {
            if(error instanceof InstanceDoesNotExist){
                next(new Error("RelatedResourceNotFound"));
            } else throw error;
        }
    })
    .get((req, res, next) => { 
        try{
            if(Object.keys(req.query).length>0){
                const name = req.query.name;
                const gt = req.query.durationGT;
                const lt = req.query.durationLT;
                const playlists = unqfy.getMatchingPlaylists(name, gt, lt);
                res.status(201);
                res.send(standardJSONListOutput(playlists));
            } else {
                next(new Error("MissingParameter"));
            }
        } catch(error) {
            if(error instanceof InstanceDoesNotExist){
                next(new Error("RelatedResourceNotFound"));
            } else throw error;
        }
    })

router.route('/:id')
    .get((req, res, next) => { // GET /api/playlists/<id>
 
            const playlist = unqfy.getInstanceByAttribute(req.params.id, 'playlist');
            res.send(standardJSONOutput(playlist));
        
    })
    .delete((req,res) => {// DELETE /api/playlists/<id>
        const playlist = unqfy.getInstanceByAttribute(req.params.id, 'playlist');
        unqfy.deletePlaylistById(playlist.id);
        saveUnqfy(unqfy)
        res.status(204);
        res.send();
    });
    
appPlaylist.use(errorHandler);


module.exports = {appPlaylist:appPlaylist}