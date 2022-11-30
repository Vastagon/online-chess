const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const allowCors = require("allow-cors");

let boardPositions = require("./boardpositions.json");
const roomVariablesMap = new Map();
const path = require("path");
///if running both serpeately, then this should be 3001

// app.use(cors());
app.use(
  allowCors({
    origin: "*",
    headers: "*",
    methods: "*",
    credentials: "*",
  })
);
const server = http.createServer(app);

///Origin needs to be set to wherever main site is located at
const io = new Server(server, {
  cors: {
    origin: "https://7qliix-3001.preview.csb.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`)

  ///Whenever room changes on clientside
  socket.on("join_room", (room) => {
    socket.join(room);
    let whiteMoveBoolean = true;
    let roomBoardPositions = boardPositions;

    roomVariablesMap.set(room, {
      roomBoardPositions: roomBoardPositions,
      whiteMoveBoolean: whiteMoveBoolean,
    });
    io.in(room).emit("start_client_board", {
      roomBoardPositions: roomBoardPositions,
      whiteMoveBoolean: whiteMoveBoolean,
    });
  });

  socket.on("piece_moved", (data) => {
    let tempBoardData = roomVariablesMap.get(data.room);

    tempBoardData.roomBoardPositions = data.boardPosition;
    tempBoardData.whiteMoveBoolean = !tempBoardData.whiteMoveBoolean;

    roomVariablesMap.set(data.room, tempBoardData);

    io.in(data.room).emit("update_client_board", tempBoardData);
  });
});

//process.env.NODE_ENV
// if (process.ENV.NODE_ENV === "production"){
//     console.log(path.join(__dirname, "../", "./client/build"))
//     app.use(express.static(path.join(__dirname, "../", "./client/build")));
//     app.get('*', (req,res) => {
//         res.sendFile(path.join(__dirname, "../", "./client/build", "index.html"));
//     });
// }

// if(true){
//     console.log(path.join(__dirname, "../", "./client/build"))
//     app.use(express.static(path.join(__dirname, "../", "./client/build")));
//     app.get('*', (req,res) => {
//         res.sendFile(path.join(__dirname, "../", "./client/build", "index.html"));
//     });
// }

///This should be different place from where site is located. Have been able to keep it the same though, further tersting needed
server.listen(3001, () => {
  console.log("Server is running");
});
