const fs = require('fs');
const path = require('path');
const defaultSettings = require('./default');

const customPath = path.resolve(__dirname, '../../config.json');

let customSetting = {};
if (fs.existsSync(customPath)) {
  console.log('加载配置文件:' + customPath);
  customSetting = require(customPath);
} else {
  console.log('加载默认配置');
}

module.exports = Object.assign({}, defaultSettings, customSetting);
