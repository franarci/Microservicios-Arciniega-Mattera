const fetch = require('node-fetch');
const Monitor = require('ping-monitor');

function checkStatusUNQfy(){
    
    const myMonitor = new Monitor({
        website:'http://localhost:5001',
        title:'UNQFy',
        interval: 10,
        config: { intervalUnits: 'seconds' },
    });

    myMonitor.on('up',function(res,state){
        myMonitor.totalRequestPost = myMonitor.resetValPost
        return fetch('http://localhost:5002/api/monitor/statusUNQfy', {
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body:JSON.stringify({unqfyStatus: 'ON'})
        })
            .then(res => res.json().then(
                console.log('UNQFY ON'),
                console.log('<----------------------->')
            ))
            .catch(err => console.error(err))
    });   
    
    myMonitor.on('down',function(res,state){
        myMonitor.totalRequestPost = myMonitor.resetValPost
        return fetch('http://localhost:5002/api/monitor/statusUNQfy', {
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body:JSON.stringify({unqfyStatus: 'OFF'})
        })
            .then(res => res.json().then(
                console.log('UNQFY OFF'),
                console.log('<----------------------->')
            ))
            .catch(err => console.error(err))
    });   

    myMonitor.on('error', function(res){
        myMonitor.totalRequestPut = myMonitor.resetValPut
        return fetch('http://localhost:5002/api/monitor/statusUNQfy', {
            method: 'POST', 
            headers:{ 'Content-Type': 'application/json' },
            body:JSON.stringify({unqfyStatus: 'ERROR'})
        })
            .then(res => res.json().then(
                console.log('UNQFY ERROR'), 
                console.log('<----------------------->')
            ))
            .catch(err => console.error(err))
    });

    return myMonitor;
}   

module.exports = checkStatusUNQfy;