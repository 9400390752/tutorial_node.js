const express = require('express');
const userController = require('../controllers/user.controllers')
const userRouter = express.Router();
const middleware = require('../middlewares/auth/auth.middleware');

userRouter.get('/',middleware.isAuthenticated, userController.getUser ); 
userRouter.post('/', userController.postUser);
userRouter.put('/', userController.putUser);
userRouter.delete('/', userController.deleteUser);

module.exports = userRouter;