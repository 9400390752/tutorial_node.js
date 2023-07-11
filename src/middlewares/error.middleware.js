const httpErrors = require('http-errors');

function errorHandler(err, req, res, next) {
     
    res.status(err.status || 407)
    console.log(err.status) 
    res.send({
        error : {
            status : err.status,
            message : err.message
        }
    })
}

module.exports = {
    errorHandler
}