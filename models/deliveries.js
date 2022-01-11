const mongoose = require("mongoose")
const getLatLang = require("../utils/getLatLang")
const addressFormatter = require("../utils/addressFormatter")

const DeliverySchema = new mongoose.Schema({
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
    },
    roomNumber: {
        type: Number,
        maxlength: [15, "Maksymalna ilość znaków to 15"],
    },
    city: {
        type: String,
        default: "Wrocław",
        required: [true, "Podaj miejscowość"],
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
        latitude: Number,
        longitude: Number,
        street: String,
        roomNumber: Number,
        city: String,
        zipcode: String,
        formattedAddress: String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
})

DeliverySchema.pre("save", async function (next) {
    const res = await getLatLang(`${this.street}, ${this.city}`)
    const { latitude, longitude, zipcode, city, streetName } = res[0]

    this.location = {
        latitude,
        longitude,
        zipcode,
        city,
        streetName,
        roomNumber: this.roomNumber,
        formattedAddress: addressFormatter(streetName, city, zipcode),
    }
    next()
})

module.exports = mongoose.model("Delivery", DeliverySchema)
