const express = require('express');
const {getUNQfy, saveUNQfy} = require('../../../main');
const newTknModule = require('../spotify/getSpotifyToken');

const unqfy = getUNQfy();
const appAlbum = express();
const router = express.Router();
router.use(express.json());

function getNotRecursiveTracks(recursiveTracksList){
    let ret = [];

    recursiveTracksList.forEach(trackRec => 
        ret.push({track_name:trackRec.name, track_duration:trackRec.duration})
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

appAlbum.use('/albums', router);

router.route('/')
    .post((req, res) => { // POST /api/albums/
        const album = unqfy.getInstanceByAttribute(req.body.name, 'album', 'name');
        const dataAlbum = {name: req.body.name, year:req.body.year};
        
        res.status(201);
        unqfy.addAlbum(req.body.artistId, dataAlbum);
        
        res.send(standardJSONOutput(album));
    })
    .get((req, res) => { // GET /api/albums?name=
        const album = unqfy.getInstanceByAttribute(req.query.name, 'album', 'name');

        res.send(standardJSONOutput(album));
    })
    
router.route('/:id')
    .get((req, res) => { // GET /api/albums/<id>
        const album = unqfy.getInstanceByAttribute(req.params.id, 'album');

        res.send(standardJSONOutput(album));
    })
    .delete((req, res) => {
        const album = unqfy.getInstanceByAttribute(req.params.id, 'album');
        album.deleteArtist(album);
        res.status(204);
        res.send();
    })


module.exports={appAlbum: appAlbum}