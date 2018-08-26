const Customer = require('../model/customer');

Customer.methods(['get', 'post', 'put', 'delete']);

// changed the default behavior
// new: to send back the new record instead the old, after change
// runValidators: validates the constraint of object when perform update
Customer.updateOptions({ new: true, runValidators: true });

module.exports = Customer;
