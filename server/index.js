const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{
    console.log(`User Connected: ${socket.id}`)

    socket.on("join_room", (data) =>{
        socket.join(data)
    })

    socket.on("piece_moved", (boardPosition)=>{
        // console.log(boardPosition)
        socket.to(boardPosition.room).emit("update_client_board", boardPosition)
    })
})

server.listen(3001, () =>{
    console.log("Server is running")
})