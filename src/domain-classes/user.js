const { Album } = require("./album");
const { Artist } = require("./artist");
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
            this.listened[track.trackName] = [track, 1];
        } else {
            let newTrack = this.listened[track.trackName][0]
            this.listened[track.trackName] = [newTrack, this.timesListened(track)+parseInt(1)];
        }
    }
    
    hasListened(track){
        let tracks = Object.keys(this.listened)

        return tracks.some(t => 
                        this.sameTrackName(t, track.trackName)
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
        return this.listened[track.trackName][1] 
        } else {
            return 0
        }
    }
}

module.exports = {
    User: User,
};