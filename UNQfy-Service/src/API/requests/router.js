const express = require('express');
const rootAPI = express();
const {appArtist} = require('./artistRequests');
const {appAlbum} = require('./albumRequests');
const {appPlaylist} = require('./playlistRequests');
const {appTrack} = require('./trackRequests');
const {appUser} = require('./userRequests');

const {errorHandler} =require('../apiErrors')


rootAPI.use('/api', appArtist, appAlbum, appPlaylist, appTrack, appUser);

rootAPI.use((req,res,next)=>{
    next(new Error("Invalid route"));
})
rootAPI.use(errorHandler);
rootAPI.listen(5001);
