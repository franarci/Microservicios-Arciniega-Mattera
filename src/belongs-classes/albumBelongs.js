const { Belongs } = require('./belongs')

class AlbumBelongs extends Belongs{
    execute(albumData){
        const n_ame = albumData[0]
        const year = albumData[1]

        let check_name = this.instances_of_domain.some(album => album.name === n_ame) 
        let check_year = this.instances_of_domain.some(album => album.country === year) 

        return check_name && check_year
    }
}

module.exports = {
    AlbumBelongs:AlbumBelongs
}

// estimacion de dia de finalizacion para arturo
// dudas que puedan surgir
