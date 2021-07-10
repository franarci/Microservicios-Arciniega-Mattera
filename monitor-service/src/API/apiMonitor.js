let express = require('express');
let bodyParser = require('body-parser');

let appMonitor = express();
let router = express.Router();

let checkStatusUNQfy      = require('./statusUNQfy.js');
//let checkStatusNewsletter = require('./statusNewsletter');
//let checkStatusLogging    = require('./statusLogging');

let discordNotify = require('./discordNotify');

//let stopMonitor = require('./statusUNQfy.js');

let errors = require('./apiErrors');
let serviceStatus = false;

//appMonitor.use(bodyParser.json());
appMonitor.use('/api/monitor',router);

let unqfyMonitor;
let newsletterMonitor;
let loggingMonitor;

function checkServices(){
    if(serviceStatus){
        unqfyMonitor = checkStatusUNQfy();
        //newsletterMonitor = checkStatusNewsletter();
        //loggingMonitor = checkStatusLogging();
    }
}

function stopMonitors(){
    unqfyMonitor.stop();
    delete unqfyMonitor;

    //newsletterMonitor.stop();
    //delete newsletterMonitor;

    //loggingMonitor.stop();
    //delete loggingMonitor;

}    

router.route('/statusUNQfy')
    .post((req,res) =>{
        if(serviceStatus){
            console.log(req.body)
            //discordNotify(res);
            res.json(status.StatusUNQfy=req.body.StatusUNQfy);
        }
});

router.route('/statusLogging')
    .post((req,res) =>{
        if(serviceStatus){
            //console.log(req.body)
            discordNotify(res);
            //res.json(status.StatusUNQfy=req.body.StatusUNQfy);
        }
});

router.route('/statusNewsletter')
    .post((req,res) =>{
        if(serviceStatus){
            //console.log(req.body)
            discordNotify(res);
            //res.json(status.StatusUNQfy=req.body.StatusUNQfy);
        }
});

router.route('/services')
    .get((req, res) => {

    })

router.route('/notify')
    .post((req, res) => {

    })

router.route('/start')
    .post((req, res) => {
        serviceStatus = true;
        checkServices();
        console.log("MONITOR SERVICE ON");
        res.status(200).json({status: 200, message: "Monitor activado"});
    })

router.route('/stop')
    .post((req, res) => {
        serviceStatus = false;
        stopMonitors();
        console.log("MONITOR SERVICE OFF");
        res.status(200).json({status: 200, message: "Monitor desactivado"});
    })

appMonitor.listen(5002, () =>{ console.log('Monitor listening on port 5002') });


checkServices();