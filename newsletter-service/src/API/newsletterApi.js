let express = require('express');
let {errorHandler} = require('./apiErrors');
const {InstanceDoesNotExist} = require('../errors');
const SubscriptionsHandler  = require('../SubscriptionsHandler');
const UnqfyClient = require('../clientes/UnqfyClient');

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
    .post(async (req, res) => {
        const keys = Object.keys(req.body);
        const emptyFiledsCond = Object.values(req.body).every(value => value !== "");

        if(keys.length > 2 && emptyFiledsCond) {
            try{
                const artistId = req.body.artistId;
                const subject = req.body.subject;
                const message = req.body.message;
                UnqfyClient.verifyArtist(artistId);
                await SubscriptionsHandler.notifySubscribers(artistId, subject, message);
                res.status(200);
            } catch(error) {
                if(error instanceof InstanceDoesNotExist){
                    next(new Error("RelatedResourceNotFound"));
                } else throw error;
            }

        } else {
            next(new Error("MissingParameter")); 
        }
    })

router.route('/subscriptions')
    .delete((req, res,next) => {//DELETE /api/subscriptions
        const keys = Object.keys(req.body);
        const emptyFiledsCond = Object.values(req.body).every(value => value !== "");

        if(keys.length > 0 && emptyFiledsCond) {
            try{
                const artistId = req.body.artistId;
                SubscriptionsHandler.deleteSubscriptions(artistId);
                UnqfyClient.verifyArtist(artistId);
                res.status(200);
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
    .get((req,res,next)=>{ // GET /api/subscriptions?artistId
        const artistId = req.params.id;
        if(artistId != undefined){
            UnqfyClient.verifyArtist(artistId);
            const subscribers = SubscriptionsHandler.getSubscribersOf(artistId);    
            res.status(200).json({artistId: artistId, subscriptors: subscribers});
        } else {
            next(InstanceDoesNotExist);
        }
    });
    

router.route('/status').get((req, res) => { res.status(200).send(JSON.stringify('OK'))});

appLogging.listen(5004, () =>{ console.log('Newsletter listening on port 5004')});


