import React from "react";
import firebase, { auth } from "../Firebase";
import logo from "../images/logo.png";

export default function SignIn() {
    const googleSignIn = () => {
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    };
    return (
        <>
            <div>
                <img src={logo} alt="logo" />
                <h1> FireChat</h1>
            </div>
            <p>A simple way to chat with other people</p>
            <button onClick={googleSignIn}>Sign in with Google</button>
        </>
    );
}
