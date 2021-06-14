const express = require('express');
const {getUNQfy} = require('../../../main');
const { 
    ALBUMARTIST_DelGetPostInexistent_ERROR,

    JSON_Invalid_ERROR,
    JSON_MissingParameter_ERROR,
    
    URL_InvalidInexistent_ERROR,
    UNEXPECTED_Failure_ERROR } = require('../apiErrors');


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

// donde usar el UNEXPECTED_Failure_ERROR?
// donde usar el URL_InvalidInexistent_ERROR?

router.route('/')
    .post((req, res) => { // POST /api/albums/
        // ver si el json tiene la forma esperada JSON_Invalid_ERROR
        // ver si el json tiene valores en todas sus claves JSON_MissingParameter_ERROR
        try{
            const album = unqfy.getInstanceByAttribute(req.body.name, 'album', 'name');
            const dataAlbum = {name: req.body.name, year:req.body.year};
            
            res.status(201);
            unqfy.addAlbum(req.body.artistId, dataAlbum);
            
            res.send(standardJSONOutput(album));
        } catch{
            throw new ALBUMARTIST_DelGetPostInexistent_ERROR('Album');
        }
    })
    .get((req, res) => { // GET /api/albums?name=
        try{
            const album = unqfy.getInstanceByAttribute(req.query.name, 'album', 'name');
            res.send(standardJSONOutput(album));
        } catch{
            throw new ALBUMARTIST_DelGetPostInexistent_ERROR('Album');
        }
    })
    
router.route('/:id')
    .get((req, res) => { // GET /api/albums/:id
        try{
            const album = unqfy.getInstanceByAttribute(req.params.id, 'album');
            res.send(standardJSONOutput(album));
        } catch{
            throw new ALBUMARTIST_DelGetPostInexistent_ERROR('Album');
        }
    })
    .delete((req, res) => { // DELETE /api/albums/:id
        try {
            const album = unqfy.getInstanceByAttribute(req.params.id, 'album');
            unqfy.deleteAlbum(album);
            res.status(204);
            res.send();
        } catch{
            throw new ALBUMARTIST_DelGetPostInexistent_ERROR('Album');
        }
    })
    .patch((req, res) => {
        // ver si el json tiene la forma esperada JSON_Invalid_ERROR
        // ver si el json tiene valores en todas sus claves JSON_MissingParameter_ERROR
        try{
            unqfy.modifyInstance(req.params.id, 'album', req.body);
            const album = unqfy.getInstanceByAttribute(req.params.id, 'album');
            res.send(standardJSONOutput(album));
        } catch{
            throw new ALBUMARTIST_DelGetPostInexistent_ERROR('Album');
        }
    })


module.exports={appAlbum: appAlbum}