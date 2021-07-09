let fetch = require('node-fetch');

function discordNotify(msg){
    let date = new Date();
    return fetch('https://discord.com/api/webhooks/862704993441153075/c9Ceni6RYf7J_LbGjANWWTpCKUUde_pSXMeAz8clYjVn7HP2wuHUpYJDGQ326FHECLVa',{
        method: 'POST',
        body: JSON.stringify({text:date + msg}),
        headers: {
            'Content-type' : 'application/json'
        }
    }).then(response => response.json())
}

//discordNotify('test');

module.exports = discordNotify;