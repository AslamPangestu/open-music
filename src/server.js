require('dotenv').config();

const Hapi = require('@hapi/hapi');

const ErrorHandler = require('./core/ErrorHandler');

const SongModule = require('./modules/song');
const AlbumModule = require('./modules/album');

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

  await server.register(AlbumModule());
  await server.register(SongModule());

  server.ext('onPreResponse', ErrorHandler);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
