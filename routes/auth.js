const express = require("express")
const { protect } = require("../middleware/auth")
const { registerUser, loginUser, getMe } = require("../controllers/auth")

const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/me").get(protect, getMe)

module.exports = router
