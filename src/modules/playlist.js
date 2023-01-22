const plugin = require('../api/playlist');
const model = require('../models/Playlist');
const PlaylistService = require('../services/PlaylistService');
const PlaylistSongService = require('../services/PlaylistSongService');
const SongRepository = require('../repositories/SongRepository/postgres');
const CollaborationRepository = require('../repositories/CollaborationRepository/postgres');
const PlaylistRepository = require('../repositories/PlaylistRepository/postgres');
const PlaylistSongActivityRepository = require('../repositories/PlaylistSongActivityRepository/postgres');
const PlaylistSongRepository = require('../repositories/PlaylistSongRepository/postgres');

const PlaylistModule = () => {
  const playlistRepository = new PlaylistRepository();
  const collaborationRepository = new CollaborationRepository();
  const playlistSongActivityRepository = new PlaylistSongActivityRepository();
  const songRepository = new SongRepository();
  const playlistSongRepository = new PlaylistSongRepository();

  const playlistService = new PlaylistService({
    playlistRepository,
    collaborationRepository,
    playlistSongActivityRepository,
    playlistSongRepository,
    model,
  });
  const playlistSongService = new PlaylistSongService({
    playlistRepository,
    playlistSongRepository,
    playlistSongActivityRepository,
    songRepository,
    model,
  });

  return {
    plugin,
    options: { playlistService, playlistSongService, model },
  };
};

module.exports = PlaylistModule;
