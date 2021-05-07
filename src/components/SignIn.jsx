import React from "react";
import firebase, { auth } from "../Firebase";
import logo from "../images/logo.png";
import googleLogo from "../images/google.png";
import { Button } from "react-bootstrap";

export default function SignIn() {
    const googleSignIn = () => {
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    };
    return (
        <div className="d-flex justify-content-center align-items-center position-relative" style={{ height: "100vh" }}>
            <div className="title-card d-flex flex-column justify-content-center align-items-center shadow-sm p-3">
                <div className="d-flex title-brand justify-content-center">
                    <img className="title-logo" src={logo} alt="logo" />
                    <h2 className="text-center fw-light p-2"> FireChat</h2>
                </div>
                <h5 className="my-4 text-center">A simple way to chat with other people</h5>
                <Button variant="light" className="py-2 px-3" onClick={googleSignIn}>
                    {" "}
                    <img className="google-logo me-2" src={googleLogo} alt="Google logo" />
                    Sign in with Google
                </Button>
            </div>
        </div>
    );
}
