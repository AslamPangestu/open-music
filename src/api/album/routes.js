const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.create,
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.readById,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.update,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.delete,
  },
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    handler: handler.uploadCover,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      },
    },
  },
];

module.exports = routes;
