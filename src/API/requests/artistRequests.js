const express = require('express');
const {getUNQfy} = require('../../../main');
const { 
    ALBUMARTIST_DelGetPostInexistent_ERROR,

    JSON_Invalid_ERROR,
    JSON_MissingParameter_ERROR,

    URL_InvalidInexistent_ERROR,
    UNEXPECTED_Failure_ERROR } = require('../apiErrors');

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

//appArtist.use(errors.errorHandler);
appArtist.use('/artists', router);

// donde usar el UNEXPECTED_Failure_ERROR?
// donde usar el URL_InvalidInexistent_ERROR?

router.route('/')
    .get((req, res) => { // GET /api/artists
        try{
            const artist = unqfy.getInstanceByAttribute(req.query.name, 'artist', 'name');
            res.send(standardJSONOutput(artist));
        } catch{
            throw new ALBUMARTIST_DelGetPostInexistent_ERROR('Artist');
        }
    })
    .post((req, res) => { // POST /api/artists/
        // ver si el json tiene la forma esperada JSON_Invalid_ERROR
        // ver si el json tiene valores en todas sus claves JSON_MissingParameter_ERROR
        unqfy.addArtist(req.body);
        const artist = unqfy.getInstanceByAttribute(req.body.name, 'artist', 'name');
        
        res.status(201);
        res.send(standardJSONOutput(artist));
    })
    
router.route('/:id')
    .get((req, res) => { // GET /api/artists/<id>
        try {
            const artist = unqfy.getInstanceByAttribute(req.params.id, 'artist');
            res.send(standardJSONOutput(artist));
        } catch {
            throw new ALBUMARTIST_DelGetPostInexistent_ERROR('Artist');
        }
    })
    .patch((req, res) => { // PATCH /api/artists/:id
        // ver si el json tiene la forma esperada JSON_Invalid_ERROR
        // ver si el json tiene valores en todas sus claves JSON_MissingParameter_ERROR
        try{
            unqfy.modifyInstance(req.params.id, 'artist', req.body);
            const artist = unqfy.getInstanceByAttribute(req.params.id, 'artist');
            res.send(standardJSONOutput(artist));
        } catch {
            throw new ALBUMARTIST_DelGetPostInexistent_ERROR('Artist');
        }
    })
    .delete((req,res) => {
        try{
            const artist = unqfy.getInstanceByAttribute(req.params.id, 'artist');
            unqfy.deleteArtist(artist);
            res.status(204);
            res.send();
        } catch{
            throw new ALBUMARTIST_DelGetPostInexistent_ERROR('Artist');
        }
    })

//const tkn = newTknModule.getSpotifyToken();

//console.log(tkn);

module.exports={appArtist: appArtist}  