const express = require("express")
const router = express.Router()
const { protect, authorize } = require("../middleware/auth")

const {
    getWorkDays,
    getWorkDay,
    postWorkDay,
    putWorkDay,
} = require("../controllers/workdays")

router
    .route("/")
    .get(protect, authorize("user", "admin"), getWorkDays)
    .post(protect, authorize("user"), postWorkDay)

router
    .route("/:id")
    .get(protect, authorize("user", "admin"), getWorkDay)
    .put(protect, authorize("user"), putWorkDay)

module.exports = router
