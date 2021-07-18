const NewsletterClient = require('../clients/NewsletterClient');
const NLClientInstance = new NewsletterClient.NewsletterClient();

class NewsletterObserver extends Observer{

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
 
 module.exports = NewsletterObserver;
