const express = require('express');
const {unqfy, saveUnqfy} = require('./saveAndLoadUNQfy');
const { 
    errorHandler, 
    JSONerrorHandler,
    verifyURL } = require('../apiErrors');

const appTrack = express();
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

appTrack.use(errorHandler);
//appTrack.use(JSONerrorHandler);
//appTrack.use(verifyURL);
appTrack.use('/tracks', router);

// donde usar el UNEXPECTED_Failure_ERROR?
// donde usar el URL_InvalidInexistent_ERROR?

router.route('/:trackId/lyrics')
    .post(async (req, res) => { // POST /api/playlist
        // ver si el json tiene la forma esperada JSON_Invalid_ERROR
        // ver si el json tiene valores en todas sus claves JSON_MissingParameter_ERROR
        try {
                const track = unqfy.getInstanceByAttribute(req.params.id, 'track');
                const lyrics = await unqfy.getLyrics(track.name) 
                const res = {
                    Name :  track.name,
                    lyrics: lyrics
                };
                res.status(201);
                res.send(res);
            } 
        catch {
            JSONerrorHandler(req);
            errorHandler(error, req, res);
        }
    })

    module.exports = {appTrack:appTrack}