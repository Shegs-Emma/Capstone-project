const express       = require('express'),
      router        = express.Router(),
      userCtrl      = require('../controllers/user');

//Create employee account
router.post('/signup', userCtrl.signUp);

//To sign in
router.post('/login', userCtrl.logIn);


module.exports = router;