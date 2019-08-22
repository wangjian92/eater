module.exports = {
  initAdmin: {
    level: 0,
    name: 'admin',
    email: 'admin@admin.com',
    password: 'admin',
  },
  db: {
    uri: 'mongodb://127.0.0.1:27017/eater', // 数据库uri
    opt: {
      poolSize: 50, // 连接池大小
      auto_reconnect: true, // 自动重连
    },
  },
  session: {
    name: 'SID',
    secret: 'SID',
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 4 * 60 * 60 * 1000,
    },
    ttl: 4 * 60 * 60,
  },
  hostname: '0.0.0.0',
  port: '3000',
  staticDir: './temp', // 静态资源文件位置，起始位置为工程根目录
};
