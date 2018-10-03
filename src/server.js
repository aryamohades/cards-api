/* eslint-disable no-process-exit */
const http = require('http');
const path = require('path');
const app = require('./app');
const models = require('./models');
const log = require('./logger');

const init = async () => {
  try {
    await models.sequelize.authenticate();

    await models.sequelize.sync({
      force: process.env.NODE_ENV === 'development'
    });

    if (process.env.NODE_ENV === 'development') {
      await models.fixtures.loadFile(
        path.join(__dirname, '/models/fixtures/*.json'),
        models
      );
    }

    start();
  } catch (e) {
    throw e;
  }
};

const start = async () => {
  try {
    const port = process.env.PORT;

    const server = http.createServer(app);

    server.listen(port, () => {
      process.on('SIGINT', stop);

      process.on('SIGTERM', stop);

      log.info('[api] Server listening on ' + port);
    });
  } catch (e) {
    throw e;
  }
};

async function stop() {
  try {
    log.info('[api] Stopping server gracefully');

    await models.sequelize.close();

    process.exit(0);
  } catch (e) {
    log.error('[api] Disconnect from database failed: ' + e.message);

    process.exit(1);
  }
}

init();
