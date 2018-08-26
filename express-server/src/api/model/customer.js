const restful = require('node-restful');
const mongoose = restful.mongoose;

const SchemaTypes = mongoose.Schema.Types;

const customerSchema = new mongoose.Schema({
  name: { type: SchemaTypes.String, required: true },
  mobile: { type: SchemaTypes.String, required: true },
  email: { type: SchemaTypes.String, required: true },
  state: { type: SchemaTypes.String, required: false },
  city: { type: SchemaTypes.String, required: false },
  score: { type: SchemaTypes.Number, required: false, default: 0.0 },
});

module.exports = restful.model('Customer', customerSchema);
