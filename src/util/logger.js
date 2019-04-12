const { Signale } = require("signale");
const config = require("../config");

const logger = new Signale();

logger.addSecrets(config.token);

module.exports = logger;
