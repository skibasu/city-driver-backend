const Delivery = require("../models/deliveries")

// @desc Get all deliveries
// @route GET /api/v1/deliveries
// @access Private
exports.getDeliveries = async (req, res, next) => {
    try {
        const delivery = await Delivery.find()
        if (!delivery) {
            return res.status(400).json({ success: false })
        }
        res.status(200).json({
            success: true,
            count: delivery.length,
            data: delivery,
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            error: error.message,
        })
    }
}

// @desc Get specific delivery
// @route GET /api/v1/deliveries/:id
// @access Private
exports.getDelivery = async (req, res, next) => {
    try {
        const delivery = await Delivery.findById(req.params.id)
        if (!delivery) {
            return res
                .status(404)
                .json({ success: false, message: "Nic nie znaleziono!" })
        }
        res.status(200).json({
            success: true,
            data: delivery,
        })
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message })
    }
}

// @desc Add delivery
// @route POST /api/v1/deliveries/
// @access Private
exports.postDelivery = async (req, res, next) => {
    try {
        const delivery = await Delivery.create(req.body)

        res.status(201).json({
            success: true,
            data: delivery,
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            error: error.message,
        })
    }
}

// @desc update delivery
// @route PUT /api/v1/deliveries/:id
// @access Private
exports.putDelivery = async (req, res, next) => {
    try {
        const delivery = await Delivery.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runvalidators: true,
            }
        )
        if (!delivery) {
            return res.status(400).json({ success: false })
        }
        res.status(200).json({
            success: true,
            data: {
                message: `Delivery updated - id : ${req.params.id}`,
                body: delivery,
            },
        })
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message })
    }
}

// @desc delete delivery
// @route DELETE /api/v1/deliveries/:id
// @access Private
exports.deleteDelivery = async (req, res, next) => {
    try {
        const delivery = await Delivery.findByIdAndDelete(req.params.id)
        if (!delivery) {
            return res.status(400).json({ success: false })
        }
        res.status(200).json({
            success: true,
            data: {
                message: `Delivery deleted - id : ${req.params.id}`,
            },
        })
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message })
    }

    res.status(200).json({
        success: true,
        data: { message: `Delivery deleted - id : ${req.params.id}` },
    })
}
