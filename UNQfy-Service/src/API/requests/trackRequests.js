const express = require('express');
const {unqfy, saveUNQfy} = require('./saveAndLoadUNQfy');
const { errorHandler } = require('../apiErrors');

const appTrack = express();
const router = express.Router();
router.use(express.json());



appTrack.use(errorHandler);
appTrack.use('/tracks', router);
router.route('/')
    .post((req, res, next) => { // POST /api/tracks/
        const keys = Object.keys(req.body);
        const emptyFiledsCond = Object.values(req.body).every(value => value !== "");

        if(keys.length > 3 && emptyFiledsCond) {
            try {
                const dataTrack = {name: req.body.name, duration:req.body.duration, genres:req.body.genres};
                const track = unqfy.addTrack(req.body.albumId, dataTrack);
                saveUNQfy(unqfy);
                res.status(201);
                res.send(track);
            } catch (error) {
                unqfy.notify("error", {msg: "Failed track POST"});
                if(error instanceof InstanceDoesNotExist){
                    next(new Error("RelatedResourceNotFound"));
                } else throw error;
            }
        } else {
            unqfy.notify("error", {msg: "Failed track POST"});
            next(new Error("MissingParameter")); 
        }
    })
router.route('/:id')
    .delete((req, res,next) => { // DELETE /api/tracks/:id
        try{ 
         const track = unqfy.getInstanceByAttribute(req.params.id, 'track');
         unqfy.deleteTrack(track);
         saveUNQfy(unqfy);
         res.status(204);
         res.send();
        } catch(e){
             unqfy.notify("error", {msg: "Failed track DELETE"});
             next(e);
        }
     })

router.route('/:trackId/lyrics')
    .get(async (req, res) => { // GET api/tracks/:id/lyrics
        const track = unqfy.getInstanceByAttribute(req.params.id, 'track');
        const lyrics = await unqfy.getLyrics(track.name) 
        const resp = {
            Name :  track.name,
            lyrics: lyrics
        };
        res.status(201);
        res.send(resp);
    })

module.exports = {appTrack:appTrack}