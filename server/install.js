const fs = require('fs-extra');
const models = require('./models/index.js');
const settings = require('./config');
const md5 = require('./util/md5');
const mongoose = require('mongoose');
const path = require('path');

function install() {
    // let exist = fs.existsSync(path.resolve(__dirname, 'init.lock'));
    // if (exist) {
    //   throw new Error('init.lock文件已存在，请确认您是否已安装。如果需要重新安装，请删掉init.lock文件');
    // }

    setupSql();
}

function setupSql() {
    let UserCol = mongoose.connection.collection('user');

    UserCol.createIndex({ email: 1 }, { unique: true }); // 教师邮箱唯一

    const initAdmin = settings.initAdmin;
    const manager = Object.assign({}, settings.initAdmin)
    manager.password = md5(manager.password);
    let result = models.User.create(manager);

    result.then(
        function () {
            fs.ensureFileSync(path.resolve(__dirname, 'init.lock'));
            console.log(`初始化管理员账号成功,账号名：${initAdmin.email}，密码：${initAdmin.password}`); // eslint-disable-line
            process.exit(0);
        },
        function (err) {
            throw new Error(`初始化管理员账号 "${initAdmin.email}" 失败, ${err.message}`); // eslint-disable-line
        },
    );
}

install();
