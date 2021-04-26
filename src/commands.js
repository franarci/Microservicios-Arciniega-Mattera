const { UNQfy } = require('../unqfy')
//const AddGenre = require('./genre')


function paramsBuilder(args){
    const params = [];

    while (args.length > 0) {
        const param = args.shift();
        const value = this.parseValueByType(args.shift());
        params.push({ [param]: value })
    }
    return Object.assign(...params);
}

function parseValueByType(value){
    
    // si es number
    if (!Number.isNaN(parseInt(value))) {
        return parseInt(value);
    } 
    // si esta dividido por comas es un array
    if (value.indexOf(',') > 0) { 
        return value.replace(/ /g, '').split(','); // quitar especios en blancos y convetir en array
    }
    // por defecto no parsea, si es string o cualquier otro tipo
    return value;
}



class Command{
    
    executeMethod(){
        throw "Error, this method is not implemented"
    }
}

class AddArtist extends Command{
    
    executeMethod(lsParams, unqfy){
        var n_ame = lsParams[0]
        var country = lsParams[1]
        unqfy.addArtist(n_ame, country)
    }
}

const commands = { // aca se van a ir mapeando los comandos
    addArtist: new AddArtist() 
}

/*
const addArtist = new AddArtist()
const commands = new Map()
commands.set('addArtist', addArtist)
*/


module.exports = commands