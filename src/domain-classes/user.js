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
            this.listened.set(track,1)
        } else {
            const tListened = this.timesListened(track)
            this.listened.set(track, tListened+1)
        }
    }
    
    hasListened(track){
        let tracks = Array.from(this.listened.keys())
        return tracks.some(t => 
                        this.sameTrackName(t.name, track.name)
                        )
    }

    sameTrackName(tn1,tn2){
        return(tn1.localeCompare(tn2) === 0)
    }

    getListened(){  
        return this.listened.keys()
    }

    timesListened(track){
        if(this.hasListened(track)){
            return this.listened.get(track)
        } else {
            return 0
        }
    }

    getTracks(artist){//Devuelve la lista de tracks del artista "artist" con sus respectivas timesListened 
    return Array.from(this.listened).filter(([track, n]) => track.artist.id === artist.id)
    }

}
const track1 = new Track(1, "uno", 2, "1",["rock"], "artist1") 
const track2 = new Track(2, "dos", 2, "1", ["pop"], "artist2") 
const user1 = new User(0,"user1")

user1.listenTrack(track1)
user1.listenTrack(track2)
user1.listenTrack(track1)

user1.getTracks("artist2")

module.exports = {
    User: User,
};