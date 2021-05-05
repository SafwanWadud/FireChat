import React, { Component } from "react";
import firebase, { auth, db, storage } from "../Firebase";
import "../styles/index.css";
import loadingImage from "../images/loading.gif";

export default class InputBar extends Component {
    sendMessage = (e) => {
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

    promptFilePicker = (e) => {
        e.preventDefault();
        this.filePickerRef.click();
    };

    sendImage = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        e.target.value = "";
        if (!file.type.match("image.*")) {
            alert("You can only upload images");
            return;
        }

        db.collection("messages")
            .add({
                username: auth.currentUser.displayName,
                imageUrl: loadingImage,
                profilePicUrl: auth.currentUser.photoURL,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((docSnapshot) => {
                let imageRef = storage.ref().child(`${auth.currentUser.uid}/${docSnapshot.id}/${file.name}`);
                imageRef
                    .put(file)
                    .then((fileSnapshot) => {
                        fileSnapshot.ref
                            .getDownloadURL()
                            .then((url) => {
                                docSnapshot.update({
                                    imageUrl: url,
                                });
                            })
                            .catch(function (error) {
                                console.error("Error downloading file from Cloud Storage:", error);
                            });
                    })
                    .catch(function (error) {
                        console.error("Error uploading file to Cloud Storage:", error);
                    });
            })
            .catch((error) => {
                console.error("Error writing new message to database", error);
            });
    };

    render() {
        return (
            <div className="input-bar">
                <form action="#" onSubmit={this.sendMessage}>
                    <input type="text" placeholder="Message..." required />
                    <button type="submit">Send</button>
                </form>
                <input
                    id="img-file"
                    type="file"
                    accept="image/*"
                    ref={(elem) => {
                        this.filePickerRef = elem;
                    }}
                    onChange={this.sendImage}
                />
                <button onClick={this.promptFilePicker} title="Add an image">
                    Upload Image
                </button>
            </div>
        );
    }
}
