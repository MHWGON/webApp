var express = require('express');
var router = express.Router();
const userController = require('../db/controller/userController');

router.use('/userRegister', userController.userRegister);

router.use('/userLogin', userController.userLogin);

router.use('/userValidate', userController.authValidate);

router.use('/userProfile', userController.userProfile);

router.use('/userRefreshToken', userController.userRefreshToken);

/* GET home page. */
router.use('/', function (req: any, res: { send: (arg0: string) => void; }, next: any) {
  res.send('Express start');
});

module.exports = router;