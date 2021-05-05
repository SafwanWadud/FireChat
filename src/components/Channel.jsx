import React, { Component } from "react";
import Navbar from "./Navbar";
import Message from "./Message";
import firebase, { auth, db } from "../Firebase";

export default class Channel extends Component {
    state = {
        messages: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        db.collection("messages")
            .add({
                username: auth.currentUser.displayName,
                text: e.target[0].value.trim(),
                profilePicUrl: auth.currentUser.photoURL,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
                e.target[0].value = "";
            })
            .catch((error) => {
                console.error("Error writing new message to database", error);
            });
    };

    componentDidMount() {
        let query = db.collection("messages").orderBy("timestamp", "asc").limit(100);
        this.unsubscribe = query.onSnapshot((snapshot) => {
            let tempMessages = [];
            snapshot.forEach((doc) => {
                tempMessages.push({ ...doc.data({ serverTimestamps: "estimate" }), id: doc.id });
            });
            this.setState({ messages: tempMessages });
            this.messageEndRef.scrollIntoView();
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    render() {
        return (
            <div>
                <Navbar />
                <div>
                    <h2>Welcome to FireChat!</h2>
                    <p>This is the beginning of the chat</p>
                    <hr />
                </div>
                <div className="messages">
                    {this.state.messages.map((message) => (
                        <Message {...message} key={message.id} />
                    ))}
                </div>
                <div
                    ref={(elem) => {
                        this.messageEndRef = elem;
                    }}></div>
                <div className="input-bar">
                    <form action="#" onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Message..." required />
                        <button type="submit">Send</button>
                    </form>
                    {/*<form action="#" onSubmit={this.handleSubmit}>
                        <input type="file" accept="image/*" />
                        <button title="Add an image">image</button>
        </form>*/}
                </div>
            </div>
        );
    }
}
