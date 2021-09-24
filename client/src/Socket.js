import { io } from "socket.io-client"

let socket 

export const SocketApi = (username)=>{
    
    socket = io("http://localhost:3000/", {
        transports : ["websocket"] ,query : {username :`${username}`}
})
}

export const Send = (msg,username)=>{
    socket.emit("messages",{"toWho": "chat" ,"username": username , "msg":msg})
}

export const Listen = (calback)=>{
    
    socket.on("messages",(msg)=>{
        calback(msg)
        
        
    })
}

export const Users = (callback)=>{
    socket.on("users",(user) =>{
        callback(user)
    })
}

export const Private = (target,username,msg)=>{
    socket.emit('private-message',{"target":target, "username":username,"id": socket.id,"msg": msg});
    
   
    
}
export const ListenPrivate = (cb)=>{
    socket.on('private-message',(data)=>{
    cb(data)

 
    })
}