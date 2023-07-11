const authServices = require('../services/auth.services');
const httpErrors = require('http-errors');

async function logIn(req, res, next) {
    try {
        const { body = {} } = req;
        console.log(body);
        const loginAuthData = {
            username : body.username,
            password : body.password,
            email : body.email
        }
        const data = await authServices.loginAuth(loginAuthData)
        const userName =  data.username
        const accessToken = data.accessToken
        const refreshToken = data.refreshToken
        res.cookie('jwt', refreshToken, {httpOnly : true, maxAge : 24*60*60*1000});
        return res.json({accessToken, refreshToken});
    } catch (err) {
        const loginError = httpErrors(401,'login failed');
        next(loginError);
    }
}

async function logOut(req, res, next) {
    try{
        const logoutData = authServices.deleteUser()
        console.log("User deleted Succcessfully")
        return res.json(logoutData)
    }catch(Error){
        next(Error)
    }
}

module.exports = {
    logIn,logOut
}