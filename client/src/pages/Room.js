import React, { useState ,useEffect } from 'react'
import { useParams } from 'react-router'

import "./room.css"

import { SocketApi, Send ,Listen } from '../Socket'

export default function Room() {

    const [text, setText] = useState("")
    const [chat,setChat] = useState([])


    useEffect(() => {
        SocketApi()
        Listen((message)=>{
            setChat((prevState)=> [...prevState, message])})
    },[])

    
    const { id } = useParams()

    const changeHandler = (e) => {
        setText(e.target.value)
    }

    const submitHandler  = (e)=>{
        e.preventDefault()
        if(text === ""){
            
        }
        else{
            Send(text)
            setChat([...chat,text])
            setText("")
        }
        
        
        

    }

    return (
        <div>
            
            <section>
                <div id="chat" className="container-fluid">
                    <div className="row">

                        {/* Chat */}


                        <div className="col-10">

                            {
                                chat.map(msg=>(<div>{msg} {chat.length}</div>))
                            }
                    

                        </div>

                        {/* Users */}


                        <div id="userList" className="col-2 d-flex flex-column ">

                          


                            <div>@user</div>                    




                        </div>
                    </div>

                </div>
                
            </section>

            {/* İnput section */}
            <section>
                <div id="console" className="container-fluid ">
                    <div className="row">
                        <form onSubmit={submitHandler} className="col-10 d-flex flex-row p-0">
                            <input onChange={changeHandler}  value={text} type="text" className="form-control w-75"/>
                            <input  type="submit" className="btn btn-primary w-25"/>
                        </form>
                    </div>
                </div>
            </section>
            













        </div>
    )
}
