const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const WorkDays = require("../models/workdays")

// @desc Get all workDays bu user
// @route GET /api/v1/workdays
// @access Private
exports.getWorkDays = asyncHandler(async (req, res, next) => {
    const workDays = await WorkDays.find().sort("-createdAt")
    if (!workDays) {
        return next(new ErrorResponse(`Nic nie znaleziono`, 404))
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
    const workDay = await WorkDays.findById(req.params.id)
    if (!workDay) {
        return next(new ErrorResponse(`Nic nie znaleziono`, 404))
    }
    res.status(200).json({
        success: true,
        data: workDay,
    })
})

// @desc Add workday
// @route POST /api/v1/workdays/
// @access Private
exports.postWorkDays = asyncHandler(async (req, res, next) => {
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
    const workDay = await WorkDays.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runvalidators: true,
    })
    if (!workDay) {
        return next(
            new ErrorResponse(`Nic nie znaleziono z id : ${req.params.id}`, 404)
        )
    }
    res.status(200).json({
        success: true,
        data: {
            message: `Zaktualizowano - id : ${req.params.id}`,
            body: workDay,
        },
    })
})
