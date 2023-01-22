const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.createPlaylist,
    options: {
      auth: 'jwt_auth',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.readPlaylists,
    options: {
      auth: 'jwt_auth',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: handler.deletePlaylist,
    options: {
      auth: 'jwt_auth',
    },
  },
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: handler.addSongPlaylist,
    options: {
      auth: 'jwt_auth',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: handler.readPlaylistSongs,
    options: {
      auth: 'jwt_auth',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: handler.removeSongPlaylist,
    options: {
      auth: 'jwt_auth',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/activities',
    handler: handler.readPlaylistActivity,
    options: {
      auth: 'jwt_auth',
    },
  },
];

module.exports = routes;
