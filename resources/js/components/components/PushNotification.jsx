import React, { useState, useEffect } from "react";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const PushNotification = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        var pusher = new Pusher("82a17c42350e8ce1d15d", {
            cluster: "us3",
        });

        var channel = pusher.subscribe("popup-channel");
        channel.bind("user-register", function (data) {
            alert(JSON.stringify(data));
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
            <button onClick={handleSend}>Send Event</button>
            <h1>{messages}</h1>
        </div>
    );
};

export default PushNotification;
