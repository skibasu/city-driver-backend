const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Delivery = require("../models/deliveries")
const WorkDays = require("../models/workdays")

exports.getTestDeliveries = asyncHandler(async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.status(200).json({
        success: true,
    })
})
// @desc Get all deliveries
// @route GET /api/v1/deliveries
// @access Private
exports.getDeliveries = asyncHandler(async (req, res, next) => {
    let delivery
    let sum

    // Get user id
    const {
        user: { id: userId },
    } = req

    // Get active workDay
    if (!req.activeWorkDay?.id) {
        return next(
            new ErrorResponse(
                `Cant get delivery if work day doesn't exist`,
                400
            )
        )
    }
    delivery = await Delivery.find({
        user: userId,
        workDay: req.activeWorkDay.id,
    }).sort("-createdAt")

    // Sum all prices by types for user
    sum = await Delivery.aggregate([
        { $match: { workDay: req.activeWorkDay._id, user: req.user._id } },
        {
            $group: {
                _id: "$type",
                total: { $sum: "$price" },
            },
        },
    ])

    if (!delivery) {
        return next(new ErrorResponse(`Nothing found`, 404))
    }

    res.status(200).json({
        success: true,
        count: delivery.length,
        summary: sum,
        data: delivery,
    })
})

// @desc Get specific delivery
// @route GET /api/v1/deliveries/:id
// @access Private
exports.getDelivery = asyncHandler(async (req, res, next) => {
    const delivery = await Delivery.findById(req.params.id)

    // Get user id
    const {
        user: { id: userId, role: userRole },
    } = req

    if (!delivery) {
        return next(
            new ErrorResponse(`Id doesn't exist : ${req.params.id}`, 404)
        )
    }
    // Get delivery user id
    const { user: deliveryUser } = delivery

    // Check if user is owner or admin
    if (userRole !== "admin" && userId !== deliveryUser.toString()) {
        return next(new ErrorResponse(`No access for this operation`, 403))
    }

    const workday = await WorkDays.findOne({ isFinish: false })
    if (!workday) {
        return next(new ErrorResponse(`No access for this operation`, 403))
    }
    delivery.workDay = workday._id

    res.status(200).json({
        success: true,
        data: delivery,
    })
})

// @desc Add delivery
// @route POST /api/v1/deliveries/
// @access Private
exports.postDelivery = asyncHandler(async (req, res, next) => {
    // Add user to req body
    const {
        user: { _id: user },
    } = req

    req.body.user = user

    if (!req.activeWorkDay) {
        return next(
            new ErrorResponse(
                `Cant add delivery if work day doesn't exist`,
                400
            )
        )
    }

    // Add workDay to req body
    const {
        activeWorkDay: { id: workDay },
    } = req
    req.body.workDay = workDay

    // Crete Delivery
    const delivery = await Delivery.create(req.body)
    const deliveries = await Delivery.find({
        user,
        workDay,
    }).sort("-createdAt")
    const sum = await Delivery.aggregate([
        { $match: { workDay: req.activeWorkDay._id, user: req.user._id } },
        {
            $group: {
                _id: "$type",
                total: { $sum: "$price" },
            },
        },
    ])
    // Add deliveries to workDay
    await WorkDays.findByIdAndUpdate(
        workDay,
        { $push: { deliveries: delivery.id } },
        {
            new: true,
            runValidators: true,
        }
    )

    res.status(201).json({
        success: true,
        count: deliveries.length,
        summary: sum,
        data: deliveries,
    })
})

// @desc update delivery
// @route PUT /api/v1/deliveries/:id
// @access Private
exports.putDelivery = asyncHandler(async (req, res, next) => {
    let delivery = await Delivery.findById(req.params.id)
    // Get user id
    const {
        user: { id: userId, role: userRole },
    } = req
    const {
        activeWorkDay: { id: workDay },
    } = req

    if (!delivery) {
        return next(
            new ErrorResponse(`Id doesn't exist: ${req.params.id}`, 404)
        )
    }

    // Get delivery user id
    const { user: deliveryUser } = delivery

    // Check if user is owner or admin
    if (userRole !== "admin" && userId !== deliveryUser.toString()) {
        return next(new ErrorResponse(`No access for this operation`, 403))
    }

    // Update delivery
    delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    const deliveries = await Delivery.find({
        user: userId,
        workDay,
    }).sort("-createdAt")
    const sum = await Delivery.aggregate([
        { $match: { workDay: req.activeWorkDay._id, user: req.user._id } },
        {
            $group: {
                _id: "$type",
                total: { $sum: "$price" },
            },
        },
    ])
    res.status(200).json({
        success: true,
        count: deliveries.length,
        message: `Updated`,
        data: deliveries,
        summary: sum,
    })
})

// @desc delete delivery
// @route DELETE /api/v1/deliveries/:id
// @access Private
exports.deleteDelivery = asyncHandler(async (req, res, next) => {
    const delivery = await Delivery.findById(req.params.id)
    const {
        user: { id: userId, role: userRole },
    } = req
    if (!delivery) {
        return next(
            new ErrorResponse(`Nic nie znaleziono z id : ${req.params.id}`, 404)
        )
    }
    // Get delivery user id
    const { user: deliveryUser } = delivery

    // Check if user is owner or admin
    if (userRole !== "admin" && userId !== deliveryUser.toString()) {
        return next(new ErrorResponse(`No access for this operation`, 403))
    }
    delivery.remove()

    res.status(200).json({
        success: true,
        message: `Usuni??to - id : ${req.params.id}`,
        data: delivery,
    })
})
