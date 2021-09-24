import React, { useState } from 'react'
import Chat from "../assets/chat.png"

import {
    Redirect,
  } from "react-router-dom";

export default function Home() {

    const [id, setId] = useState("")
    const [redirect, setRedirect] = useState(false)

    const changeHandler = (e) =>{
        setId(e.target.value)
    }
    const submitHandler = (e) =>{
        setRedirect(true)
        e.preventDefault()
    }
    if(redirect === true){
        return <Redirect to={`/room/${id}`}/>;
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container">
                    <a class="navbar-brand" href="/">ChatRoom</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    </div>
                </div>
            </nav>


            <section className="mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-6 d-flex align-items-center">
                            <form onSubmit={submitHandler}>
                                <p className="display-1">ChatRoom</p >
                                <div class="mb-3">
                                    <label for="username" class="form-label">Join the Chat!</label>
                                    <input type="text" value={id} class="form-control" id="username" placeholder="username" aria-describedby="username" onChange={changeHandler} />
                                </div>
                                <button  type="submit" class="btn btn-primary">Login</button>
                            </form>

                        </div>
                        <div className="col-6 d-flex align-items-center ">
                            <img src={Chat} alt="chat" className="img-fluid"/>
                        </div>

                    </div>

                </div>

            </section>




        </div>
    )
}
