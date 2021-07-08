const express = require('express');
const {unqfy} = require('./saveAndLoadUNQfy');
const { errorHandler } = require('../apiErrors');

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
appTrack.use('/tracks', router);

router.route('/:trackId/lyrics')
    .get(async (req, res) => { // GET api/tracks/:id/lyrics
        const track = unqfy.getInstanceByAttribute(req.params.id, 'track');
        const lyrics = await unqfy.getLyrics(track.name) 
        const resp = {
            Name :  track.name,
            lyrics: lyrics
        };
        res.status(201);
        res.send(resp);
    })

module.exports = {appTrack:appTrack}