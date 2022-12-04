const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
let boardPositions = require('./boardpositions.json')
const path = require('path')
///if running both serpeately, then this should be 3001

app.use(cors())

const server = http.createServer(app)

const roomVariablesMap = new Map();


///Origin needs to be set to wherever main site is located at
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{
    // console.log(`User Connected: ${socket.id}`)
    socket.on("join_existing_game",(room) =>{
        ///If there's not a second connection
        if(!roomVariablesMap.get(room).secondPlayerJoined){
            socket.join(room)
            roomVariablesMap.set(room, roomVariablesMap.get(room))
            ///Start clock and everything else here. This is where the game starts
        }
    })

    ///Whenever room changes on clientside
    socket.on("create_new_game", () =>{
        let room = Math.floor(Math.random() * 1000)
        if(!io.sockets.adapter.rooms.get(room)){

        }
        socket.join(room)
        let whiteMoveBoolean = true
        let roomBoardPositions = boardPositions

        roomVariablesMap.set(room, {roomBoardPositions: roomBoardPositions, whiteMoveBoolean: whiteMoveBoolean, secondPlayerJoined: false})
        io.in(room).emit("start_client_board", {roomBoardPositions: roomBoardPositions, whiteMoveBoolean: whiteMoveBoolean, secondPlayerJoined: false});
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
// if (process.ENV.NODE_ENV === "production"){
//     console.log(path.join(__dirname, "../", "./client/build"))
//     app.use(express.static(path.join(__dirname, "../", "./client/build")));
//     app.get('*', (req,res) => {
//         res.sendFile(path.join(__dirname, "../", "./client/build", "index.html"));
//     });
// }


///This should be different place from where site is located. Have been able to keep it the same though, further tersting needed
server.listen(3001, () =>{
    console.log("Server is running")
})
