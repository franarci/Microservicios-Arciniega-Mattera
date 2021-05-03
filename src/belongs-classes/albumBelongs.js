const { Belongs } = require('./belongs')

class AlbumBelongs extends Belongs{
    execute(args){
        //this.[domain-class].some([domain-class] => [domain-class].[attribute] === [attribute]) 
    }
}

module.exports = {
    AlbumBelongs:AlbumBelongs
}