const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/auth")

const {
    getWorkDays,
    getWorkDay,
    postWorkDays,
    putWorkDay,
} = require("../controllers/workdays")

router.route("/").get(protect, getWorkDays).post(protect, postWorkDays)

router.route("/:id").get(protect, getWorkDay).put(protect, putWorkDay)

module.exports = router
