import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import "./room.css"

import { SocketApi, Send, Listen, Users ,Private,ListenPrivate } from '../Socket'

export default function Room() {

    const [text, setText] = useState("")
    const [chat, setChat] = useState([])
    const [users, setUsers] = useState([])
    const [toWho, setToWho] = useState("chat")
    const [clients, setClients] = useState([])

    const { id } = useParams()


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
                <div id="chat" className="container-fluid">
                    <div className="row">

                        <div className="col-10 d-flex flex-row ">

                            {/*Contacts*/}

                            <button className="btn" onClick={() => {
                                setToWho("chat")
                            }}>chat</button>


                            {
                                clients.map(client => (
                                    <button className="btn" onClick={() => {
                                        setToWho(client.id)
                                    }}>{client.username}<button onClick={()=>removeClient(client)} type="button" class="btn-close" aria-label="Close"></button></button>
                                ))
                            }


                        </div>

                        {/* Chat */}


                        <div className="col-10">


                            {
                                chat.map(msg => (
                                    msg.toWho === toWho && <div><em>@{msg.username} : </em> {msg.msg}</div>))
                            }



                        </div>

                        {/* Users */}


                        <div id="userList" className="col-2 d-flex flex-column ">




                            {
                                users.map(user => (<button onClick={() => addClient( user )} className="btn">@{user.username}</button >))
              
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
