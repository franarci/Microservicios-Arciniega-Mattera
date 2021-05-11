const { Album } = require("./album");
const { Artist } = require("./artist");
const track = require("./track");
const { Track } = require("./track");

class User {
    constructor(id, username){
        this.id = id,
        this.username = username,
        this.listened = new Map()
    }

    listenTrack(track){
        //listened tracks es un map donde la clave es el nombre de un track y el valor es un par [Track, vecesEscuchada<Int>]
        if(!this.hasListened(track)){
            this.listened[track.name] = [track, 1];
        } else {
            let sameTrack = this.listened[track.name][0]
            this.listened[track.name] = [sameTrack, this.timesListened(track)+parseInt(1)];
        }
    }
    
    hasListened(track){
        let tracks = Object.keys(this.listened)
        return tracks.some(t => 
                        this.sameTrackName(t, track.name)
                        )
    }

    sameTrackName(tn1,tn2){
        return(tn1.localeCompare(tn2) === 0)
    }

    getListened(){  
        return Object.values(this.listened).map(([track,n]) => track)
    }

    timesListened(track){
        if(this.hasListened(track)){
            return this.listened[track.name][1] 
        } else {
            return 0
        }
    }

    getTracks(artist){//Devuelve la lista de tracks del artista "artist" en forma de [track, timesListened]
      return Object.values(this.listened).filter(([track, n]) => track.artist.id === artist.id)
    }

}



module.exports = {
    User: User,
};