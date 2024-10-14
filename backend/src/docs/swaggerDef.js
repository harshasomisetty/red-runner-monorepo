const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Game Shift Sales API documentation',
    version,
    license: {
      name: 'Closed'
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
    {
      url: `https://gameshift.clvtechnologies.com/v1`
    }
  ],
};

module.exports = swaggerDef;
