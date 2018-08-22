const routes = require('next-routes')();

routes
  .add('/rentals/new', '/rentals/new')
  .add('/rentals/:address', '/rentals/show');

module.exports = routes;
