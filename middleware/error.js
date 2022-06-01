const ErrorResponse = require("../utils/errorResponse")

const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        status: err.statusCode || 500,
        error: err.message,
    })
}
module.exports = errorHandler
