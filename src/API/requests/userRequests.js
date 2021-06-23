const express = require('express');
const {unqfy, saveUNQfy} = require('./saveAndLoadUNQfy');
const { errorHandler } = require('../apiErrors');
const {InstanceDoesNotExist} = require('../../errors');

const appUser = express();
const router = express.Router();
router.use(express.json());

/**
 * 
 */

function getNotRecursiveTracks(recursiveTracksList){
    return recursiveTracksList.map(trackRec => ({
        track_name:trackRec.name, track_duration:trackRec.duration
    }));
        /* new Object(
            track_name=trackRec.name, 
            track_duration=trackRec.duration
        ) */
}

function standardJSONOutput(user){
    return {
        id: user.id,
        name: user.name,
        listened: getNotRecursiveTracks(user.getListened()), 
    }
}

appUser.use('/users', router);


router.route('/')
    .get((req, res, next) => { // GET /api/users?name=
        let users;
        let keys = Object.keys(req.query);
        if(req.query.name != undefined){
            users = unqfy.filterByName(req.query.name, 'users');
            const jsonusers = users.map(user => standardJSONOutput(user));
            res.send(jsonusers);            
        } else if(keys.length == 0) {
            users = unqfy.getUsers();
            const jsonusers = users.map(user => standardJSONOutput(user));
            res.send(jsonusers);
        } else {
            throw new Error('InvalidInputKey');
        }
        const jsonusers = users.map(user => standardJSONOutput(user)); 
        res.send(jsonusers);
    })
    .post((req, res, next) => { // POST api/users
        const keys = Object.keys(req.body);
        const emptyFiledsCond = Object.values(req.body).every(value => value != "");
        
        if(keys.length == 1 && emptyFiledsCond){
                const user = unqfy.createUser(req.body.name);
                saveUNQfy(unqfy);        
                res.status(201).send(standardJSONOutput(user));            
        } else {
            next(new Error("MissingParameter"));
        }
   })

router.route('/:id')
    .get((req, res, next) => { // GET /api/users/id
        const user = unqfy.getInstanceByAttribute(req.params.id, 'user');
        res.send(standardJSONOutput(user));
    })
    .patch((req, res, next) => { // PATCH /api/users:id
        const keys = Object.keys(req.body); 
        const emptyFiledsCond = Object.values(req.body).every(value => value !== "");
        let user = unqfy.getInstanceByAttribute(req.params.id, 'user');
        
        if(keys.length > 0 && emptyFiledsCond){
            try{
                if(req.body.track != undefined){
                    const track = unqfy.getInstanceByAttribute(req.body.track, 'track');
                    user.listenTrack(track);
                } else {
                    user = unqfy.modifyInstance(req.params.id, 'user', req.body);
                }
                saveUNQfy(unqfy);
                res.send(standardJSONOutput(user));
            } catch {
                next(new Error('RelatedResourceNotFound'));
            }
        } else {
            next(new Error("MissingParameter"));
        }
    }).delete((req, res, next) => { // DEL /api/users/id
        const user = unqfy.getInstanceByAttribute(req.params.id, 'user');
        unqfy.deleteUser(user);
        saveUNQfy(unqfy);
        res.status(204);
        res.send();
    })
appUser.use(errorHandler);

module.exports={appUser: appUser}  
