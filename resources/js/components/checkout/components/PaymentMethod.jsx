import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CartData from "../../add_to_cart/CartData";
function CheckoutPaymentMethods(props) {
    const [method, setMethod] = useState("credits");
    const [amount, setAmount] = useState(0);
    const [disable, setDisabled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation().hash;
    const [paymentCard, setPaymentCard] = useState({
        cart: CartData.data,
        fullname: "",
        email: "",
        where_find: "",
        notes: "",
        grandTotal: props.grandTotal,
        ticketFee: props.ticketFee,
        subTotal: props.subTotal,
        discount: props.discount,
    });
    const [paymentCash, setPaymentCash] = useState({
        cart: CartData.data,
        fullname: "",
        email: "",
        tenders: 0,
        where_find: "",
        notes: "",
        grandTotal: props.grandTotal,
        ticketFee: props.ticketFee,
        subTotal: props.subTotal,
        discount: props.discount,
    });

    const [paymentCheck, setPaymentCheck] = useState({
        cart: CartData.data,
        fullname: "",
        email: "",
        check_info: "",
        where_find: "",
        notes: "",
        grandTotal: props.grandTotal,
        ticketFee: props.ticketFee,
        subTotal: props.subTotal,
        discount: props.discount,
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
    };

    const paymentCheckHandler = (e) => {
        paymentCheck.check_info = e;
    };

    const submitPayment = (e) => {
        e.preventDefault();
        setDisabled(true);
        if (method === "credits") {
            axios.post("/api/send_place_orders", paymentCard).then((res) => {
                if (res.data.status === "success") {
                    axios
                        .post("/send_reservation", {
                            data: paymentCard,
                        })
                        .then((res) => {
                            console.log("res", paymentCard);
                            // window.location.href = "/";
                        });
                }
            });
        } else if (method === "cash") {
            axios.post("/api/send_place_orders", paymentCash).then((res) => {
                console.log(paymentCash);
                if (res.data.status === "success") {
                    window.location.href = "/";
                }
            });
        } else {
            axios.post("/api/send_place_orders", paymentCheck).then((res) => {
                console.log(paymentCheck);
                if (res.data.status === "success") {
                    window.location.href = "/";
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
                            for="flexRadioDefault1"
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
                            for="flexRadioDefault1"
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
                            for="flexRadioDefault1"
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
                                    {amount - props.grandTotal}
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
                        <option disabled selected>
                            Select...
                        </option>
                        <option>Previous Attendee</option>
                        <option>Friends/Words of mount</option>
                        <option>Facebook</option>
                        <option>Instagram</option>
                        <option>Tweeter</option>
                        <option>Email</option>
                        <option>Flyers/Signage</option>
                        <option>Radio</option>
                        <option>Others</option>
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

export default CheckoutPaymentMethods;
