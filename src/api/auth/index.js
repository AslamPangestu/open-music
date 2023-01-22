const Handler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'auth',
  version: '1.0.0',
  register: async (server, {
    authenticationsService, userService, tokenManager, model,
  }) => {
    const handler = new Handler(
      authenticationsService,
      userService,
      tokenManager,
      model,
    );
    server.route(routes(handler));
  },
};
