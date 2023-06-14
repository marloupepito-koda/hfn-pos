import React, { useState, useEffect } from "react";
import CartData from "../CartData";
import { useLocation, Link, useParams } from "react-router-dom";
import PaymentChange from "../Change";
function AddToCartTopNavbar() {
    const [cartCount, setCartCount] = useState(0);
    const [balance, setBalance] = useState(0);
    const { pathname } = useLocation();
    const { code } = useParams();
    const location = useLocation().hash;
    useEffect(() => {
        setCartCount(CartData.data.length);
        axios.get("/api/get_ordered_products/" + code).then((res) => {
            setBalance(res.data.discount.grandtotal);
        });
    }, [location]);

    function grandTotalHandler(totalValue) {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });
        return formatter.format(totalValue);
    }

    return (
        <nav className="navbar navbar-expand-lg bg-black fixed-top">
            <div className="container">
                <a href="/" className="navbar-brand">
                    HFN Live
                </a>

                {/* <a
                    href="ticket.html"
                    className="btn custom-btn d-lg-none ms-auto me-4"
                >
                    Buy Ticket
                </a> */}

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav align-items-lg-center ms-auto me-lg-5">
                        <li className="nav-item">
                            <a
                                className="nav-link click-scroll"
                                href="#section_5"
                            >
                                Balance&nbsp;
                                <span className="badge bg-primary">
                                    {grandTotalHandler(balance)}
                                </span>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link click-scroll">
                                Cart&nbsp;
                                <span className="badge bg-success">
                                    {CartData.data.length}
                                </span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link click-scroll"
                                href="#section_7"
                            >
                                Charge&nbsp;
                                <span className="badge bg-primary">
                                    {PaymentChange.data}
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default AddToCartTopNavbar;
