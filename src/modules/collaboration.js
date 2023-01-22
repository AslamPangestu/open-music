const plugin = require('../api/collaboration');
const model = require('../models/Collaboration');
const Service = require('../services/CollaborationService');
const UserRepository = require('../repositories/UserRepository/postgres');
const CollaborationRepository = require('../repositories/CollaborationRepository/postgres');
const PlaylistRepository = require('../repositories/PlaylistRepository/postgres');

const CollaborationModule = () => {
  const collaborationRepository = new CollaborationRepository();
  const userRepository = new UserRepository();
  const playlistRepository = new PlaylistRepository();
  const service = new Service({
    collaborationRepository, playlistRepository, userRepository, model,
  });

  return {
    plugin,
    options: { service, model },
  };
};

module.exports = CollaborationModule;
