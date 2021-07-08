const { Belongs } = require('./belongs')

class TrackBelongs extends Belongs{
    execute(trackData){
        const n_ame = trackData.name;
        const duration = trackData.duration;
        const genres = trackData.genres;

        let check_name = this.instances_of_domain.some(track => track.name === n_ame) ;
        let check_duration = this.instances_of_domain.some(track => track.duration === duration) ;
        let check_genres = this.instances_of_domain.some(track => track.genres === genres) ;

        return check_name && check_duration && check_genres;

    }
}

module.exports = {
    TrackBelongs:TrackBelongs
}