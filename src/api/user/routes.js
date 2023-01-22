const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.register,
  },
];

module.exports = routes;
