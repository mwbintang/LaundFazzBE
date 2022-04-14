require("dotenv").config()
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const UserRouter = require('./routes/userRouter')
const errorHandler = require('./middleware/errorHandler')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/users', UserRouter)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})