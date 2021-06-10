const express = require('express');
const {getUNQfy, saveUNQfy} = require('../../../main');
const newTknModule = require('../spotify/getSpotifyToken');

const app = express();
const unqfy = getUNQfy();

const BASE_URL = '/api/playlists';

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

app.listen(3000);