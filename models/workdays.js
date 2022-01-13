const mongoose = require("mongoose")

const WorkDay = new mongoose.Schema({
    finishedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isFinish: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User id is required"],
    },
})

WorkDay.pre("save", async function (next) {
    next()
})

module.exports = mongoose.model("WorkDay", WorkDay)
