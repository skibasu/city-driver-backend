const express = require("express")
const router = express.Router()
const {
    getWorkDays,
    getWorkDay,
    postWorkDays,
    putWorkDay,
} = require("../controllers/workdays")

router.route("/").get(getWorkDays).post(postWorkDays)

router.route("/:id").get(getWorkDay).put(putWorkDay)

module.exports = router
