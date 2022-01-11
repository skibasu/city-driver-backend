const express = require("express")
const morgan = require("morgan")
const errorHandler = require("./middleware/error")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

// Load env vars
dotenv.config({ path: "./config/config.env" })

// Connect to db
connectDB()

const PORT = process.env.PORT || 6000

// Route files
const deliveries = require("./routes/deliveries")
const workdays = require("./routes/workdays")
const users = require("./routes/users")

// App init
const app = express()

// Body parser
app.use(express.json())

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// Mount routers
// - deliveries
app.use(`${process.env.BASE_URL}/deliveries`, deliveries)
// - workdays
app.use(`${process.env.BASE_URL}/workdays`, workdays)
// - users
app.use(`${process.env.BASE_URL}/users`, users)

app.use(errorHandler)

const server = app.listen(
    PORT,
    console.log(
        `server is runing in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
)

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error ${err.message}`)
    //Close server and exit procees
    server.close(() => process.exit(1))
})
