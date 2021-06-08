//const rp = require('request-promise');
const express = require('express');
const {getUNQfy, saveUNQfy} = require('../../../main');
const newTknModule = require('../spotify/getSpotifyToken');

const app = express();
const unqfy = getUNQfy();

const BASE_URL = '/api/artists';

function getNotRecursiveAlbums(recursiveAlbumsList){
    let ret = [];

    recursiveAlbumsList.forEach(albumRec => 
        ret.push({album_name:albumRec.name, album_year:albumRec.year})
    );

    return ret;
}

function standardJSONOutput(artist){
    return {
        id: artist.id,
        name: artist.name,
        country: artist.country,
        albums: getNotRecursiveAlbums(artist.albums),
        //genres: artist.genres no lo pide pero no esta tomando los generos del artista
    }
}

// GET /api/artists?name=
app.get(BASE_URL, (req, res) => {

    const artist = unqfy.getInstanceByAttribute(req.query.name, 'artist', 'name');
   
    res.send(standardJSONOutput(artist));
});

// GET /api/artists/<id>
app.get(BASE_URL + '/:id', (req, res) => {

    const artist = unqfy.getInstanceByAttribute(req.params.id, 'artist');

    res.send(standardJSONOutput(artist));
});

//const tkn = newTknModule.getSpotifyToken();

app.listen(3000);
//console.log(tkn);