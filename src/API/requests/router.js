const express = require('express');
const rootAPI = express();
const {appArtist} = require('./artistRequests');
const {appAlbum} = require('./albumRequests');
const {appPlaylist} = require('./playlistRequests');
const {appTrack} = require('./trackRequests');

const {errorHandler} =require('../apiErrors2')


rootAPI.use('/api', appArtist, appAlbum, appPlaylist, appTrack);

rootAPI.use((req,res,next)=>{
    next(new Error("Invalid route"));
})
rootAPI.use(errorHandler);
rootAPI.listen(3000);
