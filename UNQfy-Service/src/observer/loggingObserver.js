let fs = require('fs');
const Observer = require('./observer')
const { newLog } = require('../../../logging-service/src/API/loggingApi') ;


class LoggingObserver extends Observer{
    async update(event, object){
         let log= {
            msg: logs[event] + object.name,
            nivel: ""
         }
       await newLog(log);
    }
}

module.exports = LoggingObserver;