require("dotenv").config()
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const UserController = require('./controllers/userController')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.post('/register', UserController.register)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})