import React, { useState, useEffect } from "react";
import axios from "axios";
import Pusher from "pusher-js";

const PushNotification = () => {
    const [messages, setMessages] = useState("");

    useEffect(() => {
        // const pusher = new Pusher("82a17c42350e8ce1d15d", {
        //     cluster: "us3",
        // });

        // const channel = pusher.subscribe("pusher-channel");
        // channel.bind(".pusher-payment", (data) => {
        //     setMessages("waaaa");
        //     // setMessages((prevMessages) => [...prevMessages, data.message]);
        // });

        // return () => {
        //     pusher.unsubscribe("pusher-channel");
        // };

        var pusher = new Pusher("82a17c42350e8ce1d15d", {
            cluster: "us3",
        });

        var channel = pusher.subscribe("pusher-channel");
        channel.bind(".pusher-payment", function (data) {
            // alert(JSON.stringify(data));
        });

        console.log("result", channel);
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
            {messages}
            {/* <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul> */}
        </div>
    );
};

export default PushNotification;
