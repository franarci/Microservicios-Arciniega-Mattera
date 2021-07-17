const express = require('express');
const {unqfy, saveUNQfy} = require('./saveAndLoadUNQfy');
const { errorHandler } = require('../apiErrors');
const {InstanceDoesNotExist} = require('../../errors');

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

router.route('/')
    .post((req, res, next) => { // POST /api/albums/
        const keys = Object.keys(req.body);
        const emptyFiledsCond = Object.values(req.body).every(value => value !== "");

        if(keys.length > 2 && emptyFiledsCond) {
            try {
                const dataAlbum = {name: req.body.name, year:req.body.year};
                const album = unqfy.addAlbum(req.body.artistId, dataAlbum);
                saveUNQfy(unqfy);
                res.status(201);
                res.send(standardJSONOutput(album));
            } catch (error) {
                unqfy.notify("error", {msg: "Failed album POST"});
                if(error instanceof InstanceDoesNotExist){
                    next(new Error("RelatedResourceNotFound"));
                } else throw error;
            }
        } else {
            unqfy.notify("error", {msg: "Failed album POST"});
            next(new Error("MissingParameter")); 
        }
    })
    .get((req, res) => { // GET /api/albums
        let albums;
        if(req.query.name != undefined){
            albums = unqfy.filterByName(req.query.name, 'albums');   
        } else {
            albums = unqfy.getAlbums();
        }
        const jsonAlbums = albums.map(album => standardJSONOutput(album));
        res.send(jsonAlbums);
    })

router.route('/:id')
    .get((req, res) => { // GET /api/albums/:id
        const album = unqfy.getInstanceByAttribute(req.params.id, 'album');
        res.send(standardJSONOutput(album));
    })
    .delete((req, res,next) => { // DELETE /api/albums/:id
       try{ 
        const album = unqfy.getInstanceByAttribute(req.params.id, 'album');
        unqfy.deleteAlbum(album);
        saveUNQfy(unqfy);
        res.status(204);
        res.send();
       } catch(e){
            unqfy.notify("error", {msg: "Failed album DELETE"});
            next(e);
       }
    })
    .patch((req, res, next) => { // PATCH /api/albums/:id
        const keys = Object.keys(req.body); 

        if(keys.length > 0){
            unqfy.modifyInstance(req.params.id, 'album', req.body);
            saveUNQfy(unqfy);
            const album = unqfy.getInstanceByAttribute(req.params.id, 'album');
            res.send(standardJSONOutput(album));
        } else {
            unqfy.notify("error", {msg: "Failed album PATCH"});
            next(new Error("MissingParameter"));
        }
    })


module.exports={appAlbum: appAlbum, getNotRecursiveTracks}