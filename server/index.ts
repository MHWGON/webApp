import { Request, Response, NextFunction } from 'express';
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
// const cors = require('cors');
const http = require('http');
const CONST = require('./const/index');
const indexRouter = require('./routes/index');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(cors(
//   {
//     origin:['http://localhost:5003'],
//     methods:['GET', 'POST'],
//     alloweHeaders:['X-Requested-With', 'Content-Type', 'Authorization']
//   }
// ));

// 链接Mongoose数据库
const MongooseClientClass = require('./libs/mongooseClient');
const mongooseClient = new MongooseClientClass('mongodb://localhost/mongoDB');
mongooseClient.connect();

// 链接Redis数据库
const RedisClientClass = require('./libs/redisClient');

const redisClient = new RedisClientClass({
  port: CONST.Redis.PORT,
  host: CONST.Redis.HOST,
  db: CONST.Redis.DB,
  password: CONST.Redis.PASS,
  prefix: CONST.Redis.PREFIX,
});

app.use(session({
  name: 'SESSIONID',
  secret: 'webAPP',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  },
  resave: false,  // 强制保存sessoin即使它没有变化 默认 true
  rolling: true,  // 每次请求时强制设置cookie，这将重置cookie的过期时间 默认 false
  saveUninitialized: false,  // 强制将未初始化的session存储
  store: new RedisStore({
    ttl: 60 * 60 * 24,  // 过期时间，默认是session.maxAge, 或者是一天
    client: redisClient.connect(),
  }),
}));

app.use(express.static('public'));
// static前缀静态文件
app.use('/static', express.static(__dirname + '/public'));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: any, next: (arg0: any) => void) {
  next(createError(404));
});

// error handler
app.use(function(err: { message: any; status: any; }, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send('server error');
});

app.set('port', CONST.port);
const server = http.createServer(app);

app.listen(CONST.port,()=>{
	console.log(`server start: localhost:${CONST.port}`);
});

module.exports = app;
