let express = require('express');
let {errorHandler} = require('./apiErrors');
const {InstanceDoesNotExist} = require('../errors');
const SubscriptionsHandler = require('../SubscriptionsHandler');
const UnqfyClient = require('../clientes/UnqfyClient');

require("dotenv").config();

//let token = process.env.LOGGING_TKN;
let running = true;

const subscriptionsHandler = new SubscriptionsHandler();
const unqfyClient = new UnqfyClient();

let appNewsletter = express();
let router = express.Router();
router.use(express.json());


appNewsletter.use('/api',router);
appNewsletter.use(errorHandler);

router.route('/subscribe')
.post(async (req, res, next)=>{ // POST /api/subscribe/
    const keys = Object.keys(req.body);
    const emptyFiledsCond = Object.values(req.body).every(value => value !== "");
    if(keys.length > 1 && emptyFiledsCond) {
        try {
            const artistId = req.body.artistId;
            const sub = req.body.email;
            const artistName = await unqfyClient.verifyArtist(artistId);  
            subscriptionsHandler.subscribe(artistId, artistName, sub);
                res.status(200).json(`${artistName} se ha suscripto`);
            } catch(e){ 
                if(e instanceof InstanceDoesNotExist) {
                    next(new Error('RelatedResourceNotFound'))
                } else {throw e}
            }
        } else {
            next(new Error("MissingParameter"));
        }
    })

router.route('/unsubscribe') 
    .post(async (req, res, next)=>{ // POST /api/unsubscribe/
        const keys = Object.keys(req.body);
        const emptyFiledsCond = Object.values(req.body).every(value => value !== "");
        if(keys.length > 1 && emptyFiledsCond) {
            try {
                const artistId = req.body.artistId;
                const sub = req.body.email;
                const artistName = await unqfyClient.verifyArtist(artistId);
                subscriptionsHandler.unsubscribe(artistId, artistName, sub);
                res.status(200).json(`${sub} se ha desuscripto`);
            } catch(e){ 
                if(e instanceof InstanceDoesNotExist) {next(new Error('RelatedResourceNotFound'))} else {throw e}
            }
        } else { next(new Error('MissingParameter')); }
    })

router.route('/notify')
    .post(async (req, res, next) => {
        const keys = Object.keys(req.body);
        const emptyFiledsCond = Object.values(req.body).every(value => value !== "");

        if(keys.length > 2 && emptyFiledsCond) {
            try{
                const artistId = req.body.artistId;
                const subject = req.body.subject;
                const message = req.body.message;
                await unqfyClient.verifyArtist(artistId);
                subscriptionsHandler.notifySubscribers(artistId, subject, message);
                res.status(200).send();
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
    .delete(async (req, res,next) => {//DELETE /api/subscriptions
        const keys = Object.keys(req.body);
        const emptyFiledsCond = Object.values(req.body).every(value => value !== "");

        if(keys.length > 0 && emptyFiledsCond) {
            try{
                const artistId = req.body.artistId;
                await unqfyClient.verifyArtist(artistId);
                subscriptionsHandler.deleteSubscriptions(artistId);
                res.status(200).send();
            } catch(error) {
                if(error instanceof InstanceDoesNotExist){
                    next(new Error("RelatedResourceNotFound"));
                } else throw error;
            }
        } else {
            next(new Error("MissingParameter")); 
        }
    })
    .get(async (req,res,next)=>{ // GET /api/subscriptions?artistId
        const artistId = req.query.artistId;
        if(artistId != undefined){
           try{ 
            await unqfyClient.verifyArtist(artistId);
            const subscribers = subscriptionsHandler.getSubscribersOf(artistId);    
            res.status(200).json({artistId: artistId, subscriptors: subscribers});
           } catch(error){
               next(new Error("RelatedResourceNotFound"));
           }
        } else {
            next(new InstanceDoesNotExist);
        }
    });


router.route('/status').get((req, res) => { res.status(200).send(JSON.stringify('OK'))});

appNewsletter.listen(5004, () =>{ console.log('Newsletter listening on port 5004')});


