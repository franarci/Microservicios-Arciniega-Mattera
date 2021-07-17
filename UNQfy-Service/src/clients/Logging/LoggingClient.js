const rp = require('request-promise');
const BASE_URL = process.env.LOGGING_HOST + '/api/logging';

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
        rp.post(this.options);
    }

    async logError(msg) {
        this.options.body = { message: msg, level: 'error'};
        rp.post(this.options);
    }

    async logDebug(msg) {
        this.options.body = { message: msg, level: 'debug'};
        rp.post(this.options);
    }

    async logWarning(msg){
        this.options.body = { message: msg, level: 'warning'};
        rp.post(this.options);
    }
}

module.exports = {
    LogginClient: LogginClient,
};