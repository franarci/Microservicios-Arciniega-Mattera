const express = require('express');
const {getUNQfy, saveUNQfy} = require('../../../main');
//const newTknModule = require('../spotify/getSpotifyToken');
const { errorHandler } = require('../apiErrors');

const unqfy = getUNQfy();
const appPlaylist = express();
const router = express.Router();
router.use(express.json());

function getNotRecursiveTracks(recursiveTracksList){
    let ret = [];

    recursiveTracksList.forEach(trackRec => 
        ret.push({track_name:trackRec.name, track_duration:trackRec.duration})
    );

    return ret;
}

function standardJSONOutput(playlist){
    return {
        id: playlist.id,
        name: playlist.name,
        duration: playlist.duration,
        tracks: getNotRecursiveTracks(playlist.tracks),
    }
}
appPlaylist.use('/playlists', router);

router.route('/')
    .post((req, res, err) => { // POST /api/playlist
        try{
            if(req.body.keys.length==3){
                unqfy.createPlaylist(req.body.name,null,req.body.maxDuration,req.body.name.genres);
                const playlist = unqfy.getInstanceByAttribute(req.body.name, 'playlist', 'name');
                saveUNQfy(unqfy);

                res.status(201);
                res.send(standardJSONOutput(playlist));
            } else {
                unqfy.createPlaylist(req.body.name,req.body.tracks);
                const playlist = unqfy.getInstanceByAttribute(req.body.name, 'playlist', 'name');
                saveUNQfy(unqfy);


                res.status(201);
                res.send(standardJSONOutput(playlist));
            } 
        } catch{
            errorHandler(err, req, res);
        }
    })


router.route('/:id')
    .get((req, res, err) => { // GET /api/playlists/<id>
        try {
            const playlist = unqfy.getInstanceByAttribute(req.params.id, 'artist');

            res.send(standardJSONOutput(artist));
        } catch {
            errorHandler(err, req, res);
        }
    })
    .delete((req,res,err) => {// DELETE /api/playlists/<id>
        try {
            const playlist = unqfy.getInstanceByAttribute(req.params.id, 'playlist');
            unqfy.deletePlaylist(playlist);
            res.status(204);
            res.send();
        } catch{
            errorHandler(err, req, res);
        }
    })  

//app.listen(3000);

module.exports = {appPlaylist:appPlaylist}