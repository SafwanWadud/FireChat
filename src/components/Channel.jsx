import React, { Component } from "react";
import NavBar from "./NavBar";
import Message from "./Message";
import InputBar from "./InputBar";
import { db } from "../Firebase";

export default class Channel extends Component {
    state = {
        messages: [],
    };

    componentDidMount() {
        let query = db.collection("messages").orderBy("timestamp", "desc").limit(50);
        this.unsubscribe = query.onSnapshot((snapshot) => {
            let tempMessages = [];
            snapshot.forEach((doc) => {
                tempMessages.push({ ...doc.data({ serverTimestamps: "estimate" }), id: doc.id });
            });
            this.setState({ messages: tempMessages }, () => {
                this.messageEndRef.scrollIntoView();
            });
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="channel">
                    <div className="text-center">
                        <h2>Welcome to FireChat!</h2>
                        <p className="mb-3 desc">This is the beginning of the chat</p>
                        <hr />
                    </div>
                    <div className="messages">
                        {this.state.messages
                            .sort((first, second) => (first.timestamp.seconds <= second.timestamp.seconds ? -1 : 1))
                            .map((message) => (
                                <Message {...message} key={message.id} />
                            ))}
                    </div>
                </div>
                <InputBar />
                <div
                    ref={(elem) => {
                        this.messageEndRef = elem;
                    }}></div>
            </div>
        );
    }
}
