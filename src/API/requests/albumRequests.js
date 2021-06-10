const express = require('express');
const {getUNQfy, saveUNQfy} = require('../../../main');
const newTknModule = require('../spotify/getSpotifyToken');

const app = express();
const unqfy = getUNQfy();

const BASE_URL = '/api/albums';

function getNotRecursiveTracks(recursiveTracksList){
    let ret = [];

    recursiveTracksList.forEach(trackRec => 
        ret.push({album_name:trackRec.name, album_duration:trackRec.duration})
    );

    return ret;
}

function standardJSONOutput(album){
    return {
        id: album.id,
        name: album.name,
        year: album.year,
        tracks: getNotRecursiveTracks(album.tracks),
    }
}

// GET /api/albums/<id>
app.get(BASE_URL + '/:id', (req, res) => {

    const album = unqfy.getInstanceByAttribute(req.params.id, 'album');

    res.send(standardJSONOutput(album));
});
