const express = require('express');

const router = express.Router();


const {postRegister, getRegister} = require('../controllers/user')

router.route('/register').post(postRegister);

router.route('/getRegister').get(getRegister)

module.exports = router ;