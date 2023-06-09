import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CartData from "../../add_to_cart/CartData";
import PaymentChange from "../../add_to_cart/Change";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import moment from "moment";
import Swal from "sweetalert2";

function CheckoutPaymentMethods(props) {
    const [method, setMethod] = useState("credits");
    const [amount, setAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [disable, setDisabled] = useState(false);
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();
    const location = useLocation().hash;

    useEffect(() => {
        setDiscount(parseFloat(props.discount));
        console.log("discount", props.discount);
        const change =
            amount - props.grandTotal < 0 ? 0 : amount - props.grandTotal;
        PaymentChange.data = change;
        checkPayment("");
        paymentCard.grandTotal = props.grandTotal - discount;
        paymentCash.grandTotal = props.grandTotal - discount;
        paymentCheck.grandTotal = props.grandTotal - discount;

        console.log("waaa", props.grandTotal);
    }, [CartData + props.discount + amount + submit]);
    const [paymentCard, setPaymentCard] = useState({
        cart: CartData.data,
        fullname: " ",
        email: "",
        check_info: 0,
        where_find: "",
        tenders: 0,
        notes: "",
        orderDate: moment().format("LLLL"),
        grandTotal: props.grandTotal - discount,
        ticketFee: props.ticketFee,
        subTotal: props.subTotal,
        transactionFee: props.transactionFee,
    });

    const [paymentCash, setPaymentCash] = useState({
        cart: CartData.data,
        fullname: " ",
        email: "",
        tenders: 0,
        check_info: 0,
        where_find: "",
        notes: "",
        orderDate: moment().format("LLLL"),
        grandTotal: props.grandTotal - discount,
        ticketFee: props.ticketFee,
        subTotal: props.subTotal,
        transactionFee: props.transactionFee,
    });

    const [paymentCheck, setPaymentCheck] = useState({
        cart: CartData.data,
        fullname: " ",
        email: "",
        check_info: 0,
        tenders: 0,
        where_find: "",
        notes: "",
        orderDate: moment().format("LLLL"),
        grandTotal: props.grandTotal - discount,
        ticketFee: props.ticketFee,
        subTotal: props.subTotal,
        transactionFee: props.transactionFee,
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
        navigate("/checkout#" + Math.floor(Math.random() * 9999));
    };

    const paymentCheckHandler = (e) => {
        paymentCheck.check_info = e;
    };

    async function checkPayment(status) {
        const res = await axios.post("/api/check_payment");
        //if 0, already paid
        if (res.data.status === "not exist") {
        } else if (res.data.status === "loading") {
            Swal.fire({
                title: "Payment Confirmation",
                text: "Please complete transaction in m2 reader application.",
                allowOutsideClick: false,
                text: status,
                confirmButtonText: "Proceed",
                // didOpen: () => {
                //     Swal.showLoading();
                // },
            }).then((result) => {
                if (result.isConfirmed) {
                    checkPayment(
                        "Please complete transaction in m2 reader application"
                    );
                }
            });
        } else if (res.data.status === "done") {
            Swal.fire({
                title: "Payment Confirmation",

                allowOutsideClick: false,
                text: status,
                confirmButtonText: "Proceed",
            }).then((result) => {
                if (result.isConfirmed) {
                    loading();
                    axios
                        .post("/send_reservation", {
                            data: paymentCard,
                        })
                        .then((res) => {});
                    axios
                        .post("/api/send_place_orders", {
                            data: paymentCard,
                            discount: discount,
                        })
                        .then((res) => {
                            window.location.href = "/order_complete";
                            Swal.close();
                        });
                }
            });
        }
    }
    window.location.href = "/order_complete";
    function loading() {
        Swal.fire({
            title: "Loading Payment Confirmation...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
    }
    const submitPayment = (e) => {
        e.preventDefault();
        // setDisabled(true);
        console.log(paymentCard);
        if (method === "credits") {
            setDisabled(false);
            axios
                .post("/api/m2_reader_response", {
                    data: paymentCard,
                })
                .then((res) => {
                    checkPayment("Please Check m2 reader application.");
                });
        } else if (method === "cash") {
            loading();
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
            loading();
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
                        required
                        className="form-control"
                        type="text"
                        placeholder="First and Last Name"
                    />
                </div>
                <div className="col-md-4">
                    Email
                    <input
                        required
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

export default CheckoutPaymentMethods;
