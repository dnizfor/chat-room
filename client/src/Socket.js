import { io } from "socket.io-client"

let socket 

export const SocketApi = ()=>{
    
    socket = io("http://localhost:3000/", {
        transports : ["websocket"]
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