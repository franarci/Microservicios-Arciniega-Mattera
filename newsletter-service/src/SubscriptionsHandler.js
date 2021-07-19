const  GMailAPIClient = require("./clientes/GMailAPIClient");
const  remitent = "lucasmattera97@gmail.com"; // PONER UN MAIL

class SubscriptionsHandler {
    constructor(){
        this.gmailClient = new GMailAPIClient();
        this.subscriptions = {1:[]};  //{artistID=>[suscriptores]}
    }

    async subscribe(artistId, mail){
        this.subscriptions[artistId].push(mail)  //O ALGO ASI
        await this.gmailClient.send_mail(mail, 'Usted esta suscrito a la lista', artistId, remitent);
    }

    async unsubscribe(artistId, mail){ 
        this.subscriptions[artistId] = this.subscriptions[artistId].filter(sub => sub != mail); 
        await this.gmailClient.send_mail(mail, 'Usted esta desuscrito de la lista', artistId, remitent);
    }

    getSubscribersOf(artistId){
        return this.subscriptions[artistId];
    }

    notifySubscribers(artistId, subject, message){
        const subscribers = this.getSubscribersOf(artistId);
        subscribers.forEach(subscriber => notifyNewAlbum(subscriber, subject, message));
    }

    async notifyNewAlbum(subscriber, subject, message) {
        await this.gmailClient.send_mail(subject, message, subscriber, remitent);
    }

    deleteSubscriptions(artistId){
        this.subscriptions[artistId] = [];
    }


}

module.exports = SubscriptionsHandler;