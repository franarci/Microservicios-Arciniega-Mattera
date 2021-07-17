let fs = require('fs');
const Observer= require('./observer');
const LoggingClient = require('../clients/Logging/LoggingClient');
const { newLog } = require('../../../logging-service/src/API/loggingApi') ;

const logs = {
   newAlbum : "New album: ",
   newTrack:  "New track: ",
   newArtist:  "New artist: ",
   removedArtist:  "Removed artist: ",
   removedAlbum: "Removed album: ",
   removedTrack: "Removed track: ",
   error:  "An error occurred: " ,
   warning: "Warning: ",
   debug: "Debug: "
};

class LoggingObserver extends Observer{

   update(event, eventObject){
      switch(event){
         case "error":
            LoggingClient.logError(logs[error]+eventObject.msg);
            break;
         case "warning":
            LoggingClient.logWarning(logs[warning]+eventObject.msg);
            break;
         case "debug":
            LoggingClient.logDebug(logs[event]+eventObject.msg);
         default:
            LoggingClient.logInfo(logs[event]+eventObject.name);
      }

   }
}

module.exports = LoggingObserver;