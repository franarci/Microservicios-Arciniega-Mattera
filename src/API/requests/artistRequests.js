const express = require('express');
const {getUNQfy, saveUNQfy} = require('../../../main');
const { 
    errorHandler, 
    JSONerrorHandler,
    verifyURL } = require('../apiErrors');

const unqfy = getUNQfy();
const appArtist = express();
const router = express.Router();
router.use(express.json());

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
        }
}

appArtist.use(errorHandler);
appArtist.use(JSONerrorHandler);
appArtist.use(verifyURL);
appArtist.use('/artists', router);

// donde usar el UNEXPECTED_Failure_ERROR?
// donde usar el URL_InvalidInexistent_ERROR?

router.route('/')
    .get((req, res) => { // GET /api/artists?name=
        const artist = unqfy.getInstanceByAttribute(req.query.name, 'artist', 'name');
        res.send(standardJSONOutput(artist));
    })
    .post((req, res) => { // POST /api/artists/
        // ver si el json tiene la forma esperada JSON_Invalid_ERROR
        // ver si el json tiene valores en todas sus claves JSON_MissingParameter_ERROR
        unqfy.addArtist(req.body);
        unqfy.saveUNQfy();
        const artist = unqfy.getInstanceByAttribute(req.body.name, 'artist', 'name');
        
        res.status(201);
        res.send(standardJSONOutput(artist));
    })
    
router.route('/:id')
    .get((req, res, e) => { // GET /api/artists/<id>
        try{
            const artist = unqfy.getInstanceByAttribute(req.params.id, 'artist');
            res.send(standardJSONOutput(artist));
        } catch{
            errorHandler(req, res, e);
        }
    })
    .patch((req, res, e) => { // PATCH /api/artists/:id
        // ver si el json tiene la forma esperada JSON_Invalid_ERROR
        // ver si el json tiene valores en todas sus claves JSON_MissingParameter_ERROR
        unqfy.modifyInstance(req.params.id, 'artist', req.body);
        unqfy.saveUNQfy();
        const artist = unqfy.getInstanceByAttribute(req.params.id, 'artist');
        res.send(standardJSONOutput(artist));
    })
    .delete((req,res, e) => {
        const artist = unqfy.getInstanceByAttribute(req.params.id, 'artist');
        unqfy.deleteArtist(artist);
        unqfy.saveUNQfy();
        res.status(204);
        res.send();
    })    

module.exports={appArtist: appArtist}  