require('dotenv').config();

const Hapi = require('@hapi/hapi');
const jwt = require('@hapi/jwt');

const ErrorHandler = require('./core/ErrorHandler');

const SongModule = require('./modules/song');
const AlbumModule = require('./modules/album');
const AuthModule = require('./modules/auth');
const UserModule = require('./modules/user');
const PlaylistModule = require('./modules/playlist');
const CollaborationModule = require('./modules/collaboration');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // External Plugin
  await server.register([{ plugin: jwt },
  ]);

  server.auth.strategy('jwt_auth', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });
  // Feature Plugin
  await server.register(AlbumModule());
  await server.register(SongModule());
  await server.register(AuthModule());
  await server.register(UserModule());
  await server.register(PlaylistModule());
  await server.register(CollaborationModule());

  server.ext('onPreResponse', ErrorHandler);

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
