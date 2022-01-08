const express = require("express")
const dotenv = require("dotenv")

const PORT = process.env.PORT || 6000

// Route files
const deliverys = require("./routes/deliverys")

// Load env vars
dotenv.config({ path: "./config/config.env" })

// App init
const app = express()

// Mount routers
// - deliverys
app.use(`${process.env.BASE_URL}/deliverys`, deliverys)

app.listen(
    PORT,
    console.log(
        `server is runing in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
)
