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
