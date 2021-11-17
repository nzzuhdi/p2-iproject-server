const authRoute = require('express').Router()
const authController = require('../controller/authController')

authRoute.post('/google-signin', authController.googleLogin)
authRoute.post('/login', authController.login)
authRoute.post('/register', authController.register)




module.exports = authRoute