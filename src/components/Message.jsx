import React from "react";
import { formatRelative } from "date-fns";

export default function Message(props) {
    return (
        <div>
            <div className="pfp" style={{ backgroundImage: `url(${props.profilePicUrl})` }}></div>
            <div>
                <div>
                    <div>{props.username}</div>
                    <div>{formatRelative(props.timestamp.toDate(), new Date())}</div>
                </div>
                <div>{props.text}</div>
            </div>
        </div>
    );
}
