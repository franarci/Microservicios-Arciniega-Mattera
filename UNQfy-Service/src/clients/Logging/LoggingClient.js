const rp = require('request-promise');
require("dotenv").config();

let PORT = process.env.LOGGING_PORT;
let IP = process.env.LOGGING_IP;

const BASE_URL = `http://${IP}:${PORT}/api/logging`;

class LoggingClient {
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

module.exports =  LoggingClient;
