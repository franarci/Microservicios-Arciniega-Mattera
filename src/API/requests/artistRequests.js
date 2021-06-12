const express = require('express');
const {getUNQfy, saveUNQfy} = require('../../../main');
const { Artist } = require('../../domain-classes/artist');
const newTknModule = require('../spotify/getSpotifyToken');

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
    
appArtist.use('/artists', router);

router.route('/')
    .get((req, res) => { // GET /api/artists?name=
        const artist = unqfy.getInstanceByAttribute(req.query.name, 'artist', 'name');

        res.send(standardJSONOutput(artist));
    })

    .post((req, res) => { // POST /api/artists/
        
        unqfy.addArtist(req.body);
        const artist = unqfy.getInstanceByAttribute(req.body.name, 'artist', 'name');
        
        res.status(201);
        res.send(standardJSONOutput(artist));
    })
    
router.route('/:id')
    .get((req, res) => { // GET /api/artists/<id>
        const artist = unqfy.getInstanceByAttribute(req.params.id, 'artist');

        res.send(standardJSONOutput(artist));
    })
    .patch((req, res) => { // PATCH /api/artists/:id
        unqfy.modifyInstance(req.params.id, 'artist', req.body);
        const artist = unqfy.getInstanceByAttribute(req.params.id, 'artist');
        res.send(standardJSONOutput(artist));
    })
    .delete((req,res) => {
        const artist = unqfy.getInstanceByAttribute(req.params.id, 'artist');
        unqfy.deleteArtist(artist);
        res.status(204);
        res.send();
    })

//const tkn = newTknModule.getSpotifyToken();

//console.log(tkn);

module.exports={appArtist: appArtist}  