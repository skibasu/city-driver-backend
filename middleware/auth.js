const jwt = require("jsonwebtoken")
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Users = require("../models/users")
const WorkDays = require("../models/workdays")

// Protected routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1]
    }
    //  else if (req.cookies.token) {
    //      token = req.cookies.token
    //  }

    // Make sure token exist
    if (!token) {
        return next(
            new ErrorResponse("Not authorize to access this route !", 401)
        )
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await Users.findById(decoded.id)
        req.activeWorkDay = await WorkDays.findOne({
            isFinish: false,
            user: decoded.id,
        })

        next()
    } catch (err) {
        return next(
            new ErrorResponse("Not authorize to access this route !!", 401)
        )
    }
})

// Authorized by role routes
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `${user.role} is not authorize to access this route !!!`,
                    403
                )
            )
        }
        next()
    }
}
