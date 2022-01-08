const mongoose = require("mongoose")

const deliverieSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["cash", "online", "card", "free"],
        required: [true, "Podaj typ platności!"],
    },
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
    street: {
        type: String,
        maxlength: [100, "Maksymalna ilość znaków to 100"],
        required: [true, "Podaj ulicę i numer domu"],
    },
    city: {
        type: String,
        default: "Wrocław",
        maxlength: [50, "Maksymalna ilość znaków to 50"],
    },
    price: {
        type: Number,
        required: [true, "Podaj kwotę do zapłaty"],
    },
    petrol: {
        type: Number,
    },
    note: {
        type: String,
        maxlength: [350, "Maksymalna ilość znaków to 350"],
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: false,
        },
        coordinates: {
            type: [Number],
            required: false,
        },
        formattedAddress: String,
        street: String,
        city: String,
        zipcode: String,
    },
})

module.exports = mongoose.model("Delivery", deliverieSchema)
