import { io } from "socket.io-client"

let socket 

export const SocketApi = (username)=>{
    
    socket = io("http://localhost:3000/", {
        transports : ["websocket"] ,query : {username :`${username}`}
})
}

export const Send = (msg,username)=>{
    socket.emit("msg",{"toWho": "chat" ,"username": username , "msg":msg})
}

export const Listen = (calback)=>{
    
    socket.on("new-msg",(msg)=>{
        calback(msg)
        console.log("msg,aaaa",msg)
        
    })
}

export const Users = (callback)=>{
    socket.on("users",(user) =>{
        callback(user)
    })
}