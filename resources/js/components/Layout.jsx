import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AddToCartTopNavbar from "./add_to_cart/components/TopNavbar";
import TimerSession from "./components/Timer";
import CartData from "./add_to_cart/CartData";
import moment from "moment";
function AppLayout() {
    const [timeLeft, setTimeLeft] = useState(0);
    const [data, setData] = useState([]);
    const location = useLocation();
    const hash = useLocation().hash;
    useEffect(() => {
        axios
            .get("/api/session", {
                date: moment().format("LLL"),
            })
            .then((res) => {
                if (res.data.checkout !== null) {
                    setData(res.data.checkout);
                    if (CartData.data.length === 0) {
                        CartData.data = res.data.checkout;
                    }
                    setTimeLeft(res.data.status);
                } else {
                    setData(CartData.data);
                }
            });
    }, [location + data + hash]);
    return (
        <>
            <AddToCartTopNavbar />
            <TimerSession time={timeLeft} />
            <div style={{ marginTop: "15px" }}></div>
            <Outlet context={[data]} />
        </>
    );
}

export default AppLayout;
