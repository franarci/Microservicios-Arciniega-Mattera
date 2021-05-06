class User {
    constructor(id, username){
        this.id = id
        this.username = username
        this.listened = new Object()   
    }

    listenTrack(track){
        if(Object.keys(this.listened).includes(track)){
            this.listened[track]++
        } else {
            this.listened[track] = 1
        }
    }

    getListened(){
       return Object.keys(this.listened)
    }

    timesListened(track){
       return this.listened[track] 
    }

    getUsername(){return this.username;}
}


module.exports = {
    User: User,
};