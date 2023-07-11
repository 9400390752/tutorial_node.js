const jwt = require('jsonwebtoken')
require('dotenv').config()

function createUser(newUserData) {
    const { username, pwd, email } = newUserData;
    if(!username || !pwd || !email ){
        throw new Error('fill all the details properly');
    }
    console.log('created successfully');
    const user = username;
    const accessToken = jwt.sign(
        {user},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : '180s'}
        )
    return{ accessToken : accessToken, username, pwd, email }
}

function updateUser(updatedData){
    const { username, pwd, email } = updatedData;
    console.log('updated successfully');
    return {username, pwd, email};
}
function deleteUser(deletedData){
    const { username, pwd, email } = deletedData;
    console.log('deleted successfully');
    return {username, pwd, email};
}

/*const hOfGen = (name) => {
    return () => {
        return "Hello "+name
    }
}*/

function getUser(){
    const user = {
        username : "sanjai",
        password : "sanjai123",
        email : "sanjai@gmail"
    }
    return {user}
}


module.exports = {
    createUser,updateUser,deleteUser,getUser
}