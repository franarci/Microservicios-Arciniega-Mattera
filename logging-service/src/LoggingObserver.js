let fs = require('fs');

const log = {
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
     update(event, object){
        return fetch(`http://localhost:${puerto}/api/logging`,{
            method : 'post',
            body: JSON.stringify({mensaje : mensaje, tipo: tipo}),
            headers: {
                'Content-Type' : 'application/json'
            } 
        }).then(res => res.json())    

    }
}