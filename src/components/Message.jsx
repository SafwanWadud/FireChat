import React from "react";
import { formatRelative } from "date-fns";

export default function Message(props) {
    const formatDate = (timeStamp) => {
        let date = "";
        if (timeStamp) {
            date = formatRelative(timeStamp.toDate(), new Date());
            date = date.charAt(0).toUpperCase() + date.slice(1);
        }
        return date;
    };

    return (
        <div className="d-flex p-3 w-100 message">
            <div>
                <div className="pfp me-3" style={{ backgroundImage: `url(${props.profilePicUrl})` }}></div>
            </div>
            <div className="d-flex flex-column">
                <div className="d-flex mb-1">
                    <div className="me-2 username">{props.username}</div>
                    <div className="time">{formatDate(props.timestamp)}</div>
                </div>
                {props.imageUrl ? (
                    <div className="img-message-div">
                        <img className="img-message" src={props.imageUrl} alt="" />
                    </div>
                ) : (
                    <div className="text-message text-break">{props.text}</div>
                )}
            </div>
        </div>
    );
}
