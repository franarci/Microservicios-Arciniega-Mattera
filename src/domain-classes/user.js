class User {
    constructor(id, username){
        this.id = id,
        this.username = username,
        this.listened = new Object()   
    }

    listenTrack(track){
        if(this.hasListened(track)){
            this.listened[track]++;
        } else {
            this.listened[track] = 1;
        }
    }
    
    hasListened(track){
     return Object.keys(this.listened).includes(track);
    }

    getListened(){
       return Object.keys(this.listened);
    }

    timesListened(track){
    if(this.hasListened(track)){
        return this.listened[track] 
        } else {
            return 0
        }
    }
}

module.exports = {
    User: User,
};