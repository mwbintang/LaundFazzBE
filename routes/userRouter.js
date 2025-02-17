const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const {isAuth} = require('../middleware/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/list', UserController.list)

module.exports = router;