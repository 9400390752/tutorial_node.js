const jwt = require('jsonwebtoken')
require('dotenv').config()

const isAuthenticated = async (req, res, next) => {
    try {
        const authheader = req.headers['authorization']
        const bearerToken = authheader.split(" ")
        const token = bearerToken[1];
        await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, username) => {
            if(err){
               throw new Error('Invalid User'); 
            }
            req.username = username; 
        })
        next();
    } catch (Error) {
        next(Error)
    }
}
module.exports = {
    isAuthenticated
}