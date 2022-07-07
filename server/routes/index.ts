import { Request, Response, NextFunction } from 'express';
var express = require('express');
var router = express.Router();
const userController = require('../db/controller/userController');

router.use('/userRegister', userController.userRegister);

router.use('/userLogin', userController.userLogin);

router.use('/userValidate', userController.authValidate);

router.use('/userProfile', userController.userProfile);

router.use('/userRefreshToken', userController.userRefreshToken);

router.use('/userProfileUpdate', userController.userProfileUpdate);

router.use('/userProfileUpdateById', userController.userProfileUpdateById);

router.use('/userProfileFindAndUpdate', userController.userProfileFindAndUpdate);

// TODO GET home page.
router.get('/home', (req: Request, res: Response) => {
  res.render('home', {
    layout: false,
    showTitle: true,
    // Override `foo` helper only for this rendering.
    helpers: {
      foo() { return 'New Foo Value'; }
    }
  });
});

// TODO GET about page.
router.get('/about', (req: Request, res: Response) => {
  res.render('about', {
    layout: false,  // TODO 默认情况下true，不使用时需要单独说明(layouts), 通过设置不同的值引用layouts下面的不同文件
    showTitle: true
  });
});

// TODO Express start
router.use('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('Express start');
});

module.exports = router;
