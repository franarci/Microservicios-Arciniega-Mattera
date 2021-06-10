const express = require('express');
const rootAPI = express();
const {appArtist} = require('./artistRequests');
const {appAlbum} = require('./albumRequests');
const {appPlaylist} = require('./playlistRequests');

rootAPI.use('/api',appArtist, appAlbum, appPlaylist);
rootAPI.listen(3000);