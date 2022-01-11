const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Users = require("../models/users")

// @desc Get all users
// @route GET /api/v1/users
// @access Private
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await Users.find().sort("-createdAt")
    if (!users) {
        return next(new ErrorResponse(`Nic nie znaleziono`, 404))
    }
    //  const {name, avatarUrl, email, createdAt} = users
    //  const data = { name, avatarUrl, email, createdAt }

    res.status(200).json({
        success: true,
        count: users.length,
        data: users,
    })
})
// @desc Get single user by Id
// @route GET /api/v1/users/:id
// @access Private
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await Users.findById(req.params.id)
    const { name, avatarUrl, email, createdAt } = user
    const data = { name, avatarUrl, email, createdAt }
    if (!user) {
        return next(new ErrorResponse(`Nic nie znaleziono`, 404))
    }
    res.status(200).json({
        success: true,
        data,
    })
})

// @desc Add workday
// @route POST /api/v1/workdays/
// @access Private
exports.postUser = asyncHandler(async (req, res, next) => {
    const user = await Users.create(req.body)
    res.status(201).json({
        success: true,
        data: user,
    })
})

// @desc update workDay
// @route PUT /api/v1/workdays/:id
// @access Private
exports.putUser = asyncHandler(async (req, res, next) => {
    const user = await WorkDays.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runvalidators: true,
    })
    if (!user) {
        return next(
            new ErrorResponse(`Nic nie znaleziono z id : ${req.params.id}`, 404)
        )
    }
    res.status(200).json({
        success: true,
        data: {
            message: `Zaktualizowano - id : ${req.params.id}`,
            body: user,
        },
    })
})

// @desc delete user
// @route DELETE /api/v1/users/:id
// @access Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await Users.findByIdAndDelete(req.params.id)
    if (!user) {
        return next(
            new ErrorResponse(`Nic nie znaleziono z id : ${req.params.id}`, 404)
        )
    }
    res.status(200).json({
        success: true,
        data: {
            message: `Usunięto uzytkownika - id : ${req.params.id}`,
        },
    })
})
