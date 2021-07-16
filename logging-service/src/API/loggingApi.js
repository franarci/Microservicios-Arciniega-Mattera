let express = require('express');
let apiKey = process.env.LOGGING_TKN;

let appLogging = express();
let router = express.Router();


let errors = require('./apiErrors');


appLogging.use('/api/logging',router);



async function newLog(log){
  let options = {
      body: log
  }

  await appLogging.post('/', options);
    
}

router.route('/start')
    .post((req, res) => {
        
        console.log("LOGGING SERVICE ON");
        res.status(200).json({status: 200, message: "El servicio de logging esta activo"});
    })

router.route('/stop')
    .post((req, res) => {

        
        console.log("LOGGING SERVICE OFF");
        res.status(200).json({status: 200, message: "El servicio de logging esta desactivado"});
    })

appLogging.listen(5003, () =>{ console.log('Logging listening on port 5003') });


module.exports = { newLog };