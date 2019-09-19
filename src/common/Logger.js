const logger = require('log4js').getLogger();

function Logger(){

    logger.level = 'debug';

    return logger;
}

module.exports = new Logger;