const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.post,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.get,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getById,
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.put,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.delete,
  },
];

module.exports = routes;
