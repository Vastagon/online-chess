// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';
const http = require('http')
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const express = require('express')



function sum(a, b) {
  return a + b;
}

describe("Testing Jest", () =>{
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

})

describe("SocketIO testing", ()=>{
  let io, serverSocket, clientSocket;

  ///Initiate server
  beforeAll((done) =>{
    const app = express()
    const server = http.createServer(app)

    io = new Server(server, {
      cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
      }
    })

    ///Switching to 3001 creates timeout
    server.listen(3000, () =>{
      clientSocket = new Client(`http://localhost:3000`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    })
  })

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  ///Start of tests
  test("Check if SocketIO connects properly", () =>{
    clientSocket.on("hello", (arg) => {
      expect(arg).toBe("world");
      done();
    });
    serverSocket.emit("hello", "w1orld");

  })


})

