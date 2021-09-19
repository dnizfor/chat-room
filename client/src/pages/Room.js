import React from 'react'
import { useParams } from 'react-router'

import "./room.css"

export default function Room() {
    
    const { id } = useParams()

    return (
        <div>
            
            <section>
                <div id="chat" className="container-fluid">
                    <div className="row">

                        {/* Chat */}

                        <div className="col-10">

                            chaadfsdg

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
                        <div className="col-10 d-flex flex-row p-0">
                            <input type="text" className="form-control w-75"/>
                            <input type="submit" className="btn btn-primary w-25"/>
                        </div>
                    </div>
                </div>
            </section>
            













        </div>
    )
}
