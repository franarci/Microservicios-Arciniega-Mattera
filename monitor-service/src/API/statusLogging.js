const fetch = require('node-fetch');
const Monitor = require('ping-monitor');

function checkStatusLogging(){
    
    const myMonitor = new Monitor({
        website:'http://localhost:5003',
        title:'Logging',
        interval: 10,
        config: { intervalUnits: 'seconds' },
        httpOptions: {
            path: '/api/status',
            method: 'get',
        },
        expect: {
            statusCode: 200,
        }
    });

    myMonitor.on('up',function(res,state){
        myMonitor.totalRequestPost = myMonitor.resetValPost
        return fetch('http://localhost:5002/api/monitor/statusLogging', {
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body:JSON.stringify({
                unqfyStatus: 'ON', 
                msg: ':green_circle: Logging esta funcionando correctamente'
            })
        })
            .then(res => res.json().then(
                console.log('LOGGING ON'),
                console.log('<----------------------->')
            ))
            .catch(err => console.error(err))
    });  

    myMonitor.on('error', function(res){
        myMonitor.totalRequestPut = myMonitor.resetValPut
        return fetch('http://localhost:5002/api/monitor/statusLogging', {
            method: 'POST', 
            headers:{ 'Content-Type': 'application/json' },
            body:JSON.stringify({
                unqfyStatus: 'OFF',
                msg: ':red_circle: Logging ha dejado de funcionar'
            })
        })
            .then(res => res.json().then(
                console.log('LOGGING OFF'), 
                console.log('<----------------------->')
            ))
            .catch(err => console.error(err))
    });

    return myMonitor;
}   

module.exports = checkStatusLogging;
