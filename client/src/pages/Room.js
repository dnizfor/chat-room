import React, { useState, useEffect } from 'react'

import ScrollToBottom from 'react-scroll-to-bottom';

import { useSelector } from 'react-redux'

import "./room.css"

import { SocketApi, Send, Listen, Users ,Private,ListenPrivate } from '../Socket'

export default function Room() {

    const id = useSelector((state) => state.createUsername.value).payload   
    
    const [text, setText] = useState("")
    const [chat, setChat] = useState([])
    const [users, setUsers] = useState([])
    const [toWho, setToWho] = useState("chat")
    const [clients, setClients] = useState([])

    useEffect(() => {
        SocketApi(id)

        Listen((message) => {
            setChat((prevState) => [...prevState, { "toWho": "chat", "username": message.username, "msg": message.msg }])
        })

        Users((users) => {
            setUsers(users)
        })
        ListenPrivate((data)=>{
            setChat((prevState)=>[...prevState, { "toWho": data.id, "username": data.username, "msg": data.msg }])
            addClient({"username": data.username,"id": data.id})
   

        })
    

    }, [])


    const changeHandler = (e) => {
        setText(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (text === "") {
            return
        }
        if (toWho === "chat"){
            Send(text, id)
            setChat((prevState)=>[...prevState, { "toWho": "chat", "username": id, "msg": text }])
            setText("")
        }
        else{
            Private(toWho, id,text)
            setChat((prevState)=>[...prevState, { "toWho": toWho, "username": id, "msg": text }])
            setText("")
            
        }
        
    }

    const addClient = (user) => {
        if (clients.includes(user)) {
            return
        }
        setClients([...clients, user])
        console.log(user)

   
    }
    const removeClient=(client)=>{
        let newClients = clients.filter(c => c !== client) 
        setClients(newClients)
        let newChat = chat.filter(m => m.toWho !== client.id)
        setChat(newChat)

    }

    return (
        <div>

            <section>
                <div  className="container-fluid">
                    <div  className="row">


                        <div id="contacts" className="col-10 d-flex flex-row overflow-hidden border border-top-0 border-end-0 border-start-0">

                            {/*Contacts*/}

                            <button className="btn border" onClick={() => {
                                setToWho("chat")
                            }}>Chat</button>


                            {
                                clients.map(client => (
                                    <button className="btn border d-flex flex-row align-items-center overflow-hidden " onClick={() => {
                                        setToWho(client.id)
                                    }}>
                                        {client.username}
                                        <button id="close" onClick={()=>removeClient(client)} type="button" className="btn-close ms-2 "  aria-label="Close"></button>
                                    </button>
                                ))
                            }


                        </div>

                        {/* Chat */}

                        
                        <ScrollToBottom className="col-12 col-sm-10 py-2 chat">
                            


                            {
                                chat.map(msg => (
                                    msg.toWho === toWho && <div><em>@{msg.username} : </em> {msg.msg}</div>))
                            }
                            
                            

                        </ScrollToBottom>
                     

                        {/* Users */}


                        <div id="userList" className="col-sm-2 d-none d-sm-flex flex-column pt-2 ">




                            {
                                users.map(user => (<button onClick={() => addClient( user )} className="btn shadow-sm my-1 overflow-hidden">@{user.username}</button >))
              
                            }




                        </div>
                    </div>

                </div>

            </section>

            {/* İnput section */}
            <section>
                <div id="console" className="container-fluid ">
                    <div className="row">
                        <form onSubmit={submitHandler} className="col-10 d-flex flex-row p-0">
                            <input onChange={changeHandler} value={text} type="text" className="form-control w-75" />
                            <input type="submit" className="btn btn-primary w-25" />
                        </form>
                    </div>
                </div>
            </section>














        </div>
    )
}
