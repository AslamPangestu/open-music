const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.create,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.readAll,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.readById,
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.update,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.delete,
  },
];

module.exports = routes;
