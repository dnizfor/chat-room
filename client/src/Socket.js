import { io } from "socket.io-client"

let socket 

export const SocketApi = (username)=>{
    
    socket = io("http://localhost:3000/", {
        transports : ["websocket"] ,query : {username :`${username}`}
})
}

export const Send = (msg)=>{
    socket.emit("msg",msg)
}

export const Listen = (calback)=>{
    
    socket.on("new-msg",(msg)=>{
        calback(msg)
        
    })
}

export const Users = (callback)=>{
    socket.on("users",(user) =>{
        callback(user)
    })
}