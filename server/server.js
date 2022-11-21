const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
let boardPositions = require('./boardpositions.json')
const roomVariablesMap = new Map();
const path = require('path')


app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{
    // console.log(`User Connected: ${socket.id}`)

    ///Whenever room changes on clientside
    socket.on("join_room", (room) =>{
        socket.join(room)
        let whiteMoveBoolean = true
        let roomBoardPositions = boardPositions

        roomVariablesMap.set(room, {roomBoardPositions: roomBoardPositions, whiteMoveBoolean: whiteMoveBoolean})
        io.in(room).emit("start_client_board", {roomBoardPositions: roomBoardPositions, whiteMoveBoolean: whiteMoveBoolean});
    })

    socket.on("piece_moved", (data)=>{
        let tempBoardData = roomVariablesMap.get(data.room)
        
        tempBoardData.roomBoardPositions = data.boardPosition
        tempBoardData.whiteMoveBoolean = !tempBoardData.whiteMoveBoolean

        roomVariablesMap.set(data.room, tempBoardData)

        io.in(data.room).emit("update_client_board", tempBoardData);
    })
})

//process.env.NODE_ENV
if ("production" === "production"){
    console.log(path.join(__dirname, "../", "./client/build"))
    app.use(express.static(path.join(__dirname, "../", "./client/build")));
    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, "../", "./client/build", "index.html"));
    });
}



server.listen(3000, () =>{
    console.log("Server is running")
})


//{
    //   "name": "node-express-server-rest-api",
    //   "version": "1.0.0",
    //   "description": "",
    //   "main": "index.js",
    //   "scripts": {
    //     "start": "nodemon server.js",
    //     "test": "echo \"No test specified\" && exit 0"
    //   },
    //   "keywords": [],
    //   "author": "",
    //   "license": "ISC",
    //   "devDependencies": {
    //     "@babel/core": "^7.2.2",
    //     "@babel/node": "^7.2.2",
    //     "@babel/preset-env": "^7.2.3",
    //     "nodemon": "^1.18.9"
    //   },
    //   "dependencies": {
    //     "body-parser": "1.20.1",
    //     "cors": "^2.8.5",
    //     "dotenv": "^6.2.0",
    //     "express": "^4.16.4",
    //     "react": "18.2.0",
    //     "uuid": "^3.4.0"
    //   }
    // }