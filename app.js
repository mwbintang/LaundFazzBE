const express = require("express")
const http = require("http")
const app = require("express")()
const cors = require("cors")
const { Server } = require("socket.io")
const PORT = 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const server = http.createServer(app)

// const io = require("socket.io")(httpServer, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
//     preflightContinue: false,
//     optionsSuccessStatus: 204
//   }
// });

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", //ubahjadi localhost utk react
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204
  }
})

let arrChat = []
io.on("connection", (socket) => {
  console.log("User Connected :", socket.id)
  socket.on("join_room", (data) => {
    socket.join(data)
    console.log(`User IDL ${socket.id} joined room ${data}`)
  })

  socket.on("disconnect", () => {
    arrChat = []
    console.log("User Disconnected")
  })
  socket.on("chatFromClient", (payload) => {
    // console.log(req.Credentials)
    console.log(payload, "<<<<<Test payload")
    arrChat
    arrChat.push(payload)
    console.log(arrChat)
    io.to(payload.room).emit("messageFromServer", arrChat)
  })
})

server.listen(PORT, () => {
  console.log(`server on port ${PORT}`)
})