import React, { useState, useEffect } from "react";
import AddToCartNoSeats from "../add_to_cart/components/Cart";
import Modal from "./components/Modal";
import { useNavigate } from "react-router-dom";
import CartData from "../add_to_cart/CartData";
function IndexLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const [section, setSection] = useState(null);
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(1);
    const navigate = useNavigate();
    const openModal = (e, act) => {
        setIsOpen(true);
        setLoading(true);
        axios.get("/api/get_seats").then((res) => {
            setLoading(false);
            setSection(e);
            const sectionA = [6001, 6321];
            const sectionB = [6321, 6681];
            const sectionC = [6681, 7041];
            const sectionD = [7041, 7217];
            const extension = [7217, 7257];
            const extension2 = [7258, 7260];
            const selected =
                e === "A"
                    ? sectionA
                    : e === "B"
                    ? sectionB
                    : e === "C"
                    ? sectionC
                    : sectionD;

            const ext = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id >= extension[0] &&
                    obj.cart_product_id < extension[1] &&
                    obj.quantity === act
            );
            const ext1 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id >= extension2[0] &&
                    obj.cart_product_id < extension2[1] &&
                    obj.quantity === act
            );

            const seatData = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id >= selected[0] &&
                    obj.cart_product_id < selected[1] &&
                    obj.quantity === act
            );
            console.log(ext1.concat(seatData));
            const value =
                e === "B"
                    ? ext.concat(seatData)
                    : e === "D"
                    ? ext1.concat(seatData)
                    : seatData;
            setSeats(value);

            // console.log("BB", seatData);
        });
    };

    useEffect(() => {
        setLoading(false);
    }, []);
    const addCartSeat = (e) => {
        const seatCheck = CartData.data.find(
            (obj) => obj.cart_product_id === e.cart_product_id
        );
        if (seatCheck === undefined && e.quantity === 1) {
            CartData.data.push(e);
            navigate("#" + Math.floor(Math.random() * 9999));
        } else {
            const index = CartData.data.findIndex(
                (res) => res.cart_product_id === e.cart_product_id
            );
            CartData.data.splice(index, 1);
            navigate("#" + Math.floor(Math.random() * 9999));
        }
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    function setActiveHandler(e, section) {
        setActive(e);
        openModal(section, e);
    }
    return (
        <div style={{ marginTop: "100px" }}>
            {/* <Modal isOpen={isOpen} onClose={closeModal}> */}

            {/* </Modal> */}
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-6" style={{ marginTop: 15 }}>
                            <div className="m-3 mt-5">
                                <button
                                    type="button"
                                    className="w-100 p-4 btn btn-dark h-100"
                                    onClick={() => openModal("A", active)}
                                >
                                    <h3 className="text-white">Section A</h3>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ marginTop: 15 }}>
                            <div className="m-3 mt-5">
                                <button
                                    type="button"
                                    className="w-100 p-4 btn btn-dark h-100"
                                    onClick={() => openModal("B", active)}
                                >
                                    <h3 className="text-white">Section B</h3>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ marginTop: 15 }}>
                            <div className="m-3 mt-5">
                                <button
                                    type="button"
                                    className="w-100 p-4 btn btn-dark h-100"
                                    onClick={() => openModal("C", active)}
                                >
                                    <h3 className="text-white">Section C</h3>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ marginTop: 15 }}>
                            <div className="m-3 mt-5">
                                <button
                                    type="button"
                                    className="w-100 p-4 btn btn-dark h-100"
                                    onClick={() => openModal("D", active)}
                                >
                                    <h3 className="text-white">Section D</h3>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-12" style={{ marginTop: 15 }}>
                            <div style={{ marginBottom: 100 }}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div
                                                className="overflow-auto"
                                                style={{ height: "600px" }}
                                            >
                                                <h3>Section {section}</h3>
                                                <ul class="nav nav-pills">
                                                    <li class="nav-item">
                                                        <a
                                                            onClick={() =>
                                                                setActiveHandler(
                                                                    1,
                                                                    section
                                                                )
                                                            }
                                                            class={
                                                                active === 1
                                                                    ? "nav-link active"
                                                                    : "nav-link"
                                                            }
                                                            aria-current="page"
                                                            href="#"
                                                        >
                                                            Remaining
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a
                                                            onClick={() =>
                                                                setActiveHandler(
                                                                    0,
                                                                    section
                                                                )
                                                            }
                                                            class={
                                                                active === 0
                                                                    ? "nav-link active"
                                                                    : "nav-link"
                                                            }
                                                            href="#"
                                                        >
                                                            Sold Out
                                                        </a>
                                                    </li>
                                                </ul>
                                                {loading ? (
                                                    <center>
                                                        <div class="spinner-border text-dark mt-5"></div>
                                                    </center>
                                                ) : (
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">
                                                                    Product Name
                                                                </th>
                                                                <th scope="col">
                                                                    Rows
                                                                </th>
                                                                <th scope="col">
                                                                    Seats
                                                                </th>
                                                                <th scope="col">
                                                                    Prices
                                                                </th>
                                                                <th scope="col">
                                                                    Add
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody
                                                            style={{
                                                                height: "300px",
                                                                overflowY:
                                                                    "scroll",
                                                            }}
                                                        >
                                                            {seats.map(
                                                                (
                                                                    res,
                                                                    index
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <td>
                                                                            {
                                                                                res.product_name
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            Row{" "}
                                                                            {
                                                                                res.venue_row
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            Seat{" "}
                                                                            {
                                                                                res.venue_seat
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            ${" "}
                                                                            {
                                                                                res.price_sale
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {res.quantity ===
                                                                                1 &&
                                                                            CartData.data.find(
                                                                                (
                                                                                    obj
                                                                                ) =>
                                                                                    obj.cart_product_id ===
                                                                                    res.cart_product_id
                                                                            ) ===
                                                                                undefined ? (
                                                                                <span
                                                                                    onClick={() =>
                                                                                        addCartSeat(
                                                                                            res
                                                                                        )
                                                                                    }
                                                                                    className="btn btn-success btn-sm w-100 "
                                                                                >
                                                                                    Add
                                                                                    To
                                                                                    Cart
                                                                                </span>
                                                                            ) : res.quantity ===
                                                                              0 ? (
                                                                                <span className="btn btn-danger btn-sm w-100 ">
                                                                                    Sold
                                                                                    Out
                                                                                </span>
                                                                            ) : (
                                                                                <span
                                                                                    onClick={() =>
                                                                                        addCartSeat(
                                                                                            res
                                                                                        )
                                                                                    }
                                                                                    className="btn btn-warning btn-sm w-100 "
                                                                                >
                                                                                    Selected
                                                                                </span>
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <AddToCartNoSeats />
                </div>
            </div>
        </div>
    );
}

export default IndexLayout;
