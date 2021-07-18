const NewsletterClient = require('../clients/NewsletterClient');
const NLClientInstance = new NewsletterClient.NewsletterClient();

class NewsletterObserver extends Observer{

    update(event, eventData){
        if(event == "newAlbum"){
            NLClientInstance.newAlbum(eventData);
        }
    }
 }
 
 module.exports = NewsletterObserver;
