const jwt = require('jsonwebtoken')
require('dotenv').config()
const httpErrors = require('http-errors');

const isAuthenticated = async (req, res, next) => {
    try {
        const authheader = req.headers['authorization']
        const bearerToken = authheader.split(" ")
        const token = bearerToken[1];
        const authResp = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next()
    } catch (err) {
        const authError = httpErrors(401,'user authentication failed');
        next(authError)
    }
}

const refreshTokenVerify = async (req, res, next) => {
    try{
    const cookies = req.cookies
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    const refreshTokenError = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    console.log(refreshTokenError)
    const accessToken = jwt.sign(
        {refreshTokenError},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : '30s'}
        )
    res.json({accessToken})
    }catch(err){
        console.log(err)
        const refreshError = httpErrors(401,'refresh token is expired');
        next(refreshError)
   }
}
module.exports = {
    isAuthenticated,refreshTokenVerify
}