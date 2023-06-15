import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AddToCartTopNavbar from "./add_to_cart/components/TopNavbar";
import CartData from "./add_to_cart/CartData";
import moment from "moment";
import { useParams } from "react-router-dom";
import axios from "axios";
function AppLayout() {
    const [timeLeft, setTimeLeft] = useState(0);
    const [data, setData] = useState([]);
    const location = useLocation();
    const hash = useLocation().hash;
    const { code } = useParams();
    useEffect(() => {
        if (code == undefined) {
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
        } else {
            axios.get("/api/get_ordered_products/" + code).then((res) => {
                if (CartData.data.length === 0) {
                    CartData.data = [res.data.checkout[0].cart_products];
                    setData(res.data.checkout);
                } else {
                    CartData.data = CartData.data.slice(0, 2);
                }
            });
        }
    }, [location + data + hash]);
    return (
        <>
            <AddToCartTopNavbar />
            <div className="container">
                <Outlet context={[data]} />
            </div>
        </>
    );
}

export default AppLayout;
