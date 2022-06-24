const mongoose = require("mongoose")
const uri =
    "mongodb+srv://skibasu:Klementyna5@cluster0.r8wot.mongodb.net/city-driver?retryWrites=true&w=majority"
const connectDB = async () => {
    const con = await mongoose.connect(uri)
    // Specify database you want to access

    console.log(`MngoDb connected: ${con.connection.host}`)
}

module.exports = connectDB
