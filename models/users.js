const mongoose = require("mongoose")

const User = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: [true, "Nazwa uzytkoqnika jest wymagana"],
    },
    password: {
        type: String,
        required: [true, "Hasło uzytkoqnika jest wymagane"],
    },
    email: {
        type: String,
        required: [true, "Email uzytkoqnika jest wymagany"],
    },
    avatarUrl: {
        type: String,
    },
})

module.exports = mongoose.model("User", User)

User.pre("save", async function (next) {
    next()
})
