const routes = (handler) => [
  {
    method: 'POST',
    path: '/export/playlists/{id}',
    handler: handler.exportPlaylist,
    options: {
      auth: 'jwt_auth',
    },
  },
];

module.exports = routes;
