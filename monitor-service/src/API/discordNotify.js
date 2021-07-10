let fetch = require('node-fetch');
let rp = require('request-promise');
const { WebhookClient } = require('discord.js');
require("dotenv").config();

const wbhook_id = process.env.WEBHOOK_ID;
const wbhook_tkn = process.env.WEBHOOK_TKN;

const webhookClient = new WebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TKN,
);

let date = new Date();

function discordNotify_fetch(msg){
    return fetch(`https://discord.com/api/webhooks/${wbhook_id}/${wbhook_tkn}`,{
        method: 'POST',
        body: JSON.stringify({text:date + ': ' + msg}),
        headers: {
            'Content-type' : 'application/json'
        }
    }).then(response => response.json()).then(console.log)
    .catch(console.log)
}

function discordNotify_rp(msg){
    const options = {
        uri: `https://discord.com/api/webhooks/${wbhook_id}/${wbhook_tkn}`,
        headers: {'Content-Type': ' application/json',},
        body: `${msg}`,
        json:true
    }
    const res = rp.get(options);
    console.log(res);
}

function main(){
    if(process.argv[2] == 'fetch'){discordNotify_fetch('test msg discord notify fetch')} 
    else if (process.argv[2] == 'rp'){discordNotify_rp('test msg discord notify rp')}
    else if (process.argv[2] == 'wbhk`'){
        webhookClient.send(`${date} test msg discord notify web hook client`)
            .then(message => console.log(`mensaje enviado: ${message.content}`))
            .catch(console.error)
    }
}


console.log(process.env.WEBHOOK_ID);
console.log(process.env.WEBHOOK_TKN);
main();
//module.exports = discordNotify;