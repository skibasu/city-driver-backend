const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const User = require("../models/users")

// @desc Register user
// @route GET /api/v1/auth/register
// @access Public

exports.registerUser = asyncHandler(async (req, res, next) => {
    const { name, surname, password, email, role } = req.body

    // Create user
    const user = await User.create({
        name,
        surname,
        password,
        email,
        role,
    })

    sendTokenResponse(user, 200, res)
})

// @desc Login user
// @route POST /api/v1/auth/register
// @access Public

exports.loginUser = asyncHandler(async (req, res, next) => {
    const { password, email } = req.body

    // Validate email
    if (!email) {
        return next(new ErrorResponse("Email is required", 400))
    }
    // Validate password
    if (!password) {
        return next(new ErrorResponse("Password is required", 400))
    }
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorResponse("Email or password are incorrect", 401))
    }

    // Check if password matches

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
        return next(new ErrorResponse("Email or password are incorrect", 401))
    }

    sendTokenResponse(user, 200, res)
})

// @desc RGet current user
// @route Post /api/v1/auth/register
// @access Privet

exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        return next(new ErrorResponse("Not authorize", 401))
    }
    res.status(200).json({
        succes: true,
        data: user,
    })
})

// Get token from model, create cookie and send response

const sendTokenResponse = (user, statusCode, res) => {
    // Create Token JWT_COOKIE_EXPIRE
    // Create Token
    const token = user.getSignetJwtToken()

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }
    res.status(statusCode)
        .cookie("token", token, options)
        .json({ success: true, token })
}
