const express = require('express');
const {unqfy, saveUnqfy} = require('./saveAndLoadUNQfy');
const { errorHandler } = require('../apiErrors2');
const {InstanceDoesNotExist} = require('../../errors')

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
    .post((req, res, next) => { // POST /api/albums/
        const keys = Object.keys(req.body);
        if(keys.length > 2) {
            try {
                const dataAlbum = {name: req.body.name, year:req.body.year};
                unqfy.addAlbum(req.body.artistId, dataAlbum);
                saveUnqfy(unqfy);
                res.status(201);
                res.send(standardJSONOutput(dataAlbum));
            } catch (error) {
                if(error instanceof InstanceDoesNotExist){
                    next(new Error("RelatedResourceNotFound"));
                } else throw error;
            }
        } else {
            next(new Error("MissingParameter")); 
        }
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
    .patch((req, res, next) => { // PATCH /api/albums/:id
        const keys = Object.keys(req.body); 
        if(keys.length > 0){
            unqfy.modifyInstance(req.params.id, 'album', req.body);
            saveUnqfy(unqfy);
            const album = unqfy.getInstanceByAttribute(req.params.id, 'album');
            res.send(standardJSONOutput(album));
        } else {
            next(new Error("MissingParameter"));
        }
    })


module.exports={appAlbum: appAlbum}