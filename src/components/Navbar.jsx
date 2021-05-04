import React, { Component } from "react";
import { auth } from "../Firebase";
import logo from "../images/logo.png";

function SignOut() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

export default class Navbar extends Component {
    render() {
        return (
            <div className="Nav">
                <div>
                    <img src={logo} alt="logo" />
                    <h1> FireChat</h1>
                </div>
                <SignOut />
            </div>
        );
    }
}
