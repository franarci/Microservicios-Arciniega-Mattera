const express = require('express');
const {getUNQfy, saveUNQfy} = require('../../../main');
const { 
    PLAYLIST_AddInexistentTrack_ERROR,
    PLAYLIST_DelGetInexistent_ERROR,
    
    JSON_Invalid_ERROR,
    JSON_MissingParameter_ERROR,
    
    URL_InvalidInexistent_ERROR,
    UNEXPECTED_Failure_ERROR } = require('../apiErrors');

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

//appPlaylist.use(playlistRequestsErrorHandler);
appPlaylist.use('/playlists', router);

// donde usar el UNEXPECTED_Failure_ERROR?
// donde usar el URL_InvalidInexistent_ERROR?

router.route('/')
    .post((req, res) => { // POST /api/playlist
        // ver si el json tiene la forma esperada JSON_Invalid_ERROR
        // ver si el json tiene valores en todas sus claves JSON_MissingParameter_ERROR
        if(req.body.keys.length==3){
                unqfy.createPlaylist(req.body.name,null,req.body.maxDuration,req.body.name.genres);
                const playlist = unqfy.getInstanceByAttribute(req.body.name, 'playlist', 'name');
                saveUNQfy(unqfy);
    
                res.status(201);
                res.send(standardJSONOutput(playlist));
        } else {
            try{
                unqfy.createPlaylist(req.body.name,req.body.tracks);
                const playlist = unqfy.getInstanceByAttribute(req.body.name, 'playlist', 'name');
                saveUNQfy(unqfy);
    
    
                res.status(201);
                res.send(standardJSONOutput(playlist));
            } catch{
                throw new PLAYLIST_AddInexistentTrack_ERROR();
            }
        } 
    })

try{
    router.route('/:id')
        .get((req, res) => { // GET /api/playlists/<id>
            const playlist = unqfy.getInstanceByAttribute(req.params.id, 'artist');
            res.send(standardJSONOutput(artist));
        })
        .delete((req,res) => {// DELETE /api/playlists/<id>
                const playlist = unqfy.getInstanceByAttribute(req.params.id, 'playlist');
                unqfy.deletePlaylist(playlist);
                res.status(204);
                res.send();
        })  
} catch{
    throw new PLAYLIST_DelGetInexistent_ERROR();
}

module.exports = {appPlaylist:appPlaylist}