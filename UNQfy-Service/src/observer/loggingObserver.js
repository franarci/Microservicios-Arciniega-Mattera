let fs = require('fs');
const Observer= require('./observer');
const LoggingClient = require('../clients/Logging/LoggingClient');
const LoggingClientInstance = new LoggingClient.LogginClient();
const { newLog } = require('../../../logging-service/src/API/loggingApi') ;

const events = {
   newAlbum : "New album: ",
   newTrack:  "New track: ",
   newArtist:  "New artist: ",
   removedArtist:  "Removed artist: ",
   removedAlbum: "Removed album: ",
   removedTrack: "Removed track: ",
};

class LoggingObserver extends Observer{

   update(event, eventObject){
      switch(event){
         case "error":
            LoggingClientInstance.logError(eventObject.msg);
            break;
         case "warning":
            LoggingClientInstance.logWarning(eventObject.msg);
            break;
         case "debug":
            LoggingClientInstance.logDebug(eventObject.msg);
         default:
            LoggingClientInstance.logInfo(events[event]+eventObject.name);
      }

   }
}

module.exports = LoggingObserver;