var mongoose =require('mongoose');
var Schema = mongoose.Schema;
 
// 创建一个和表关联的schema对象集合（类似于MySQL中的表头）
var userSchema = new Schema({
  username: {type: String, require: true, unique: true},
  password: {
    type: String, require: true,
    set(value: string) { 
      return require('bcryptjs').hashSync(value, 10)
    }
  },
  age: {type: Number, default: 18},
  sex: {type: Number, default: 0}
});
   
//将scheme对象转换为数据模型
var User = mongoose.model('users', userSchema); //该数据对象和集合关联{'集合名'，scheme对象}

// 将用户的集合删除掉
// User.db.dropCollection('users')

module.exports = User;