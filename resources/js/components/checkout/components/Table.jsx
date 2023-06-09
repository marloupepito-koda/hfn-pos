import React, { useState, useEffect } from "react";
import CartData from "../../add_to_cart/CartData";
import PaymentChange from "../../add_to_cart/Change";
import {
    useLocation,
    useOutletContext,
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";
import CheckoutPaymentMethods from "./PaymentMethod";
import axios from "axios";
function CheckoutTable() {
    const location = useLocation().hash;
    const [addCart, setAddCart] = useState([]);
    const [inputValue, setInputValue] = useState(0);
    const [count, setCount] = useOutletContext();
    const { code } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        console.log(addCart);
        if (code === undefined) {
            setAddCart(CartData.data);
            if (CartData.data.length === 0) {
                navigate("/");
            }
        } else {
            setAddCart(CartData.data);
            if (CartData.data.length === 0) {
                navigate("/upgrade/" + code);
            }
        }
    }, [count + location]);

    const sub = CartData.data.reduce((accumulator, currentValue) => {
        return (
            accumulator +
            currentValue.price_list * parseInt(currentValue.quantity)
        );
    }, 0);

    const ticketFee = CartData.data.reduce((accumulator, currentValue) => {
        return (
            accumulator +
            currentValue.price_fee * parseInt(currentValue.quantity)
        );
    }, 0);
    const subTotal = sub + ticketFee;
    const grandTotal = sub + ticketFee + 0.3;
    function removeItem(event) {
        const index = CartData.data.findIndex(
            (res) => res.cart_product_id === event
        );
        const deleted = CartData.data.splice(index, 1);
        if (deleted) {
            axios
                .post("/api/remove_checkout", {
                    cart_product_id: event,
                    data: CartData.data,
                })
                .then((res) => {
                    if (res.data.status === "success") {
                        if (CartData.data.length === 0) {
                            axios.post("/api/end_session").then((res) => {
                                window.location.href = "/";
                            });
                        } else {
                            navigate("#" + Math.floor(Math.random() * 9999));
                        }
                    }
                });
        }
    }
    function grandTotalHandler(totalValue) {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });
        return formatter.format(totalValue);
    }

    PaymentChange.data = grandTotalHandler(
        (grandTotal - inputValue) / (1 - 0.029)
    );
    return (
        <div>
            <br />
            <h3 className="mt-5">Order Summary</h3>
            <div style={{ overflowX: "scroll" }}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Fee</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addCart.map((res) => (
                            <tr key={res.cart_product_id}>
                                <th scope="row">
                                    {res.product_name}{" "}
                                    {res.product_name ===
                                    "General Admission No Seat"
                                        ? ""
                                        : "Section " + res.venue_section}
                                    {res.product_name ===
                                    "General Admission No Seat"
                                        ? ""
                                        : ", Row " + res.venue_row}
                                    {res.product_name ===
                                    "General Admission No Seat"
                                        ? ""
                                        : ", Seat " + res.venue_seat}
                                </th>
                                <td>{grandTotalHandler(res.price_list)}</td>
                                <td>{grandTotalHandler(res.price_fee)}</td>
                                <td>{res.quantity}</td>
                                <td>
                                    {grandTotalHandler(
                                        res.price_list * res.quantity +
                                            res.quantity * res.price_fee
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            removeItem(res.cart_product_id)
                                        }
                                        className="btn btn-sm btn-danger"
                                    >
                                        remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="col-md-4 offset-md-8">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td scope="row">Sub Total:</td>
                            <th>{grandTotalHandler(grandTotal)}</th>
                        </tr>
                        <tr>
                            <td scope="row">Ticket Fee:</td>
                            <th>{grandTotalHandler(ticketFee)}</th>
                        </tr>
                        <tr>
                            <td scope="row">Transaction Fee:</td>
                            <th>
                                {grandTotalHandler(
                                    grandTotal / (1 - 0.029) - subTotal
                                )}
                            </th>
                        </tr>
                        <tr>
                            <td scope="row">Discount:</td>
                            <th>
                                <input
                                    onChange={(e) =>
                                        setInputValue(e.target.value)
                                    }
                                    className="form-control"
                                />
                            </th>
                        </tr>
                        <tr>
                            <td scope="row">Grand Total:</td>
                            <th>
                                {grandTotalHandler(
                                    (grandTotal - inputValue + ticketFee) /
                                        (1 - 0.029)
                                )}
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
            <Link to="/" className="btn btn-dark col-md-3 mb-3">
                BACK TO CART
            </Link>
            <CheckoutPaymentMethods
                cartData={addCart}
                subTotal={subTotal}
                ticketFee={ticketFee}
                grandTotal={(grandTotal - inputValue + ticketFee) / (1 - 0.029)}
                discount={inputValue}
            />
        </div>
    );
}

export default CheckoutTable;
