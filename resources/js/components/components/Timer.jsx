import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CartData from "../add_to_cart/CartData";
const TimerSession = (props) => {
    const navigate = useNavigate();
    const [session, setSession] = useState(true);
    const location = useLocation().hash;
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        if (props.time !== 0) {
            const interval = setInterval(() => {
                const now = new Date().getTime();
                const diffInMs = new Date(props.time).getTime() - now;
                if (diffInMs < 0) {
                    setSession(false);
                    clearInterval(interval);
                } else {
                    setSession(true);
                    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
                    const hours = Math.floor(
                        (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    );
                    const minutes = Math.floor(
                        (diffInMs % (1000 * 60 * 60)) / (1000 * 60)
                    );
                    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
                    setTimeLeft({ days, hours, minutes, seconds });
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [new Date(props.time) + location]);

    useEffect(() => {
        if (session === false) {
            axios.patch("/api/end_session").then((res) => {
                CartData.data = [];
                navigate("/#" + Math.floor(Math.random() * 9999));
            });
        }
    }, [session]);

    const { days, hours, minutes, seconds } = timeLeft;

    return (
        <div>
            <br />
            <div className="container">
                <button
                    type="button"
                    className="btn btn-dark btn-lg "
                    style={{
                        position: "fixed",
                        top: "30%",
                        right: "20px",
                        transform: "translateY(-50%)",
                        width: "auto",
                        zIndex: "1",
                    }}
                >
                    {`${minutes} minutes, ${seconds} seconds`}
                </button>
            </div>
        </div>
    );
};

export default TimerSession;
