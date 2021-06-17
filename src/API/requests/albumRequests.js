const express = require('express');
const {unqfy, saveUnqfy} = require('./saveAndLoadUNQfy');
const { errorHandler } = require('../apiErrors');


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
appAlbum.use(errorHandler);
//appAlbum.use(verifyURL);

// donde usar el UNEXPECTED_Failure_ERROR?
// donde usar el URL_InvalidInexistent_ERROR?

router.route('/')
    .post((req, res) => { // POST /api/albums/
        // ver si el json tiene la forma esperada JSON_Invalid_ERROR
        // ver si el json tiene valores en todas sus claves JSON_MissingParameter_ERROR
        const album = unqfy.getInstanceByAttribute(req.body.name, 'album', 'name');
        const dataAlbum = {name: req.body.name, year:req.body.year};
        
        res.status(201);
        unqfy.addAlbum(req.body.artistId, dataAlbum);
        saveUnqfy(unqfy);
        res.send(standardJSONOutput(album));
    })
    .get((req, res) => { // GET /api/albums?name=
        const album = unqfy.getInstanceByAttribute(req.query.name, 'album', 'name');
        res.send(standardJSONOutput(album));
    })
    
router.route('/:id')
    .get((req, res) => { // GET /api/albums/:id
        const album = unqfy.getInstanceByAttribute(req.params.id, 'album');
        res.send(standardJSONOutput(album));
    })
    .delete((req, res) => { // DELETE /api/albums/:id
        const album = unqfy.getInstanceByAttribute(req.params.id, 'album');
        unqfy.deleteAlbum(album);
        saveUnqfy(unqfy);
        res.status(204);
        res.send();
    })
    .patch((req, res) => { // PATCH /api/albums/:id
        // ver si el json tiene la forma esperada JSON_Invalid_ERROR
        // ver si el json tiene valores en todas sus claves JSON_MissingParameter_ERROR
        unqfy.modifyInstance(req.params.id, 'album', req.body);
        saveUnqfy(unqfy);
        const album = unqfy.getInstanceByAttribute(req.params.id, 'album');
        res.send(standardJSONOutput(album));
    })


module.exports={appAlbum: appAlbum}