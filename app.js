
require('dotenv').config({
    path: './config/.env'
})
const connectDB = require('./config/db')
const express = require('express')
const app = express()
// console.log(process.env.DB)
// Connect to database
connectDB();

//Parsing incoming string body data into json format
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//mounting routes
app.use('/users', require('./routes/users'))
app.use('/todos', require('./routes/todos'))

const PORT = process.env.PORT
app.listen(PORT, console.log(`server is up ✈ and running 🚀 on port ${PORT}`))