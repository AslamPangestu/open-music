const ClientError = require('./exceptions/ClientError');

const ErrorHandler = (request, h) => {
  // mendapatkan konteks response dari request
  const { response, route } = request;
  if (response instanceof Error) {
    // penanganan client error secara internal.
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }
    // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
    if (!response.isServer) {
      return h.continue;
    }
    // eslint-disable-next-line no-console
    console.error(`ERR ${route.method}`, {
      path: route.path, message: response.message,
    });
    // penanganan server error sesuai kebutuhan
    const newResponse = h.response({
      status: 'error',
      message: 'terjadi kegagalan pada server kami',
    });
    newResponse.code(500);
    return newResponse;
  }
  // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
  return h.continue;
};

module.exports = ErrorHandler;
