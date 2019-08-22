const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

exports.model = function(model, schema) {
  if (schema instanceof mongoose.Schema === false) {
    schema = new mongoose.Schema(schema);
  }
  schema.virtual('id').get(function() {
    return this._id;
  });
  schema.set('toJSON', {getters: true, virtuals: true});
  schema.set('toObject', {getters: true, virtuals: true});
  
  schema.set('autoIndex', false);
  schema.plugin(autoIncrement.plugin, {model: model, field: 'uid'});

  return mongoose.model(model, schema, model);
};
