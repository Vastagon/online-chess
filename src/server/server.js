const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
let initialBoardPositions = require('../boardpositions.json')
const path = require('path')

app.use(cors())
require('dotenv').config();
 
const server = http.createServer(app)

const roomVariablesMap = new Map(); 
let originUrl

if(process.env.NODE_ENV === "production"){
    originUrl = "https://vastagon-online-chess.herokuapp.com/"
}else{
    originUrl = "http://localhost:3000"
}

///Origin needs to be set to wherever main site is located at
const io = new Server(server, {
    cors: { 
        origin: originUrl,
        methods: ["GET", "POST"]
    }  
})
 
 

io.on("connection", (socket)=>{
    // console.log(`User Connected: ${socket.id}`)
    socket.on("join_existing_game", async (roomData) =>{
        ///Checks the number of connections to the appropriate room and decides whether to 
        const roomArray = await io.in(roomData.room).fetchSockets();
        if(roomArray.length < 2 && roomArray.length !== 0){
            socket.join(roomData.room)
            console.log("Connected to room successfully")

            ///Check if white or black is undefined
            if(roomVariablesMap.get(roomData.room).whiteSocketID?.length > 0){
                roomVariablesMap.set(roomData.room, {...roomVariablesMap.get(roomData.room), blackSocketID: roomData.socketID})
            }else{
                roomVariablesMap.set(roomData.room, {...roomVariablesMap.get(roomData.room), whiteSocketID: roomData.socketID})
            }

            io.to(roomData.room).emit("existing_connection_successful", roomVariablesMap.get(roomData.room))
        }else{
            console.log("Too many existing connections in room or room doesn't exist")
            io.to(roomData.socketid).emit("existing_connection_failed")
        }
    }) 

    ///Whenever new game button is clicked
    socket.on("create_new_game", async (socketID) =>{
        let room = Math.floor(Math.random() * 1000).toString()
        ///Checks if room exists
        if(!io.sockets.adapter.rooms.get(room)){
            socket.join(room)
            let whiteMoveBoolean = true
            let boardPosition = initialBoardPositions
            let whiteSocketID
            let blackSocketID

            ///Choose randomly if player is white or black
            let isWhite = Boolean(Math.round(Math.random() + 0.3))
            if(isWhite){
                whiteSocketID = socketID 
            }else{ 
                blackSocketID = socketID
            }


            ///Change boolean to check if two players are connected
            roomVariablesMap.set(room, {boardPosition: boardPosition, whiteMoveBoolean: whiteMoveBoolean, whiteSocketID: whiteSocketID, blackSocketID: blackSocketID})
            io.in(room).emit("start_client_board", {boardPosition: boardPosition, whiteMoveBoolean: whiteMoveBoolean, room: room, whiteSocketID: whiteSocketID, blackSocketID: blackSocketID});
        }
    })
 
    ///Whenever a piece gets moved
    socket.on("piece_moved", (data)=>{
        let tempBoardData = roomVariablesMap.get(data.room)
        
        tempBoardData.boardPosition = data.boardPosition
        tempBoardData.whiteMoveBoolean = !tempBoardData.whiteMoveBoolean
        tempBoardData.darkenedSquares = data.darkenedSquares
        tempBoardData.kingPositions = data.kingPositions

        roomVariablesMap.set(data.room, tempBoardData)

        ///Emiting only to other client
        socket.to(data.room).emit("update_client_board", tempBoardData);
    })

    ///Whenever a piece gets promoted
    socket.on("piece_promoted", (data)=>{ 
        let tempBoardData = roomVariablesMap.get(data.room)
        
        tempBoardData.boardPosition = data.boardPosition
        tempBoardData.darkenedSquares = data.darkenedSquares

        roomVariablesMap.set(data.room, tempBoardData)

        ///Emiting only to other client
        socket.to(data.room).emit("update_client_board", tempBoardData);
    })

    socket.on("disconnecting", () => {
        for (const room of socket.rooms) {
          if (room !== socket.id) {
            socket.to(room).emit("userLeft", socket.id);
          }
        }
      });
}) 

 
//process.env.NODE_ENV
if (process.env.NODE_ENV === "production"){
    console.log(path.join(__dirname, "../../build"))
    app.use(express.static(path.join(__dirname, "../../build")));
    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, "../../build", "index.html"));
    }); 
}


server.listen(process.env.PORT || 3001, () =>{
    console.log(`Server is running on: ${process.env.PORT || 3001}`)
})