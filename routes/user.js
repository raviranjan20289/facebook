const express = require('express');

const router = express.Router();


const {postRegister, getRegister, postLogin, login} = require('../controllers/user')

router.route('/register').post(postRegister);

router.route('/getRegister').get(getRegister);

router.route('/login').post(postLogin);

router.route('/login').get(login);



module.exports = router ;