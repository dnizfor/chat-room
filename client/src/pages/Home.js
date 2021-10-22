import React, { useState } from 'react'
import Chat from "../assets/chat.png"
import "./home.css"

import { useDispatch } from 'react-redux'
import { newUsername } from '../redux/usernameSlice'

import {
    Redirect,
} from "react-router-dom";

export default function Home() {

    const [id, setId] = useState("")
    const [redirect, setRedirect] = useState(false)

    const dispatch = useDispatch()

    const changeHandler = (e) => {
        setId(e.target.value)
    }
    const submitHandler = (e) => {
        dispatch(newUsername(id))
        setRedirect(true)
        e.preventDefault()
    }
    if (redirect === true) {
        return <Redirect to={`/room`} />;
    }
    return (
        <div>

            {/* Navbar*/}

            <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container">
                    <a class="navbar-brand" href="/">ChatRoom</a>

                </div>
            </nav>

            {/* Home */}
            <section >
                <div className="container">

                    <div id="home" className="row ">

                        <div className="col-12 col-md-6 order-2 order-md-1 d-flex align-items-center">

                            {/* Login Form */}

                            <form  className="mx-auto mx-md-0" onSubmit={submitHandler}>
                                <p className="display-1">ChatRoom</p >
                                <div class="mb-3">
                                    <label for="username" class="form-label">Join the Chat!</label>
                                    <input type="text" value={id} class="form-control" id="username" placeholder="username" aria-describedby="username" onChange={changeHandler} />
                                </div>
                                <button type="submit" class="btn btn-primary">Login</button>
                            </form>

                        </div>
                        
                        {/*İmage */}

                        <div className="col-12 col-md-6 order-1 order-md-2  d-flex align-items-center ">
                            <img src={Chat} alt="chat" id="chatImg" className="img-fluid  mx-auto" />
                        </div>

                    </div>

                </div>

            </section>




        </div>
    )
}
