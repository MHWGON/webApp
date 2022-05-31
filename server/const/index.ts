const path = require('path');
exports.port = 7001;
exports.secretKey = 'USERAUTHSECRETKEY';

exports.Redis = {
  PORT: '6379',
  HOST: '127.0.0.1',
  DB: '0',
  PASS: 'liangliang',
  PREFIX: 'webApp:',
};

exports.PATH = {
  VIEW: path.join(__dirname, '../client/views'),
  VIEW_DIST: path.join(__dirname, '../views')
};
