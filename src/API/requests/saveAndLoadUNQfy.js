
const { UNQfy } = require('../../../unqfy');

const loadUnqfy = () => {UNQfy.load('UNQfy-Arciniega-Mattera'+ "/../../../../data.json")};
const saveUnqfy = (unqfy) => { unqfy.save('UNQfy-Arciniega-Mattera'+ "/../../../../data.json") }

module.exports= {loadUnqfy, saveUnqfy}