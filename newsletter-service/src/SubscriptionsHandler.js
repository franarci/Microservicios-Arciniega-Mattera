const  GMailAPIClient = require("../../../send-mail-example/GMailAPIClient");
const  remitent = ""; // PONER UN MAIL

class SubscriptionsHandler {
    constructor(){
        this.gmailClient = new GMailAPIClient();
        this.subscriptions = {};  //{artist=>[suscriptores]}
    }

    subscribe(artist, mail){
        this.subscriptions[artistId].push(mail)  //O ALGO ASI
    }

    getSubscribersOf(artistId){
        return this.subscriptions[artistId];
    }

    notifySubscribers(artistId, subject, message){
        const subscribers = this.getSubscribersOf(artistId);
        subscribers.forEach(subscriber => notifyNewAlbum(subscriber, subject, message));
    }

    async notifyNewAlbum(subscriber, subject, message) {
        await GMailAPIClient.send_mail(subject, message, subscriber, remitent);
    }

    deleteSubscriptions(artistId){
        this.subscriptions[artistId] = [];
    }


}

module.exports = SubscriptionsHandler;