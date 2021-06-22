const { Album } = require("./album");
const { Artist } = require("./artist");
const track = require("./track");
const { Track } = require("./track");
var stringify = require('json-stringify-safe');
const artist = require("./artist");

class User {
    constructor(id, name){
        this.id = id,
        this.name = name,
        this.listened = new Map()
    }

    listenTrack(track){
        //listened tracks es un map donde la clave es el nombre de un track y el valor es un par [Track, vecesEscuchada<Int>]
        if(!this.hasListened(track)){
            this.listened[stringify(track)]=1; 
        } else {
            this.listened[stringify(track)]=this.timesListened(track)+1 ;
        } 
    }
    
    hasListened(track){
        let tracks = Object.keys(this.listened);
        if(tracks.length!==0){
            tracks = tracks.map( t => JSON.parse(t))
        }
        
        return tracks.some(t => 

                        this.sameTrackName(t.name, track.name)
                        )
    }

    sameTrackName(tn1,tn2){
        return(tn1.localeCompare(tn2) === 0);
    }

    getListened(){ 
        let tracks = Object.keys(this.listened);
        if(tracks.length!==0){// EN ESTE PUNTO tracks es una lista vacia o una lista con un string conteniendo todos los tracks
            tracks = tracks.map( t => JSON.parse(t));
            tracks = tracks.map( t =>
                new Track(
                    t.id,
                    t.name,
                    t.duration,
                    t.album,
                    t.genres,
                    t.artist
                ),
            )
        } 
        return tracks
    }

    getListenedWithTimesListened(){ 
        
        let tracks = Object.entries(this.listened);
        if(tracks.length!==0){
            //.map( t => JSON.parse(t));
            tracks = tracks.map( ([t,n]) => [this.convertToTrack(t), n]);
        } 
        return tracks
    }

    convertToTrack(undefinedTrackP){
        const undefinedTrack = JSON.parse(undefinedTrackP);
        return new Track(
            undefinedTrack.id,
            undefinedTrack.name,
            undefinedTrack.duration,
            undefinedTrack.album,
            undefinedTrack.genres,
            undefinedTrack.artist
        );
    }

    timesListened(track){
        if(this.hasListened(track)){
            return this.listened[stringify(track)];
        } else {
            return 0;
        }
    }

    getTracks(artist){//Devuelve la lista de tracks del artista "artist" con sus respectivas timesListened 
        let ret = this.getListenedWithTimesListened();
        return ret.filter(([track,times]) => 
            track.artist.id == artist.id
        )
    }

    setAttributes(data){
        this.name = data.name;
    }
}



module.exports = {
    User: User,
};