import { Request, Response, NextFunction } from 'express';
var express = require('express');
var router = express.Router();
const userController = require('../db/controller/userController');

router.use('/userRegister', userController.userRegister);

router.use('/userLogin', userController.userLogin);

router.use('/userValidate', userController.authValidate);

router.use('/userProfile', userController.userProfile);

router.use('/userRefreshToken', userController.userRefreshToken);

/* GET home page. */
router.use('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('Express start');
});

module.exports = router;
