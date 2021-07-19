const rp = require('request-promise');
const BASE_URL = 'http://localhost:5003/api/logging';

class LogginClient {
    constructor() {
        this.options = this.getOptions();
    }

    getOptions() {
        const options = {
            uri: BASE_URL,
            json: true
        };
        return options;
    }

    async logInfo(msg) {
        this.options.body = { message: msg, level: 'info'};
        await rp.post(this.options);
    }

    async logError(msg) {
        this.options.body = { message: msg, level: 'error'};
        await rp.post(this.options);
    }

    async logDebug(msg) {
        this.options.body = { message: msg, level: 'debug'};
        await rp.post(this.options);
    }

    async logWarning(msg){
        this.options.body = { message: msg, level: 'warning'};
        await rp.post(this.options);
    }
}

module.exports =  LogginClient;