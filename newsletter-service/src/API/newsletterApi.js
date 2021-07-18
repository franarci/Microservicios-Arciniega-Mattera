let express = require('express');
let {errorHandler} = require('./apiErrors');
const {InstanceDoesNotExist} = require('../errors');
const { SubscriptionsHandler } = require('../SubscriptionsHandler');
require("dotenv").config();

//let token = process.env.LOGGING_TKN;
let running = true;



let appNewsletter = express();
let router = express.Router();
router.use(express.json());

appNewsletter.use(errorHandler);

appNewsletter.use('/api',router);

router.route('/subscribe')
    .post((req, res, next)=>{ // POST /api/subscribe/
        
        res.status(200);
        res.json("ok");
    })
router.route('/unsuscribe') 
    .post((req, res, next)=>{ // POST /api/subscribe/

        res.status(200);
        res.json("ok");
    })

router.route('/notify')
    .post((req, res) => {
        const keys = Object.keys(req.body);
        const emptyFiledsCond = Object.values(req.body).every(value => value !== "");

        if(keys.length > 2 && emptyFiledsCond) {
            try{
                const artist = req.body.artistId;
                SubscriptionsHandler.notifySubscribers(artistId);//////////////////////////// VER COMO MANEJAR LAS SUSCRIPCIONES
                
            } catch(error) {
                if(error instanceof InstanceDoesNotExist){
                    next(new Error("RelatedResourceNotFound"));
                } else throw error;
            }

        } else {
            next(new Error("MissingParameter")); 
        }
        
    res.status(200).json({});
    })

router.route('/subscriptions/:artistId')
    .post((req, res) => {//POST /api/subscriptions?artistId
        
        res.status(200).json({});
    })

router.route('/status').get((req, res) => { res.status(200).send(JSON.stringify('OK'))});

appLogging.listen(5004, () =>{ console.log('Newsletter listening on port 5004')});


