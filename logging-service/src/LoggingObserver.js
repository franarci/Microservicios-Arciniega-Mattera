let fs = require('fs');
const { newLog } = require('./API/loggingApi') ;


const logs = {
    newAlbum : {msg : "new album:"},
    newTrack: {msg : "new track:"},
    newArtist: {msg : "new artist:"},
    removedArtist: {msg : "removed artist:"},
    removedAlbum: {msg : "removed album:"},
    removedTrack: {msg : "removed track:"}
}

class Observer {
    update();
}

class LoggingObserver extends Observer{
    async update(event, object){
         let log= {
            msg: logs[event] + object.name,
            nivel: ""
         }
       await newLog(log);
    }
}