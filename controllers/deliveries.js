const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Delivery = require("../models/deliveries")
const WorkDays = require("../models/workdays")

// @desc Get all deliveries
// @route GET /api/v1/deliveries
// @access Private
exports.getDeliveries = asyncHandler(async (req, res, next) => {
    // Get user id
    const {
        user: { id: userId, role: userRole },
    } = req

    let delivery

    // Get all user deliverys or all delivwrys if user is admin
    if (userRole === "admin") {
        delivery = await Delivery.find().sort("-createdAt")
    } else {
        delivery = await Delivery.find({ user: userId }).sort("-createdAt")
    }

    if (!delivery) {
        return next(new ErrorResponse(`Nothing found`, 404))
    }

    res.status(200).json({
        success: true,
        count: delivery.length,
        data: delivery,
    })
})

// @desc Get specific delivery
// @route GET /api/v1/deliveries/:id
// @access Private
exports.getDelivery = asyncHandler(async (req, res, next) => {
    const delivery = await Delivery.findById(req.params.id)
    const { _id: workdayId } = await WorkDays.findOne({ isFinish: false })
    delivery.workDay = workdayId

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

    const workDay = await WorkDays.findOne({ isFinish: false })
    if (!workDay) {
        return next(new ErrorResponse(`Workday doesnt exist`, 404))
    }

    req.body.workDay = workDay._id

    const delivery = await Delivery.create(req.body)

    res.status(201).json({
        success: true,
        data: delivery,
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

    res.status(200).json({
        success: true,
        data: {
            message: `Updated - id : ${req.params.id}`,
            body: delivery,
        },
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
        data: {
            message: `Usunięto - id : ${req.params.id}`,
        },
    })
})
