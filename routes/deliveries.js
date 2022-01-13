const express = require("express")
const router = express.Router()
const { protect, authorize } = require("../middleware/auth")

const {
    getDeliveries,
    getDelivery,
    postDelivery,
    putDelivery,
    deleteDelivery,
} = require("../controllers/deliveries")

router
    .route("/")
    .get(protect, authorize("user", "admin"), getDeliveries)
    .post(protect, authorize("user", "admin"), postDelivery)

router
    .route("/:id")
    .get(protect, authorize("user", "admin"), getDelivery)
    .put(protect, authorize("user", "admin"), putDelivery)
    .delete(protect, authorize("user", "admin"), deleteDelivery)

module.exports = router
