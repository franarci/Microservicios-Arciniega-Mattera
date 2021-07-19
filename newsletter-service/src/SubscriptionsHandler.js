const  GMailAPIClient = require("./clientes/GMailAPIClient");
const  remitent = "lucasmattera97@gmail.com"; // PONER UN MAIL

class SubscriptionsHandler {
    constructor(){
        this.gmailClient = new GMailAPIClient();
        this.subscriptions = new Map(); //{1:[]};  //{artistID=>[suscriptores]}
    }

    async subscribe(artistId, artistName, subscriber){
        if(this.hasSubs(artistId)){
            this.subscriptions[artistId] = this.subscriptions[artistId].push(mail);  //O ALGO ASI
        } else {
            this.subscriptions[artistId] = [subscriber];
        }
        await this.gmailClient.send_mail('Notificacion de NL', `Usted esta suscrito al artista ${artistName}`, subscriber, remitent);
    }

    hasSubs(artistId){
        const artistsIds = Object.keys(this.subscriptions);
        return artistsIds.some(id => id == artistId );
    }

    async unsubscribe(artistId, artistName, subscriber){ 
        this.subscriptions[artistId] = this.subscriptions[artistId].filter(sub => sub != mail); 
        await this.gmailClient.send_mail('Notificacion de NL', `Usted esta desuscrito al artista ${artistName}`, subscriber, remitent);
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