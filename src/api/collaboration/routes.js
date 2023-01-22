const routes = (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.create,
    options: {
      auth: 'jwt_auth',
    },
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.delete,
    options: {
      auth: 'jwt_auth',
    },
  },
];

module.exports = routes;
