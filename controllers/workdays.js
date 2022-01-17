const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const WorkDays = require("../models/workdays")

// @desc Get all workDays bu user
// @route GET /api/v1/workdays
// @access Private
exports.getWorkDays = asyncHandler(async (req, res, next) => {
    // Get user id
    const {
        user: { id: userId, role: userRole },
    } = req

    let workDays

    // Get all user workdays or all workdays if user is admin
    if (userRole === "admin") {
        workDays = await WorkDays.find()
            .sort("-createdAt")
            .populate({ path: "deliveries", select: "-user -workDay" })
            .populate("user")
    } else if (userRole === "user") {
        // Get only specific user workdays
        workDays = await WorkDays.find({ user: userId })
            .sort("-createdAt")
            .select("-user")
            .populate({ path: "deliveries", select: "-user -workDay" })
    }

    if (!workDays) {
        return next(new ErrorResponse(`Nothing found`, 404))
    }

    res.status(200).json({
        success: true,
        count: workDays.length,
        data: workDays,
    })
})
// @desc Get single workDay bu user
// @route GET /api/v1/workdays/:id
// @access Private
exports.getWorkDay = asyncHandler(async (req, res, next) => {
    // Get user id and role
    const {
        user: { id: userId, role: userRole },
    } = req

    const workDay = await WorkDays.findById(req.params.id).populate({
        path: "deliveries",
        select: "-user -workDay",
    })

    if (!workDay) {
        return next(new ErrorResponse(`Nic nie znaleziono`, 404))
    }
    // Get worDay user id
    const { user: workDayUser } = workDay

    // Check if user is owner or admin
    if (userRole !== "admin" && userId !== workDayUser.toString()) {
        return next(new ErrorResponse(`No access for this operation`, 403))
    }
    res.status(200).json({
        success: true,
        data: workDay,
    })
})

// @desc Add workday
// @route POST /api/v1/workdays/
// @access Private
exports.postWorkDay = asyncHandler(async (req, res, next) => {
    // Add user to req body
    const {
        user: { _id: user },
    } = req
    req.body.user = user

    // Check if is no active workdays
    if (req.activeWorkDay) {
        return next(
            new ErrorResponse(
                `You can have only one active work day. Finish work day with id: ${req.activeWorkDay._id}`,
                400
            )
        )
    }
    const workDays = await WorkDays.create(req.body)

    res.status(201).json({
        success: true,
        data: workDays,
    })
})

// @desc update workDay
// @route PUT /api/v1/workdays/:id
// @access Private
exports.putWorkDay = asyncHandler(async (req, res, next) => {
    // Get user id and role
    const {
        user: { id: userId, role: userRole },
    } = req
    const allNotFinishedWorkDays = await WorkDays.find({
        isFinish: false,
        user: userId,
    })

    let workDay = await WorkDays.findById(req.params.id)

    if (!workDay) {
        return next(
            new ErrorResponse(`Nic nie znaleziono z id : ${req.params.id}`, 404)
        )
    }
    // Add finshedAt, modifyAt
    if (!workDay.finishedAt) {
        req.body.finishedAt = new Date()
    } else if (req.body.isFinish) {
        req.body.modifyAt = [new Date(), ...workDay.modifyAt]
    }

    // Get worDay user id
    const { user: workDayUser } = workDay

    // Check if user is owner or admin
    if (userRole !== "admin" && userId !== workDayUser.toString()) {
        return next(new ErrorResponse(`No access for this operation`, 403))
    }

    // Check if is only one active workDay for specific user
    // And
    // Check if user is not trying to set false for more than one workday
    if (
        (allNotFinishedWorkDays.length === 1 && req.body.isFinish === true) ||
        (allNotFinishedWorkDays.length === 0 && req.body.isFinish === false)
    ) {
        workDay = await WorkDays.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
    } else {
        return next(new ErrorResponse(`Opertion is not possible`, 400))
    }

    res.status(200).json({
        success: true,
        data: workDay,
    })
})
