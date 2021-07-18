
class SubscriptionsHandler {
    constructor(){
        this.subscriptions = {};  //{artist=>[suscriptores]}
    }

    subscribe(artist, mail){
        this.subscriptions[artistId].push(mail)  //O ALGO ASI
    }

    getSubscribersOf(artistId){
        return this.subscriptions[artistId];
    }

    notifySubscribers(artistId){
        const subscribers = this.getSubscribersOf(artistId);
        subscribers.forEach(subscriber => notifyNewAlbum(subscriber));
    }

    notifyNewAlbum(subscriber) {
        //send mail to subscriber
    }
}

module.exports = SubscriptionsHandler;