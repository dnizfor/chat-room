const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let users = []

let user ;

io.on('connection', (socket) => {
  
  user= {"username":socket.handshake.query.username,"id":socket.id}

  users.push(user)

  io.sockets.emit("users",users)

    socket.on('disconnect', () => {
      let index = users.indexOf(user);
      users = users.splice(index,1)
      io.sockets.emit("users",users)

    });

    socket.on("messages",(msg)=>{
      socket.broadcast.emit("messages",msg)
    })
    socket.on("private-message",(data)=>{
      io.to(data.target).emit('private-message', data)
      console.log(data)
     
      
    })
    
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});