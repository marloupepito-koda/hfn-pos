import React, { useState, useEffect } from "react";
import {
    useNavigate,
    useOutletContext,
    useParams,
    useLocation,
} from "react-router-dom";
import AddToCartTable from "./Table";
import CartData from "../CartData";
import axios from "axios";
import moment from "moment";
import PaymentChange from "../Change";
function AddToCartNoSeats() {
    const rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const [quantity, setQuantity] = useState(0);
    const [quantity1, setQuantity1] = useState(1);
    const [count, setCount] = useOutletContext();
    const [disable, setDisabled] = useState(true);
    const [subtotal, setSubtotal] = useState(0);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { code } = useParams();
    const [type, setType] = useState();

    const goToCheckOut = () => {
        if (code === undefined) {
            axios
                .post("/create_checkout", {
                    data: CartData.data,
                    date: moment().format("LLL"),
                })
                .then((res) => {
                    console.log(res.data.status);
                    navigate("/checkout#" + Math.floor(Math.random() * 9999));
                });
        } else {
            navigate(
                "/checkout/" + code + "#" + Math.floor(Math.random() * 9999)
            );
        }
    };

    useEffect(() => {
        setType(pathname.split("/")[1]);
        if (CartData.data.length === 0) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }

        setSubtotal(
            CartData.data
                .map((res) =>
                    res.cart_product_id === "no seats"
                        ? res.price_list * quantity1
                        : res.price_list
                )
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                )
        );
        function searchNoseats(array, property, value) {
            return array.find((item) => item[property] === value);
        }
        const searchedObject = searchNoseats(
            CartData.data,
            "cart_product_id",
            "no seats"
        );
        if (searchedObject !== undefined) {
            setQuantity(searchedObject.quantity);
        }
    }, [CartData.data.length + quantity1 + quantity]);

    const addNoSeats = (e) => {
        setQuantity(e);
        const data = {
            cart_product_id: "no seats",
            product_name: "General Admission No Seat",
            price_list: 60,
            price_fee: 7.5,
            quantity: e,
        };
        if (quantity === 0) {
            if (subtotal == 0) {
                PaymentChange.data = e * 60;
                setSubtotal(e * 60);
            } else {
                PaymentChange.data = PaymentChange.data + e * 60;
            }
        } else {
            PaymentChange.data = subtotal;
        }

        const seatCheck = CartData.data.find(
            (obj) => obj.cart_product_id === "no seats"
        );
        if (seatCheck === undefined) {
            CartData.data.push(data);
            navigate("#" + Math.floor(Math.random() * 9999));
        } else {
            seatCheck.quantity = e;
            navigate("#" + Math.floor(Math.random() * 9999));
        }
    };
    const balance = 0;
    //     CartData.data[0] === undefined
    //         ? 0
    //         : CartData.data[1].price_list - CartData.data[0].price_list;
    //
    // if (subtotal !== 0) {
    //     PaymentChange.data = subtotal;
    // }
    return (
        <>
            <div className="card mb-5 ">
                <div className="card-header">Seats Pricing</div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card h-100 ">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            General Admission No Seat
                                        </h5>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">
                                                        General Admission No
                                                        Seat
                                                    </th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td scope="row">$ 60.00</td>
                                                    <td>
                                                        <select
                                                            className="form-select form-select-sm mb-3"
                                                            aria-label=".form-select-sm example"
                                                            onInput={(e) =>
                                                                setQuantity1(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            {rows.map((res) => (
                                                                <option
                                                                    selected={
                                                                        res ===
                                                                        quantity
                                                                            ? true
                                                                            : false
                                                                    }
                                                                    key={res}
                                                                    value={res}
                                                                >
                                                                    {res}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() =>
                                                                addNoSeats(
                                                                    quantity1
                                                                )
                                                            }
                                                            className="btn btn-sm btn-primary"
                                                        >
                                                            ADD TO CART
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="container col-md-12">
                                        {type === "upgrade" ? (
                                            <b></b>
                                        ) : (
                                            <b>SUBTOTAL: $ {subtotal}</b>
                                        )}
                                    </div>

                                    <AddToCartTable
                                        subtotal={subtotal}
                                        quantity={quantity}
                                    />

                                    <button
                                        disabled={disable}
                                        onClick={goToCheckOut}
                                        className="btn  btn-primary m-3"
                                    >
                                        CHECKOUT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </blockquote>
                </div>
            </div>
        </>
    );
}

export default AddToCartNoSeats;
