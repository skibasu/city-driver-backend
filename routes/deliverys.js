const express = require("express")
const router = express.Router()
const {
    getDeliverys,
    getDelivery,
    postDelivery,
    putDelivery,
    deleteDelivery,
} = require("../controllers/deliverys")

router.route("/").get(getDeliverys).post(postDelivery)

router.route("/:id").get(getDelivery).put(putDelivery).delete(deleteDelivery)

module.exports = router
