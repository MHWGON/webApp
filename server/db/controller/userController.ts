import { Request, Response, NextFunction } from 'express';
import { IUserAuthInfoRequest } from '@/services/comInterface';
const User = require('../model/userModel.ts');
const CONST = require('../../const/index');
const jwt = require('jsonwebtoken');

// TODO 用户注册
const userRegister = (req: Request, res: Response) => {
  // 获取数据
	const { username, password } = req.body;
	if(!username || !password) {
		res.status(420).send({code: 1, mes: '参数错误'});
	} else {
		// 先查看数据库中是否已有用户
		User.find({username})
		.then((data: string | any[]) => {
			if(data.length === 0) {
				// 用户名不存在需要注册
				return User.insertMany({ username, password });
			} else {
				throw new Error('该用户名已经存在');
			}
		}).then(() => {
			res.send({code: 0, mes: '注册成功'});
		}).catch((error: any) => {
			res.send({code:-1, mes: error instanceof Object ? JSON.stringify(error) : error});
		});
	}
};

// TODO 用户登录
const userLogin = (req: IUserAuthInfoRequest, res: Response) => {
	const { username, password } = req.body;
	// console.log('username--password', username, password);
	if(!username || !password) {
		res.status(420).send({code:1, mes:'参数错误'});
	} else {
		User.findOne({username})
		.then((data: Record<string, any>) => {
			if (data?._id) {
				const isPassWordValid = require('bcryptjs').compareSync(password, data.password);
				if (isPassWordValid) {
					const token = jwt.sign({ id: String(data._id), }, CONST.secretKey, {expiresIn: 60 * 60});
					req.session.userInfo = {
						id: String(data._id),
						username,
						auth: true
					};
					// console.log('服务端生成的Session对象：', req.session);
					// console.log('当前唯一的会话ID，藏在cookie中的value：', `${req.sessionID}`)
					return res.send({ code: 0, mes: '登录成功', token });
				} else {
					throw new Error('用户密码错误');
				}
			} else {
				throw new Error('该用户不存在');
			}
		})
		.catch((error: Error) => {
			return res.send({code: -1, mes: error.toString() });
		});
	}
};

// TODO 退出登录
const userLogout = (req: IUserAuthInfoRequest, res: Response, next: NextFunction) => {
	req.session.destory();  // 清除服务器session
	res.clearCookie('SESSIONID');
	res.clearCookie('accessToken');
	console.log(`用户退出登录后，当前服务器的session信息为：${req.session}`);
	res.redirect('/');
};

// TODO 用户登录态校验
const authValidate = (req: IUserAuthInfoRequest, res: any) => {
	// console.log('校验', req.session);
	try {
		if (req?.session?.userInfo?.auth) {
			return res.send({ code: 0, mes: '登录态校验成功' });
		} else {
			return res.send({ code: -1, mes: '登录态校验失败' });
		}
	} catch (error) {
			return res.send({ code: -1, mes: error });
		}
};

// TODO 查询用户信息
const userProfile = (req: IUserAuthInfoRequest, res: Response, next: NextFunction) => {
	try {
		// req.headers.authorization
		jwt.verify(req.headers.accesstoken, CONST.secretKey, (err: any, decode: any) => {
			if (!err) {
				User.findById(decode.id, (err: any, result: any) => {
					if (!err) {
						res.send({
							code: 0,
							data: {
								username: result.username,
								age: result.age,
								sex: result.sex
							}
						});
					} else {
						throw new Error('用户数据查询失败');
					}
				});
			} else {
				throw new Error('JWT校验失败');
			}
		});
	} catch (error: any) {
		if (error.message === 'JWT校验失败') {
			return res.send({ code: 1001, mes: 'token已过期' });
		}
		return res.send({ code: -1, mes: `server error: ${error.toString()}` });
	}
};

// TODO 刷新accessToken
const userRefreshToken = (req: IUserAuthInfoRequest, res: Response) => {
	const id = req?.session.userInfo.id;
	if (id) {
		const token = jwt.sign({ id }, CONST.secretKey, { expiresIn: 60 * 60 });
		// res.cookie("accessToken", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
		return res.send({ code: 0, mes: token });
	}
	return res.send({ code: -1, mes: '刷新accessToken失败' });
};

// TODO 用户信息更新(findOneAndUpdate) username -> rename
const userProfileUpdate = (req: IUserAuthInfoRequest, res: Response, next: NextFunction) => {
	const { username } = req.body;
	User.findOneAndUpdate({username}, {username: 'rename'}, null, (err: Error, docs: Record<any, any> | string) => {
		if (err) {
			res.send({code: -1, mes: err});
		} else {
			res.send({code: 0, mes: 'success'});
		}
	});
};

// TODO 用户信息更新(ById)
const userProfileUpdateById = (req: IUserAuthInfoRequest, res: Response, next: NextFunction) => {
	const { id } = req.body;
	User.findByIdAndUpdate({_id: id}, {name: 'renameById'}, null, (err: Error, docs: any) => {
		if (err) {
			res.send({code: -1, mes: err});
		} else {
			console.log(docs, res);
			res.send({code: 0, mes: 'success'});
		}
	});
};

// TODO 用户信息(findAndModify) query sort update upsert 可以使用上面的更新方法代替
const userProfileFindAndUpdate = (req: IUserAuthInfoRequest, res: Response, next: NextFunction) => {
	const { id } = req.body;
	// console.log('------', id, User);
	// other $addToSet $inc
	User.findAndModify({_id: id},[['_id', 'asc']],{$set: {'name': 'renameagain'}},null,(err: Error, docs: any) => {
		if (err) {
			console.log(err.message);
		} else {
			res.send(docs);
		}
	});
};

module.exports = {
	userRegister,
	userLogin,
	userProfile,
	authValidate,
	userRefreshToken,
	userProfileUpdateById,
	userProfileUpdate,
	userProfileFindAndUpdate,
};
