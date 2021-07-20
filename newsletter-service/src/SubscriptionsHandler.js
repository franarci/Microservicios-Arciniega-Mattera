const  GMailAPIClient = require("./clientes/GMailAPIClient");
const  remitent = "fran.arciniega96@gmail.com"; // PONER UN MAIL

class SubscriptionsHandler {
    constructor(){
        this.gmailClient = new GMailAPIClient();
        this.subscriptions = new Map(); //{1:[]};  //{artistID=>[suscriptores]}
    }

    subscribe(artistId, artistName, subscriber){
        if(this.artistExists(artistId)){

            this.subscriptions[artistId].push(subscriber);  //O ALGO ASI
        } else {
            this.subscriptions[artistId] = [subscriber];
        }
        this.gmailClient.send_mail('Notificacion de NL', 
                                        [ `Usted esta suscrito al artista ${artistName}`],
                                        { 
                                            "name": "Lucas",
                                            "email":subscriber
                                        }, 
                                        {   "name": "El equipo de unqfy",
                                            "email":remitent
                                        }
                                        ).then( (gmailResponse) => {
                                            console.log("Mail enviado!");
                                            
                                          }).catch( (error) => {
                                            console.error("Algo salió mal");
                                            
                                        });
                                        
    }

    artistExists(artistId){
        const artistsIds = Object.keys(this.subscriptions);
        return artistsIds.some(id => id == artistId );
    }

    async unsubscribe(artistId, artistName, subscriber){
        if(this.artistExists(artistId)){
            this.subscriptions[artistId] = this.subscriptions[artistId].filter(sub => sub != subscriber); 
            this.gmailClient.send_mail('Notificacion de NL', 
                                            [ `Usted esta desuscripto del artista ${artistName}`],
                                            { 
                                                "name": "Usted",
                                                "email":subscriber
                                            }, 
                                            {   
                                                "name": "El equipo de unqfy",
                                                "email":remitent
                                            }
                                            ).then( (gmailResponse) => {
                                                console.log("Mail enviado!");
                                                console.log(gmailResponse);
                                              }).catch( (error) => {
                                                console.error("Algo salió mal");
                                                console.error(error);
                                            });
        }
    }

    getSubscribersOf(artistId){
        if(this.subscriptions[artistId] == undefined){
            return [];
        } else return this.subscriptions[artistId];
        
    }

    notifySubscribers(artistId, subject, message){
        const subscribers = this.getSubscribersOf(artistId);
        subscribers.forEach(subscriber => this.notifyNewAlbum(subscriber, subject, message));
    }

    notifyNewAlbum(subscriber, subject, message) {
        this.gmailClient.send_mail(subject, 
                                   [message],
                                   { 
                                       "name": "Usted",
                                       "email":subscriber
                                   }, 
                                   {   
                                       "name": "El equipo de unqfy",
                                       "email":remitent
                                   }
                                   ).then( (gmailResponse) => {
                                       console.log("Mail enviado!");
                                       console.log(gmailResponse);
                                     }).catch( (error) => {
                                       console.error("Algo salió mal");
                                       console.error(error);
                                   });
    }

    deleteSubscriptions(artistId){
        this.subscriptions[artistId] = [];
    }


}

module.exports = SubscriptionsHandler;