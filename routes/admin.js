const express = require("express")
const { protect, authorize } = require("../middleware/auth")
const { getAdminDeliveries } = require("../controllers/admin")

const router = express.Router()

router.route("/deliveries").get(protect, authorize("admin"), getAdminDeliveries)

module.exports = router
