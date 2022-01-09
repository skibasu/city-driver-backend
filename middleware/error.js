const ErrorResponse = require("../utils/errorResponse")

const errorHandler = (err, req, res, next) => {
    let error = { ...err }

    // Log to console for dev
    console.log(err.stack)

    // Bad object id
    if (err.name === "CastError") {
        const message = `Nc nie znaleziono z id : ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    // Validation error
    if (err.name == "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message)
        error = new ErrorResponse(message, 400)
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error",
    })
}
module.exports = errorHandler
