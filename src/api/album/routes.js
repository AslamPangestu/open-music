const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.post,
  },
  {
    method: 'GET',
    path: '/albums',
    handler: handler.get,
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.getById,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.put,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.delete,
  },
];

module.exports = routes;
