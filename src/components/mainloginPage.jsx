import React from "react";
import Login from "./login";

function MainLogin(){
    return(
        <div>
            <header className="header">
                <h1 className = "H1">AIMS :: Academic Information Management System</h1>
                <p>
                    By proceeding with the login you agree to the{" "}
                    <a href="#">terms of use</a> of this service.
                </p>
            </header>

            <Login />
        </div>
    )
}

export default MainLogin;