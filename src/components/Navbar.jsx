import React, { Component } from "react";
import { auth } from "../Firebase";
import logo from "../images/logo.png";
import "../styles/index.css";

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
                <div>
                    <div className="pfp" style={{ backgroundImage: `url(${auth.currentUser.photoURL})` }}></div>
                    <div>{auth.currentUser.displayName}</div>
                </div>
                <SignOut />
            </div>
        );
    }
}
