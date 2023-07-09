function errorHandler(Error, req, res, next) {
    console.log(Error) 
    res.status(Error.status || 407)
    console.log(Error.status) 
    res.send({
        error : {
            status : Error.status,
            message : Error.message
        }
    })
}

module.exports = {
    errorHandler
}