const express = require('express');
const rootAPI = express();
const {appArtist} = require('./artistRequests');
const {appAlbum} = require('./albumRequests');
const {appPlaylist} = require('./playlistRequests');
const { getUNQfy } = require('../../../main');

//hago esto para probar las playlist//
//voy a llenar este unqfy con tracks para poder crear playlists y lo voy a exportar
//para que lo usen los request.js
const unqfy = getUNQfy();


rootAPI.use('/api',appArtist, appAlbum, appPlaylist);
rootAPI.listen(3000);

module.exports={unqfy}