const { throws } = require("assert");
const userService = require("../services/user.services");
const utils = require("../utils/http.utils");
const path = require('path');
function getUser(req, res, next) {
    try {
        const response = userService.getUser()
        return res.status(200).send(response);

    } catch (error) {
        console.log("[ERROR]: Failed to execute getUser !!")
        next(error)
    }
}
function postUser(req, res, next) {
    try {
        const userDataPayload = {
            username : req.body.username,
            pwd: req.body.pwd,
            email: req.body.email
        }
        const data = userService.createUser(userDataPayload);
        res.set("X-Powered-By", "sanjai");
        res.cookie('sanju', 'samson');
        return res.status(200).send(data);
    } catch (Error) {
        console.log(Error.status)
        next(Error)
    }
}
function putUser(req, res, next) {
    try {
        const userDataPayload = {
            username : req.body.username,
            pwd: req.body.pwd,
            email: req.body.email
        }
        const data = userService.updateUser(userDataPayload);
        res.send(utils.prepareResponse({success: true, data}));
    } catch (error) {
        console.log("[ERROR]: Failed to execute putUser !!");
        next(error)
    }
}
function deleteUser(req, res, next) {
    try {
        const userDataPayload = {
            username : req.body.username,
            pwd: req.body.pwd,
            email: req.body.email
        }
        const data = userService.deleteUser(userDataPayload)
        res.send(utils.prepareResponse({success: true, data}));
    } catch (error) {
        console.log("[ERROR]: Failed to execute deleteUser !!");
        next(error)
    }
}

module.exports = {
    getUser, postUser, putUser, deleteUser
}