// const redis = require('redis');
// var CONST = require('../const');

// const client = redis.createClient({
//     port: CONST.Redis.PORT,
//     host: CONST.Redis.HOST,
//     db: CONST.Redis.DB,
//     password: CONST.Redis.PASS,
//     prefix: CONST.Redis.PREFIX,
// });

// // 链接redis库
// client.connect();    // rdedis 4.+以上

// // 1 键值对测试
// client.set('key', 'valueTest', redis.print);
// client.get('key', function (err: any, value: string) {
//     if (!err) console.log("value---", value);
//     else client.quit();
// })

// client.on('ready', () => {
//     console.log('redis ready');
// });
// client.on('error', (err: Record<string, any>) => {
//     console.error(`Error ${JSON.stringify(err)}`);
// });

// module.exports = client;

const redis = require('redis');

class RedisClient {

    private client: any;

    constructor(params: Record<string, any>) {
        this.client = redis.createClient({ ...params });
    }
    connect() {
        this.client.on('ready', () => {
            console.log('redis ready');
        });
        this.client.on('error', (err: Record<string, any>) => {
            console.error(`Error ${JSON.stringify(err)}`);
        });
        return this.client;
    }
    
    /**
     * redis setString function
     * @param key
     * @param value
     * @param expire
    */
    setString = (key: string, value: string, expire: number)=> {
        return new Promise((resolve, reject) => {
            redisClient.set(key, value,  (err: string | Record<string, any>, result: string | Record<string, any>) => {

                if (err) {
                    reject(err);
                }

                if (expire > 0) {
                    this.client.expire(key, expire);
                }
                resolve(result);
            });
        });
    };

    /**
    * redis getString function
    * @param key
    */
    getString = (key: string) => {
      return new Promise((resolve, reject) => {
        redisClient.get(key, function (err: string | Record<string, any>, result: string | Record<string, any>) {
              if (err) {
                  reject(err);
              }
              resolve(result);
          });
      });
    };


    /**
    * redis removeString function
    * @param key
    */
    removeString = (key: string) => {
      return new Promise((resolve, reject) => {
        redisClient.get(key,  (err: string | Record<string, any>, result: string | Record<string, any>) => {
              if (err) {
                  reject(err);
              }
              this.client.expire(key, -1);
              resolve(result);
          });
      });
    };
}

module.exports = RedisClient;
