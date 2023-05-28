const express = require('express');

const router = express.Router();

const userAuthentication = require('../middleware/auth')



const messageControllers = require('../controllers/user')

const requestControllers = require('../controllers/request')

router.post('/register', messageControllers.postRegister);

router.get('/getRegister', messageControllers.getRegister);

router.post('/login' , messageControllers.postLogin)


router.get('/login',messageControllers.login);

router.get('/dashboard', userAuthentication.authMiddleware, messageControllers.getDashboard);

router.get('/logout', userAuthentication.authMiddleware, messageControllers.logout);

router.get('/myprofile', userAuthentication.authMiddleware, messageControllers.myprofile);

router.get('/searchedUser', userAuthentication.authMiddleware, messageControllers.otherUser);

router.get('/addFriends/:uname', userAuthentication.authMiddleware, requestControllers.addFriend);

router.get('/deleteFriend/:uname', userAuthentication.authMiddleware, requestControllers.deleteFriend )






module.exports = router ;