const jwt = require('jsonwebtoken')
require('dotenv').config()

const isAuthenticated = async (req, res, next) => {
    try {
        const authheader = req.headers['authorization']
        const bearerToken = authheader.split(" ")
        const token = bearerToken[1];
        await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
               throw new Error('Invalid User'); 
            }
            req.user = decoded.user; 
            console.log(req.user)
            
            next();
        })
        
    } catch (Error) {
        next(Error)
    }
}

const refreshTokenVerify = async (req, res, next) => {
    try{
    const cookies = req.cookies
    if(!cookies?.jwt){
        return res.status(400).send("NO cookies were found");
    }
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (Error, decoded) => {
        if(Error){
            return res.status(400).send("refresh token is not valid more");
        }
        const accessToken = jwt.sign(
            {"username" : decoded.user },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : '30s'}
        )
        res.json({accessToken})
    });
    }catch(Error){
        next(Error)
   }
}
module.exports = {
    isAuthenticated,refreshTokenVerify
}