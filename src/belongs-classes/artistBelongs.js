const { Belongs } = require('./belongs')

class ArtistBelongs extends Belongs{
    execute(artistData){
        const n_ame = artistData[0]
        const country = artistData[1]

        let check_name = this.instances_of_domain.some(artist => artist.name === n_ame) 
        let check_country = this.instances_of_domain.some(artist => artist.country === country) 

        return check_name && check_country
    }
}

module.exports = {
    ArtistBelongs:ArtistBelongs
}