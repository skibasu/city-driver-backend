const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Delivery = require("../models/deliveries")

// @desc Get all deliveries
// @route GET /api/v1/admin-deliveries
// @access Private Admin
exports.getAdminDeliveries = asyncHandler(async (req, res, next) => {
    let delivery
    let sum

    delivery = await Delivery.find().sort("-createdAt")

    sum = await Delivery.aggregate([
        { $match: {} },
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
