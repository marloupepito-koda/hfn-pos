import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CartData from "../../add_to_cart/CartData";
import PaymentChange from "../../add_to_cart/Change";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

import Swal from "sweetalert2";
function UpgradePaymentMethods(props) {
    const [method, setMethod] = useState("credits");
    const [amount, setAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [disable, setDisabled] = useState(false);
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();
    const location = useLocation().hash;
    const code = useLocation();

    useEffect(() => {
        setDiscount(props.discount);
        const change =
            amount - props.grandTotal < 0 ? 0 : amount - props.grandTotal;
        PaymentChange.data = change;
        checkPayment("error");
        var pusher = new Pusher("82a17c42350e8ce1d15d", {
            cluster: "us3",
        });

        var channel = pusher.subscribe("popup-channel");
        channel.bind("user-register", function (data) {
            setSubmit(Math.random());
            updateSeats();
        });
    }, [CartData + props.discount + amount + submit]);

    const [paymentCard, setPaymentCard] = useState({
        cart: CartData.data,
        fullname: "",
        email: "",
        check_info: 0,
        where_find: "",
        tenders: 0,
        notes: "",
        grandTotal: props.grandTotal,
        ticketFee: props.ticketFee,
        subTotal: props.subTotal,
    });

    const [paymentCash, setPaymentCash] = useState({
        cart: CartData.data,
        fullname: "",
        email: "",
        tenders: 0,
        check_info: 0,
        where_find: "",
        notes: "",
        grandTotal: props.grandTotal,
        ticketFee: props.ticketFee,
        subTotal: props.subTotal,
    });

    const [paymentCheck, setPaymentCheck] = useState({
        cart: CartData.data,
        fullname: "",
        email: "",
        check_info: 0,
        tenders: 0,
        where_find: "",
        notes: "",
        grandTotal: props.grandTotal,
        ticketFee: props.ticketFee,
        subTotal: props.subTotal,
    });
    const changeHandler = (e) => {
        setMethod(e);
    };

    const nameHandler = (e) => {
        paymentCard.fullname = e;
        paymentCash.fullname = e;
        paymentCheck.fullname = e;
    };

    const emailHandler = (e) => {
        paymentCard.email = e;
        paymentCash.email = e;
        paymentCheck.email = e;
    };
    const whereHandler = (e) => {
        paymentCard.where_find = e;
        paymentCash.where_find = e;
        paymentCheck.where_find = e;
    };

    const notesHandler = (e) => {
        paymentCard.notes = e;
        paymentCash.notes = e;
        paymentCheck.notes = e;
    };
    const paymentCashHandler = (e) => {
        paymentCash.tenders = e;
        setAmount(e);
        navigate(
            "/checkout/" +
                code.pathname.split("/")[2] +
                "#" +
                Math.floor(Math.random() * 9999)
        );
    };

    const paymentCheckHandler = (e) => {
        paymentCheck.check_info = e;
    };

    function updateSeats() {
        axios
            .post("/api/update_seats/", {
                code: code.pathname.split("/")[2],
                newSeat: CartData.data[1],
                additional: props.grandTotal,
            })
            .then((res) => {
                window.location.href = "/order_complete";
                Swal.close();
            });
    }

    async function checkPayment(status) {
        const res = await axios.post("/api/check_payment", {
            type: "upgrade",
            code: code.pathname.split("/")[2],
        });
        //if 0, already paid
        if (res.data.status === "not exist") {
        } else if (res.data.status === "loading") {
            Swal.fire({
                title: "Loading Payment Confirmation...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
        } else if (res.data.status === "done") {
            updateSeats();
        }
    }

    console.log(CartData.data[1]);
    const submitPayment = (e) => {
        e.preventDefault();
        setDisabled(true);
        Swal.fire({
            title: "Loading Payment Confirmation...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        if (method === "credits") {
            setDisabled(false);
            axios
                .post("/api/m2_reader_response", {
                    newSeat: CartData.data[1],
                    data: paymentCard,
                    type: "upgrade",
                    code: code.pathname.split("/")[2],
                })
                .then((res) => {
                    checkPayment(res.data.status);
                });
        } else if (method === "cash") {
            axios
                .post("/api/send_place_orders", {
                    data: paymentCard,
                    discount: discount,
                })
                .then((res) => {
                    if (res.data.status === "success") {
                        axios
                            .post("/send_reservation", {
                                data: paymentCard,
                            })
                            .then((res) => {
                                console.log("res", paymentCard);
                                window.location.href = "/order_complete";
                            });
                    }
                });
        } else {
            axios
                .post("/api/send_place_orders", {
                    data: paymentCard,
                    discount: discount,
                })
                .then((res) => {
                    console.log(paymentCheck);
                    if (res.data.status === "success") {
                        axios
                            .post("/send_reservation", {
                                data: paymentCard,
                            })
                            .then((res) => {
                                console.log("res", paymentCard);
                                window.location.href = "/order_complete";
                            });
                    }
                });
        }
    };
    return (
        <form onSubmit={submitPayment}>
            <div className="row">
                <div className="p-0 col-md-2">Select Payment Method:</div>
                <div className="p-0 col-md-2">
                    <div className="form-check">
                        <input
                            checked={method === "credits"}
                            className="form-check-input"
                            type="radio"
                            value="credits"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            onChange={() => changeHandler("credits")}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                        >
                            Credit Card
                        </label>
                    </div>
                </div>
                <div className="p-0 col-md-1 mb-3">
                    <div className="form-check">
                        <input
                            checked={method === "cash"}
                            className="form-check-input"
                            type="radio"
                            value="cash"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            onChange={() => changeHandler("cash")}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                        >
                            Cash
                        </label>
                    </div>
                </div>
                <div className="p-0 col-md-1">
                    <div className="form-check">
                        <input
                            checked={method === "check"}
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            value="check"
                            onChange={() => changeHandler("check")}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                        >
                            Check
                        </label>
                    </div>
                </div>
                {method === "cash" ? (
                    <div className="p-0 col-md-6">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    Tenders:
                                </span>
                            </div>
                            <div className="input-group-append">
                                <span className="input-group-text">$</span>
                            </div>
                            <input
                                type="number"
                                defaultValue={paymentCash.tenders}
                                className="form-control"
                                onChange={(e) =>
                                    paymentCashHandler(e.target.value)
                                }
                            />
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    Change:
                                </span>
                            </div>
                            <div className="input-group-append">
                                <span className="input-group-text">$</span>
                            </div>
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    {amount - props.grandTotal < 0
                                        ? 0
                                        : amount - props.grandTotal}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : method === "check" ? (
                    <div className="p-0 col-md-6">
                        <div className="input-group">
                            <span
                                className="input-group-text"
                                id="basic-addon1"
                            >
                                Check Info:
                            </span>
                            <input
                                defaultValue={paymentCheck.check_info}
                                onChange={(e) =>
                                    paymentCheckHandler(e.target.value)
                                }
                                type="text"
                                className="form-control"
                                aria-describedby="basic-addon1"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="p-0 col-md-6"></div>
                )}
                <div className=" mt-3 col-md-12"></div>
                <div className="col-md-4">
                    Fullname
                    <input
                        onChange={(e) => nameHandler(e.target.value)}
                        className="form-control"
                        type="text"
                        placeholder="First and Last Name"
                    />
                </div>
                <div className="col-md-4">
                    Email
                    <input
                        onChange={(e) => emailHandler(e.target.value)}
                        className="form-control"
                        type="email"
                        placeholder="Email Address"
                    />
                </div>
                <div className="col-md-4">
                    How did you hear about this event?
                    <select
                        className="form-control"
                        onInput={(e) => whereHandler(e.target.value)}
                    >
                        <option disabled>Select...</option>
                        <option value="Previous Attendee">
                            Previous Attendee
                        </option>
                        <option value="Friends/Words of mount">
                            Friends/Words of mount
                        </option>
                        <option value="Facebook">Facebook</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Tweeter">Tweeter</option>
                        <option value="Email">Email</option>
                        <option value="Flyers/Signage">Flyers/Signage</option>
                        <option value="Radio">Radio</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="col-md-12  mt-4 ">
                    Order Notes
                    <textarea
                        onChange={(e) => notesHandler(e.target.value)}
                        placeholder="Order Notes"
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                    ></textarea>
                </div>
                <div className="col-md-3  offset-md-5 mt-4 mb-5">
                    <input
                        disabled={disable}
                        type="submit"
                        value="Place Order"
                        className="btn btn-primary btn-lg"
                    />
                </div>
            </div>
        </form>
    );
}

export default UpgradePaymentMethods;
