const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const general = require('./general');

let UserSchema = new Schema({
  level: Number, // 用户级别, level 0 超级管理员
  name: String, // 用户姓名
  email: String,
  password: String,
  enable: {
    type: Boolean,
    default: true,
  }, //用户是否有效
});

module.exports = general.model('user', UserSchema);
