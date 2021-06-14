const express = require('express');
const rootAPI = express();
const {appArtist} = require('./artistRequests');
const {appAlbum} = require('./albumRequests');
const {appPlaylist} = require('./playlistRequests');
const { getUNQfy } = require('../../../main');

const {URL_InvalidInexistent_ERROR} =require('../apiErrors')

/* const root2 = express();
root2.use('/api,',appArtist, appAlbum, appPlaylist);

const sarasa = express();
const routeSarasa = express.Router();
sarasa.use('*', routeSarasa);

routeSarasa.route('/')
    .get((req,res) => {
        const err = new URL_InvalidInexistent_ERROR();
        res.status(err.status);
        res.json({status: err.status, errorCode: err.errorCode});
        throw err;
    })

rootAPI.use('/', root2, sarasa); */
rootAPI.use('/api', appArtist, appAlbum, appPlaylist);
rootAPI.listen(3000);
