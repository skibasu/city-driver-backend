// @desc Get all deliverys
// @route GET /api/v1/deliverys
// @access Private
exports.getDeliverys = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: [{ adress: "sample 1" }, { adress: "sample 2" }],
    })
}

// @desc Get specific delivery
// @route GET /api/v1/deliverys/:id
// @access Private
exports.getDelivery = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: { adress: `sample ${req.params.id}` },
    })
}

// @desc Add delivery
// @route POST /api/v1/deliverys/
// @access Private
exports.postDelivery = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: { message: "Delivery addded" },
    })
}

// @desc update delivery
// @route PUT /api/v1/deliverys/:id
// @access Private
exports.putDelivery = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: { message: `Delivery updated - id : ${req.params.id}` },
    })
}

// @desc delete delivery
// @route DELETE /api/v1/deliverys/:id
// @access Private
exports.deleteDelivery = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: { message: `Delivery deleted - id : ${req.params.id}` },
    })
}
