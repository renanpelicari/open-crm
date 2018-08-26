const express = require('express');

module.exports = function(server) {

  // Routes API
  const router = express.Router();
  server.use('/api', router);

  // Customer Routes
  const customerController = require('../api/controller/customerController');
  customerController.register(router, '/customers');
};
