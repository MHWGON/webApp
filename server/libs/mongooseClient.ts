//连接数据库
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/mongoDB', { useNewUrlParser: true, useUnifiedTopology: true });

// var db = mongoose.connection;   // 数据库连接对象

// db.on('error', console.error.bind(console, 'DB connection error'));

// db.once('open', function () {
// 	console.log('mongooseDB connection success');
// })

var mongoose = require('mongoose');

class MongooseClient {

    private client: any;
		
    constructor(dbURL: string) {
			mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
			this.client = mongoose.connection;	// 数据库链接对象
    }
    connect() {
			this.client.on('error', function () {
				console.log('mongooseDB connection error')
			});

			this.client.once('open', function () {
				console.log('mongooseDB ready');
			})
			return this.client;
    }
}

module.exports = MongooseClient;