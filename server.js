const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const errorHandler = require("./middleware/error")
const dotenv = require("dotenv")
var cors = require("cors")
const fileUpload = require("express-fileupload")
const connectDB = require("./config/db")

// Load env vars
dotenv.config({ path: "./config/config.env" })

// Connect to db
connectDB()

const PORT = process.env.PORT || 5000

// Route files
const deliveries = require("./routes/deliveries")
const workdays = require("./routes/workdays")
const users = require("./routes/users")
const auth = require("./routes/auth")
const admin = require("./routes/admin")

// App init
const app = express()

// Body parser
app.use(express.json())
// app.use(cors())
// Cookie parser
app.use(cookieParser())

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}
const corsOptions = {
    //To allow requests from client
    origin: ["http://localhost:3000"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
}

// File uploading
app.use(fileUpload())
//TODO
//Set static folder
app.use(express.static("/Users/su/Desktop/server/public"))
//END TODO
// Mount routers
// - deliveries
app.use(`${process.env.BASE_URL}/deliveries`, deliveries)
// - workdays
app.use(`${process.env.BASE_URL}/workdays`, cors(corsOptions), workdays)
// - users
app.use(`${process.env.BASE_URL}/users`, users)
// - auth
app.use(`${process.env.BASE_URL}/auth`, cors(corsOptions), auth)
// - admin
app.use(`${process.env.BASE_URL}/admin`, admin)

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
