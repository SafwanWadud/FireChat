import React, { useState, useEffect } from "react";
import { auth } from "./Firebase";
import SignIn from "./components/SignIn";
import Channel from "./components/Channel";

function App() {
    const [user, setUser] = useState(() => auth.currentUser);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) setUser(user);
            else setUser(null);
        });
        return unsubscribe;
    });

    return <div className="App ">{user ? <Channel /> : <SignIn />}</div>;
}

export default App;
