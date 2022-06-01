const path = require("path")
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const User = require("../models/users")

// @desc Get all users
// @route GET /api/v1/users
// @access Private
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find().sort("-createdAt")
    if (!users) {
        return next(new ErrorResponse(`Nothing found`, 404))
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
    const user = await User.findById(req.params.id)
    const { name, avatarUrl, email, createdAt } = user
    const data = { name, avatarUrl, email, createdAt }
    if (!user) {
        return next(new ErrorResponse(`Nothing found`, 404))
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
    const user = await User.create(req.body)
    res.status(201).json({
        success: true,
        data: user,
    })
})

// @desc update workDay
// @route PUT /api/v1/workdays/:id
// @access Private
exports.putUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    if (!user) {
        return next(
            new ErrorResponse(`Nothing found with id : ${req.params.id}`, 404)
        )
    }
    res.status(200).json({
        success: true,
        data: {
            message: `User is updated : ${req.params.id}`,
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
            new ErrorResponse(`Nothing found with id : ${req.params.id}`, 404)
        )
    }

    res.status(200).json({
        success: true,
        data: {
            message: `User is deleted`,
        },
    })
})

// @desc Upload avatar
// @route PUT /api/v1/user/:id/avatar
// @access Private
exports.putAvatar = asyncHandler(async (req, res, next) => {
    const user = await Users.findById(req.params.id)
    const file = req.files.file
    if (!user) {
        return next(new ErrorResponse(`Nothing found id`, 404))
    }

    if (!file) {
        return next(new ErrorResponse(`Add file`, 400))
    }

    // Validation for picture
    if (!file.mimetype.startsWith("image")) {
        return next(new ErrorResponse(`File should be an image`, 400))
    }

    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(
            new ErrorResponse(
                `Maximum size of the file is ${process.env.MAX_FILE_UPLOAD}`,
                400
            )
        )
    }

    //Create custom uniq file name
    const uniqName = `avatar__${user._id}${path.parse(file.name).ext}`

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${uniqName}`, async (err) => {
        if (err) {
            console.log(err)
            return next(
                new ErrorResponse(`File cant be save - server error`, 500)
            )
        } else {
            await Users.findByIdAndUpdate(req.params.id, {
                avatarUrl: `/${uniqName}`,
            })
            res.status(200).json({
                success: true,
                data: uniqName,
            })
        }
    })
})
