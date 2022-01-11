const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Delivery = require("../models/deliveries")

// @desc Get all deliveries
// @route GET /api/v1/deliveries
// @access Private
exports.getDeliveries = asyncHandler(async (req, res, next) => {
    const delivery = await Delivery.find().sort("-createdAt")
    if (!delivery) {
        return next(new ErrorResponse(`Nic nie znaleziono`, 404))
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
    if (!delivery) {
        return next(
            new ErrorResponse(`Nc nie znaleziono z id : ${req.params.id}`, 404)
        )
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
    const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runvalidators: true,
    })
    if (!delivery) {
        return next(
            new ErrorResponse(`Nic nie znaleziono z id : ${req.params.id}`, 404)
        )
    }
    res.status(200).json({
        success: true,
        data: {
            message: `Zaktualizowano - id : ${req.params.id}`,
            body: delivery,
        },
    })
})

// @desc delete delivery
// @route DELETE /api/v1/deliveries/:id
// @access Private
exports.deleteDelivery = asyncHandler(async (req, res, next) => {
    const delivery = await Delivery.findByIdAndDelete(req.params.id)
    if (!delivery) {
        return next(
            new ErrorResponse(`Nic nie znaleziono z id : ${req.params.id}`, 404)
        )
    }
    res.status(200).json({
        success: true,
        data: {
            message: `Usunięto - id : ${req.params.id}`,
        },
    })
})
