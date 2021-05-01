class User {
    constructor(id){
        this.id = id
        this.listened = new Object()
    }

    listenTrack(track){
        if(Object.keys(this.listened).includes(track)){
            this.listened[track] = this.listened[track]++
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
}

module.exports = {
    User: User,
  };