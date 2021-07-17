const express = require('express');
const rootAPI = express();
const {appArtist} = require('./artistRequests');
const {appAlbum} = require('./albumRequests');
const {appPlaylist} = require('./playlistRequests');
const {appTrack} = require('./trackRequests');
const {appUser} = require('./userRequests');

const {errorHandler} =require('../apiErrors')

let appStatus = express();
let router = express.Router();
router.use(express.json());
appStatus.use('/status', router);
appStatus.use(errorHandler);
router.route('/').get((req, res, next) => {res.status(200).send(JSON.stringify('OK'))});

rootAPI.use('/api', appArtist, appAlbum, appPlaylist, appTrack, appUser, appStatus);

rootAPI.use((req,res,next)=>{
    next(new Error("Invalid route"));
})
rootAPI.use(errorHandler);
rootAPI.listen(5001);
console.log('UNQfy listening on port 5001');
