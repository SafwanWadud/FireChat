import React from "react";
import { formatRelative } from "date-fns";

export default function Message(props) {
    return (
        <div className="d-flex p-3">
            <div className="pfp me-3" style={{ backgroundImage: `url(${props.profilePicUrl})` }}></div>
            <div>
                <div className="d-flex mb-1">
                    <div className="me-2 username">{props.username}</div>
                    <div className="time">{formatRelative(props.timestamp.toDate(), new Date())}</div>
                </div>
                <div>
                    {props.text ? (
                        <div className="text-message">{props.text}</div>
                    ) : (
                        <div className="img-message-div">
                            <img className="img-message" src={props.imageUrl} alt="" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
