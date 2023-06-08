import React, { useState, useEffect } from "react";
import CartData from "../../add_to_cart/CartData";
import {
    useLocation,
    useOutletContext,
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import UpgradePaymentMethods from "./UpgradePaymentMethods";
function UpgradeTable() {
    const location = useLocation().hash;
    const [addCart, setAddCart] = useState([]);
    const [inputValue, setInputValue] = useState("0.00");
    const [count, setCount] = useOutletContext();
    const { code } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        setAddCart(CartData.data);
    }, [count + location]);

    const additional = CartData.data.reduce((accumulator, currentValue) => {
        return currentValue.price_list - accumulator;
    }, 0);
    function updateSeats() {
        Swal.fire({
            title: "Loading...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios
            .post("/api/update_seats/", {
                code: code,
                newSeat: addCart[1],
                additional: additional,
            })
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                });
                window.location.href = "/";
            });
    }

    const where = ["From", "To"];
    function isNegative(number) {
        if (number < 0) {
            return true;
        } else {
            return false;
        }
    }

    function grandTotalHandler(totalValue) {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });
        return formatter.format(totalValue);
    }

    return (
        <div className="container">
            <div className=" col-md-12">
                <br />
                <br />
                <h3 className="mt-5">Order Summary</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            {/* <th scope="col">Fee</th> */}
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addCart.map((res, index) => (
                            <tr key={res.cart_product_id}>
                                <th>{where[index]}:</th>
                                <th scope="row">
                                    {res.product_name}{" "}
                                    {res.product_name === "No Seating"
                                        ? ""
                                        : "Section " + res.venue_section_id ===
                                          1
                                        ? "A"
                                        : res.venue_section_id === 2
                                        ? "Section B"
                                        : res.venue_section_id === 3
                                        ? "Section C"
                                        : res.venue_section_id === 4
                                        ? "Section D, "
                                        : ""}
                                    {res.product_name !== "No Seating"
                                        ? "Row " +
                                          res.venue_row +
                                          ", Seat " +
                                          res.venue_seat
                                        : ""}
                                </th>
                                <td>{res.price_list}</td>
                                {/* <td>{res.price_fee}</td> */}
                                <td>{res.quantity}</td>
                                <td>
                                    {res.price_fee +
                                        res.price_list * res.quantity}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="col-md-4 offset-md-8">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td scope="row">Additional Payment:</td>
                                <th>${additional}</th>
                            </tr>
                            <tr>
                                <td scope="row">Ticket Fee:</td>
                                <th>$ 7.50</th>
                            </tr>
                            <tr>
                                <td scope="row">Grand Total:</td>
                                <th>{additional + 7.5}</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <Link
                    to={"/upgrade/" + code}
                    className="btn btn-dark col-md-3 mb-3"
                >
                    BACK TO CART
                </Link>
                {/* <button
                    onClick={updateSeats}
                    disabled={
                        addCart.length === 1 ||
                        addCart.length === 0 ||
                        isNegative(additional) === true
                            ? true
                            : false
                    }
                    className="btn btn-dark col-md-3 mb-3 offset-md-6"
                >
                    Upgrade
                </button> */}
                <UpgradePaymentMethods
                    cartData={addCart}
                    subTotal={additional}
                    ticketFee={7.5}
                    grandTotal={additional + 7.5}
                    discount={0}
                />
            </div>
        </div>
    );
}

export default UpgradeTable;
