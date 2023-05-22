import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import AddToCartTable from "./Table";
import CartData from "../CartData";
import axios from "axios";
import moment from "moment";
function AddToCartNoSeats() {
    const rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const [quantity, setQuantity] = useState(0);
    const [count, setCount] = useOutletContext();
    const [disable, setDisabled] = useState(true);
    const navigate = useNavigate();
    const { code } = useParams();
    const goToCheckOut = () => {
        if (code === undefined) {
            axios
                .post("/create_checkout", {
                    data: CartData.data,
                    date: moment().format("LLL"),
                })
                .then((res) => {
                    navigate("/checkout#" + Math.floor(Math.random() * 9999));
                });
        } else {
            navigate(
                "/checkout/" + code + "#" + Math.floor(Math.random() * 9999)
            );
        }
    };

    useEffect(() => {
        if (CartData.data.length === 0) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [CartData.data.length]);

    const addNoSeats = (e) => {
        const data = {
            cart_product_id: "no seats",
            product_name: "General Admission No Seat",
            price_list: 60,
            price_fee: 7.5,
            quantity: quantity,
        };
        const seatCheck = CartData.data.find(
            (obj) => obj.cart_product_id === "no seats"
        );
        // console.log(e.quantity);
        if (seatCheck === undefined) {
            CartData.data.push(data);
            navigate("#" + Math.floor(Math.random() * 9999));
        } else {
            seatCheck.quantity = quantity;
            navigate("#" + Math.floor(Math.random() * 9999));
        }
    };
    return (
        <>
            <div className="card mb-5 mt-5">
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
                                                                setQuantity(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            {rows.map((res) => (
                                                                <option
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
                                                            onClick={addNoSeats}
                                                            className="btn btn-sm btn-primary"
                                                        >
                                                            ADD TO CART
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <AddToCartTable />

                                    <button
                                        disabled={disable}
                                        onClick={goToCheckOut}
                                        className="btn  btn-primary m-3"
                                    >
                                        CHECKOUT
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-12 mt-5">
                                <div
                                    className="card "
                                    style={{ backgroundColor: "#d9d9d9" }}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">Legend</h5>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">
                                                        Seat Type
                                                    </th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Color</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td scope="row">
                                                        VIP Ringside
                                                    </td>
                                                    <td>$ 200-$ 150</td>
                                                    <td>
                                                        <div
                                                            className="card "
                                                            style={{
                                                                backgroundColor:
                                                                    " #a800ff",
                                                            }}
                                                        >
                                                            &nbsp;
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        Preferred Seating
                                                    </th>
                                                    <td>$ 100</td>
                                                    <td>
                                                        <div
                                                            className="card "
                                                            style={{
                                                                backgroundColor:
                                                                    "#0e7a00",
                                                            }}
                                                        >
                                                            &nbsp;
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        General Admission
                                                        Seating
                                                    </th>
                                                    <td>$ 80</td>
                                                    <td>
                                                        <div
                                                            className="card "
                                                            style={{
                                                                backgroundColor:
                                                                    "#fdb100",
                                                            }}
                                                        >
                                                            &nbsp;
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        General Admission No
                                                        Seat
                                                    </th>
                                                    <td>$ 60</td>
                                                    <td>
                                                        <div
                                                            className="card "
                                                            style={{
                                                                backgroundColor:
                                                                    "white",
                                                            }}
                                                        >
                                                            &nbsp;
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
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
