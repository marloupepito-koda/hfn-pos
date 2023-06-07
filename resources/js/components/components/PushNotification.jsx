import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
const PushNotification = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        var pusher = new Pusher("82a17c42350e8ce1d15d", {
            cluster: "us3",
            encrypted: true,
        });

        var channel = pusher.subscribe("push_notification");
        channel.bind("push_notification", function (response) {
            alert("some notification");
        });
    }, []);

    const handleSend = () => {
        const message = Math.random();
        if (message) {
            axios.post("/api/pusher-payment", { message });
        }
    };

    return (
        <div>
            <h1>Laravel & React with Pusher</h1>
            <button onClick={handleSend}>Send Event</button>
            <h1>{messages}</h1>
        </div>
    );
};

export default PushNotification;
