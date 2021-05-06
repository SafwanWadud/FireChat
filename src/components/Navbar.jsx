import React, { Component } from "react";
import { auth } from "../Firebase";
import logo from "../images/logo.png";
import { Navbar, Nav, Button } from "react-bootstrap";

function SignOut() {
    return (
        <Button variant="danger" className="sign-out" onClick={() => auth.signOut()}>
            Sign Out
        </Button>
    );
}

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar className="px-5 py-1 shadow navbar-custom" variant="dark" expand="lg" fixed="top">
                    <Nav>
                        <Navbar.Brand className="d-flex brand">
                            <img className="logo mt-1" src={logo} alt="logo" />
                            <Navbar.Text className="fs-4 brand-text">FireChat</Navbar.Text>
                        </Navbar.Brand>
                    </Nav>
                    <Nav className="ms-auto ">
                        <div className="d-flex me-3">
                            <div
                                className="pfp me-3"
                                style={{ backgroundImage: `url(${auth.currentUser.photoURL})` }}></div>
                            <Navbar.Text className="username"> {auth.currentUser.displayName}</Navbar.Text>
                        </div>
                        <SignOut />
                    </Nav>
                </Navbar>
                <div className="Nav"></div>
            </div>
        );
    }
}
