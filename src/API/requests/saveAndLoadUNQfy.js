
const { UNQfy } = require('../../../unqfy');

const unqfy = UNQfy.load("UNQfy-Arciniega-Mattera/../../../../data.json");
const saveUNQfy = (unqfy) => { unqfy.save("UNQfy-Arciniega-Mattera/../../../../data.json") }

module.exports= {unqfy, saveUNQfy}