const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.login,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.refreshToken,
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.removeToken,
  },
];

module.exports = routes;
