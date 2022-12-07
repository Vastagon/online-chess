const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
let initialBoardPositions = require('./boardpositions.json')
const path = require('path')
///if running both serpeately, then this should be 3001

app.use(cors())
require('dotenv').config();

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
    socket.on("join_existing_game", async (roomData) =>{
        ///Checks the number of connections to the appropriate room and decides whether to 
        const roomArray = await io.in(roomData.room).fetchSockets();
        if(roomArray.length < 2){
            socket.join(roomData.room)
            console.log("Connected to room successfully")
            io.to(roomData.room).emit("existing_connection_successful")
        }else{
            console.log("Too many existing connections in room")
            io.to(roomData.socketid).emit("existing_connection_failed")
        }
        

    })

    // socket.on("")


    ///Whenever room changes on clientside
    socket.on("create_new_game", async () =>{
        let room = Math.floor(Math.random() * 1000).toString()
        ///Checks if room exists
        if(!io.sockets.adapter.rooms.get(room)){
            socket.join(room)
            let whiteMoveBoolean = true
            let boardPosition = initialBoardPositions


            ///Change boolean to check if two players are connected
            roomVariablesMap.set(room, {boardPosition: boardPosition, whiteMoveBoolean: whiteMoveBoolean})
            io.in(room).emit("start_client_board", {boardPosition: boardPosition, whiteMoveBoolean: whiteMoveBoolean, room: room});
        }
    })

    socket.on("piece_moved", (data)=>{
        let tempBoardData = roomVariablesMap.get(data.room)
        
        tempBoardData.boardPosition = data.boardPosition
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
// server.listen(process.ENV.PORT || 3001, () =>{
//     console.log("Server is running")
// })

server.listen(3001, () =>{
    console.log("Server is running")
})