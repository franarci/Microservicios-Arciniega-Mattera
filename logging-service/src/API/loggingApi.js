let express = require('express');

let token = process.env.LOGGING_TKN;
let running = true;

var winston  = require('winston');
var {Loggly} = require('winston-loggly-bulk');
winston.add(new Loggly({
    token: token, ///////CAMBIAR POR VARIABLE
    subdomain: "franarci",
    tags: ["Winston-NodeJS"],
    json: true
}));

var log4js = require("log4js");
var logger = log4js.getLogger();
log4js.configure({
    appenders: { cheese: { type: "file", filename: "logs.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } }
});

let appLogging = express();
let router = express.Router();

let {errorHandler} = require('./apiErrors');
appLogging.use(errorHandler);

appLogging.use('/api',router);

router.route('/logging')
    .post((req, res)=>{ // POST /api/logging/
        if(running){
            try{
                const level = req.body.level;
                const msg = req.body.message;
                switch(level){
                    case "error":
                        logger.error(msg);
                        break;
                    case "warning":
                        logger.warn(msg);
                        break;
                    case "debug":
                        logger.debug(msg);
                        break;                
                    default:
                        logger.info(msg);
                        break;
                }
            } catch(e) {
                next(e);
            }
        }
        res.status(200);
    })

router.route('/start')
    .post((req, res) => {
        running=true;
        console.log("LOGGING SERVICE ON");
        res.status(200).json({status: 200, message: "El servicio de logging esta activo"});
    })

router.route('/stop')
    .post((req, res) => {
        running = false;
        console.log("LOGGING SERVICE OFF");
        res.status(200).json({status: 200, message: "El servicio de logging esta desactivado"});
    })

router.route('/status').get((req, res) => { res.status(200).send(JSON.stringify('OK'))});

appLogging.listen(5003, () =>{ console.log('Logging listening on port 5003') });


