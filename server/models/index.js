const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const settings = require('../config');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(settings.db.uri, settings.db.opt);

const db = mongoose.connection;
autoIncrement.initialize(db);

db.once('open', () => {
  console.log('connect mongodb success');
});

db.on('error', function(error) {
  console.error('Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});

db.on('close', function() {
  console.log('数据库断开，重新连接数据库');
});

module.exports = {
  User: require('./user'),
};

//DoraModelEnd
