const Handler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { albumService, userAlbumLikeService, model }) => {
    const handler = new Handler({ albumService, userAlbumLikeService, model });
    server.route(routes(handler));
  },
};
