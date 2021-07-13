let express = require('express');
let bodyParser = require('body-parser');

let appLogging = express();
let router = express.Router();

//let checkStatusNewsletter = require('./statusNewsletter');
//let checkStatusLogging    = require('./statusLogging');


let errors = require('./apiErrors');


appLogging.use('/api/logging',router);



function newLog(){
  
   
    
}


router.route('/statusUNQfy')
    .post((req,res) =>{
        if(serviceStatus){
            //console.log(req.body)
            discordNotify('El servicio UNQfy ha dejado de funcionar');
            //res.json(status.StatusUNQfy=req.body.StatusUNQfy);
        }
});

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

appMonitor.listen(5002, () =>{ console.log('Monitor listening on port 5002') });


module.exports = checkServices;