const express = require('express');
const {Monitor} = require('../../monitor');
const { errorHandler } = require('../apiErrors');
const appMonitor = express();
const router = express.Router();

router.use(express.json());
appMonitor.use('/api/monitor', router);
appMonitor.use((req,res,next)=>{next(new Error('Invalid route'))});
appMonitor.use(errorHandler);
appMonitor.listen(5002);

router.route('/services')
    .get((req, res) => {

    })

router.route('/notify')
    .post((req, res) => {

    })

router.route('/start')
    .post((req, res) => {

    })

router.route('/stop')
    .post((req, res) => {

    })
