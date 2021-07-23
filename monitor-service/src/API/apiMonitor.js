let express = require('express');
let bodyParser = require('body-parser');
require("dotenv").config();

let appMonitor = express();
let router = express.Router();
let PORT = process.env.PORT_ENV;

let checkStatusUNQfy      = require('./statusUNQfy.js');
let checkStatusNewsletter = require('./statusNewsletter');
let checkStatusLogging    = require('./statusLogging');

let discordNotify = require('./discordNotify');

//let stopMonitor = require('./statusUNQfy.js');

let errors = require('./apiErrors');
let serviceStatus = true;

appMonitor.use(bodyParser.json());
appMonitor.use('/api/monitor',router);

let unqfyMonitor;
let newsletterMonitor;
let loggingMonitor;

const status = {
    unqfyStatus: 'OFF',
    loggingStatus: 'OFF',
    newsletterStatus: 'OFF'
}

function checkServices(){
    if(serviceStatus){
        unqfyMonitor = checkStatusUNQfy();
        newsletterMonitor = checkStatusNewsletter();
        loggingMonitor = checkStatusLogging();
    }
}

function stopMonitors(){
    unqfyMonitor.stop();
    delete unqfyMonitor;

    newsletterMonitor.stop();
    delete newsletterMonitor;

    loggingMonitor.stop();
    delete loggingMonitor;

}    

const doPost = (req, res) => {
    let date=new Date();
    if(serviceStatus){
        console.log(req.body);
        discordNotify(req.body.msg, date);
        res.json(status.unqfyStatus = req.body.unqfyStatus);
    }
}
router.route('/statusUNQfy')
    .post((req,res) =>{ doPost(req, res); })
    .get((req,res) => { res.json(status.unqfyStatus); })

router.route('/statusLogging')
    .post((req,res) =>{ doPost(req, res); })
    .get((req,res) => { res.json(status.loggingStatus); })

router.route('/statusNewsletter')
    .post((req,res) =>{ doPost(req, res); })
    .get((req,res) => { res.json(status.newsletterStatus); })

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

appMonitor.listen(PORT, () =>{ checkServices(); ; console.log(`Monitor listening on port ${PORT}`) });


//checkServices();