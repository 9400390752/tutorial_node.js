function prepareResponse(params) {
    return {
        success: params.success,
        data: params.data
    }
}

module.exports = {
    prepareResponse
}