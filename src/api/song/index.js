const Handler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, model }) => {
    const handler = new Handler(service, model);
    server.route(routes(handler));
  },
};
