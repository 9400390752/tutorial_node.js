const authServices = require('../services/auth.services');


async function logIn(req, res, next) {
    try {
        const { body = {} } = req;
        const loginAuthData = {
            username : body.username,
            password : body.password,
            email : body.email
        }
        const data = await authServices.loginAuth(loginAuthData)
        const userName =  data.username
        const accessToken = data.accessToken
        return res.json({userName, accessToken});
    } catch (error) {
        next(error);
    }
}

async function logOut(req, res, next) {
    try{
        const logoutData = authServices.deleteUser()
        console.log("ok controller")
        return res.json({logoutData})
    }catch(Error){
        next(Error)
    }
}

module.exports = {
    logIn,logOut
}