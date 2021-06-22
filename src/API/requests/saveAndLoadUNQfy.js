
const { UNQfy } = require('../../../unqfy');

/**
 * depende desde donde se corra el modulo routes.js sirve una u otra ruta
 * si se corre desde /requests va ../../../data.json
 * si se corre desde el directorio raiz del proyecto es ./data.json
 */

const unqfy = UNQfy.load("./data.json");
const saveUNQfy = (unqfy) => { unqfy.save("./data.json") }

module.exports= {unqfy, saveUNQfy}