const express = require('express');
const {getUNQfy, saveUNQfy} = require('../../../main');
const newTknModule = require('../spotify/getSpotifyToken');

const app = express();
const unqfy = getUNQfy();

const BASE_URL = '/api/playlists';

function getNotRecursiveTracks(recursiveTracksList){
    let ret = [];

    recursiveTracksList.forEach(trackRec => 
        ret.push({album_name:trackRec.name, album_duration:trackRec.duration})
    );

    return ret;
}

function standardJSONOutput(playlist){
    return {
        id: playlist.id,
        name: playlist.name,
        duration: playlist.duration,
        tracks: getNotRecursiveTracks(playlist.albums),
    }
}
