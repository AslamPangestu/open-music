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
];

module.exports = routes;
