const mongoose = require('mongoose');

// use promise from node, since the promise from mongoose is deprecated.
mongoose.Promise = global.Promise;

module.exports = mongoose.connect('mongodb://localhost/open-crm');

