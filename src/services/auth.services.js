const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userServices = require('../services/user.services');

async function loginAuth(loginData) {
    try {
    const { username, password, email } = loginData
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const salt2 = await bcrypt.genSalt(10)
    const hashedEmail = await bcrypt.hash(email, salt2)
    console.log(hashedPassword)
    console.log(hashedEmail) 
    const user = username;
    const isAuthenticated = await bcrypt.compare(userServices.getUser().user.password, hashedPassword)
    console.log(isAuthenticated);
    if(isAuthenticated){
        const accessToken = jwt.sign(
            {user},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : '30s'}
            )
        const refreshToken = jwt.sign(
            {user},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn : '3m'}
            )
        return {accessToken : accessToken, refreshToken : refreshToken }
    }else{
        throw new Error("password incorrect");
    }
    } catch (err) {
        console.log(err)
    }
}
function deleteUser(){
    const posts = {
        username : "rijin",
        password : "rijin123",
        email : "rijin@gmail"
    }
    return {posts}
}

module.exports = {
    loginAuth,deleteUser
}