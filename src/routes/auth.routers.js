const express = require('express');
const authController = require('../controllers/auth.controllers')
const authRouter = express.Router();
const middleware = require("../middlewares/auth/auth.middleware")

//authRouter.get('/logout', authController.User);
authRouter.get('/logout',middleware.isAuthenticated,authController.logOut);
authRouter.post('/login',authController.logIn);


module.exports = authRouter;