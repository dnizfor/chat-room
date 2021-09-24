const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let users = []


io.on('connection', (socket) => {
  
  users.push(socket.handshake.query.username)

  io.sockets.emit("users",users)

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });

    socket.on('disconnect', () => {
      let nick = toString(socket.handshake.query.username)
      let index = users.indexOf(nick);
      users = users.splice(index,1)
      io.sockets.emit("users",users)
    });

    socket.on("msg",(msg)=>{
      socket.broadcast.emit("new-msg",msg)
    })
    
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});