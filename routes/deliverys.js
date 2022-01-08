const express = require("express")
const router = express.Router()
const { getDeliverys, getDelivery } = require("../controllers/deliverys")

router.route("/").get(getDeliverys)

router.route("/:id").get(getDelivery)

module.exports = router
