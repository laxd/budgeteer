const winston = require('winston');

const logger = winston.createLogger({
    level: 'silly',
    transports: [
        new winston.transports.Console()
    ]
});

module.exports = logger;