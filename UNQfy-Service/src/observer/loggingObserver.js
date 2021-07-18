let fs = require('fs');
const Observer= require('./observer');
const LoggingClient = require('../clients/Logging/LoggingClient');
const LoggingClientInstance = new LoggingClient.LogginClient();

const events = {
   newAlbum : "New album: ",
   newTrack:  "New track: ",
   newArtist:  "New artist: ",
   removedArtist:  "Removed artist: ",
   removedAlbum: "Removed album: ",
   removedTrack: "Removed track: ",
};

class LoggingObserver extends Observer{

   update(event, eventData){
      switch(event){
         case "error":
            LoggingClientInstance.logError(eventData.msg);
            break;
         case "warning":
            LoggingClientInstance.logWarning(eventData.msg);
            break;
         case "debug":
            LoggingClientInstance.logDebug(eventData.msg);
            break;
         default:
            LoggingClientInstance.logInfo(events[event]+eventData.changedObject.name);
            break;
      }

   }
}

module.exports = LoggingObserver;