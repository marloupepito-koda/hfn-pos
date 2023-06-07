import React, { useState, useEffect } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
const PushNotification = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const echo = new Echo({
            broadcaster: "pusher",
            key: "82a17c42350e8ce1d15d",
            cluster: "us3",
            encrypted: true,
        });

        echo.channel("pusher-channel").listen(".pusher-payment", (data) => {
            console.log(data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        });

        return () => {
            echo.disconnect();
        };
    }, []);

    const handleSend = () => {
        const message = prompt("Enter a message:");
        if (message) {
            axios.post("/api/pusher-payment", { message });
        }
    };

    return (
        <div>
            <h1>Laravel & React with Pusher</h1>
            <button onClick={handleSend}>Send Event</button>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
};

export default PushNotification;
