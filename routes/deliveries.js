const express = require("express")
const router = express.Router()
const {
    getDeliveries,
    getDelivery,
    postDelivery,
    putDelivery,
    deleteDelivery,
} = require("../controllers/deliveries")

router.route("/").get(getDeliveries).post(postDelivery)

router.route("/:id").get(getDelivery).put(putDelivery).delete(deleteDelivery)

module.exports = router
