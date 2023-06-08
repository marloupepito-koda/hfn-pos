import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function SearchTicketTable(props) {
    const navigate = useNavigate();
    function upgradeHandler(code) {
        window.location.href = "/upgrade/" + code;
    }
    function releaseHandler(productid, code) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                allowOutsideClick: false,
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, release it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios
                        .get("/api/release_ticket/" + productid + "/" + code)
                        .then((res) => {
                            console.log(res.data.status);
                            Swal.fire({
                                allowOutsideClick: false,
                                icon: "success",
                                title: "Your work has been saved",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        });
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    Swal.fire({
                        allowOutsideClick: false,
                        icon: "error",
                        title: "Cancelled!",
                        text: "Releasing work has been cancelled!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    }

    async function clickRedeem(e, code) {
        await axios
            .post("/api/redeem_ticket", {
                data: e,
            })
            .then((res) => {
                if (res.data.status.cart_ticket_codes === null) {
                    axios
                        .post("/api/accept_redeem", {
                            cart_ordered_product_id: e,
                            status: 1,
                        })
                        .then((res) => {
                            navigate("?" + code + "#" + Math.random());
                            Swal.fire({
                                allowOutsideClick: false,
                                icon: "success",
                                title: "Ticket Redeemed",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        });
                } else if (res.data.status.cart_ticket_codes.status === 0) {
                    axios
                        .post("/api/accept_redeem", {
                            cart_ordered_product_id: e,
                            status: 1,
                        })
                        .then((res) => {
                            navigate("?" + code + "#" + Math.random());
                            Swal.fire({
                                allowOutsideClick: false,
                                icon: "success",
                                title: "Ticket Redeemed",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        });
                } else {
                    Swal.fire({
                        allowOutsideClick: false,
                        icon: "error",
                        title: "Ticket already Redeemed",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    }
    return (
        <div style={{ overflowX: "scroll" }}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Order</th>
                        <th scope="col">NameTicket</th>
                        <th scope="col">Code</th>
                        <th scope="col">Redeem</th>
                        <th scope="col">Upgrade</th>
                        <th scope="col">Release</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((res) => (
                        <tr key={res.cart_order_id}>
                            <th scope="row">{res.cart_order_id}</th>
                            <td>
                                {res.cart_product_id === parseInt("1")
                                    ? "General Admission No Seat"
                                    : res.cart_products.product_name}
                            </td>
                            <td>{res.code}</td>

                            <td>
                                {res.cart_ticket_codes.status === 1 ? (
                                    <button className="btn btn-warning btn-sm">
                                        Redeemed
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            clickRedeem(
                                                res.cart_ordered_product_id,
                                                res.code
                                            )
                                        }
                                        className="btn btn-success btn-sm"
                                    >
                                        Redeem
                                    </button>
                                )}
                            </td>
                            <td>
                                <button
                                    onClick={() => upgradeHandler(res.code)}
                                    type="button"
                                    className="btn btn-success btn-sm"
                                >
                                    Upgrade
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() =>
                                        releaseHandler(
                                            res.cart_product_id,
                                            res.code
                                        )
                                    }
                                    type="button"
                                    className="btn btn-success btn-sm"
                                >
                                    Release
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SearchTicketTable;
