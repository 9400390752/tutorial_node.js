const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function loginAuth(loginData) {
    const { username, password, email } = loginData
    if(!username || !password || !email ){
        throw new Error("fill all the details properly");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const salt2 = await bcrypt.genSalt(10)
    const hashedEmail = await bcrypt.hash(email, salt2)
    console.log(hashedPassword)
    console.log(hashedEmail) 
    const user = username;
    const accessToken = jwt.sign(
        {user},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : '30s'}
        )
    const refreshToken = jwt.sign(
        {user},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn : '1d'}
        )
    return {accessToken : accessToken, refreshToken : refreshToken }
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