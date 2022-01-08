const mongoose = require("mongoose")

const connectDB = async () => {
    const con = await mongoose.connect(process.env.MONGO_URI)
    // Specify database you want to access

    console.log(`MngoDb connected: ${con.connection.host}`)
}

module.exports = connectDB
