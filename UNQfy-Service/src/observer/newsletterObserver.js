const NewsletterClient = require('../clients/NewsletterClient');
const Observer = require('./observer');
const NLClientInstance = new NewsletterClient();

class NewsletterObserver extends Observer{

     update(event, eventData){
        if(event == "newAlbum"){
            NLClientInstance.newAlbum(eventData);
        }

        if(event == "removedArtist"){
           NLClientInstance.removedArtist(eventData);
        }
      }
 }
 
 module.exports = NewsletterObserver;
