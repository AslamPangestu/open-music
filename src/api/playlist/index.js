const Handler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, {
    playlistService, playlistSongService, model,
  }) => {
    const handler = new Handler(playlistService, playlistSongService, model);
    server.route(routes(handler));
  },
};
