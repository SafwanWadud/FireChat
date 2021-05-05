import React, { Component } from "react";
import firebase, { auth, db } from "../Firebase";

export default class InputBar extends Component {
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

    render() {
        return (
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
        );
    }
}
