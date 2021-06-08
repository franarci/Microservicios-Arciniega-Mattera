//const rp = require('request-promise');
const express = require('express');
const {getUNQfy, saveUNQfy} = require('../../../main');

const app = express();
const unqfy = getUNQfy();

// GET /api/artists?name=
app.get('/api/artists', (req, res) => {
    
    const name = req.query.name;
    const artist = unqfy.getInstanceByAttribute(req.query.name, 'artist', 'name');
    const albumsRecursive = artist.albums;
    let albumsNotRecursive = [];
    let albumNotRecursiveObj = {};

    albumsRecursive.forEach(albumRec => {
        albumNotRecursiveObj['album_name'] = albumRec.name;
        albumNotRecursiveObj['album_year'] = albumRec.year;},
        albumsNotRecursive.push(albumNotRecursiveObj)    
    );
   
    res.send({
        id: artist.id,
        name: artist.name,
        country: artist.country,
        albums: albumsNotRecursive,
        genres: artist.genres,
    })
});

app.listen(3000);