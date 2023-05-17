import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
function OrderedComplete() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("/api/get_order_complete").then((res) => {
            setData(res.data.status);
            console.log(res.data.status);
        });
    }, []);

    async function clickRedeem(e) {
        await axios
            .post("/api/redeem_ticket", {
                data: e,
            })
            .then((res) => {
                console.log(res.data.status);
                if (res.data.status.cart_ticket_codes.status === 0) {
                    axios
                        .post("/api/accept_redeem", {
                            cart_ordered_product_id: e,
                            status: 1,
                        })
                        .then((res) => {
                            Swal.fire({
                                allowOutsideClick: false,
                                icon: "success",
                                title: "Ticket Redeemed",
                                showConfirmButton: false,
                                timer: 3000,
                            });
                        });
                } else {
                    Swal.fire({
                        allowOutsideClick: false,
                        icon: "error",
                        title: "Ticket already Redeemed",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                }
            });
    }
    return (
        <div className="container mt-5 pt-5">
            <div className="row">
                <div className="col-md-12"></div>
                <div className="col-md-12">
                    <h3>Order Complete</h3>
                    Thank you for purchasing your ticket(s) for Hollywood Fight
                    Nights
                </div>
                <div className="col-md-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Tickets</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        {data !== undefined
                            ? data.map((res) => (
                                  <tbody key={res.cart_product_id}>
                                      {res.cart_products === null ? (
                                          <tr>
                                              <th scope="row">No Seats</th>
                                              <td>
                                                  {res.cart_ticket_codes.code}
                                              </td>
                                              <td>{res.price}</td>
                                              <td>{res.quantity}</td>
                                              <td>{res.price}</td>
                                              <td>
                                                  <button
                                                      onClick={() =>
                                                          clickRedeem(
                                                              res.cart_ordered_product_id
                                                          )
                                                      }
                                                      className="btn btn-success btn-sm"
                                                  >
                                                      Redeem
                                                  </button>
                                              </td>
                                          </tr>
                                      ) : (
                                          <tr>
                                              <th scope="row">
                                                  {
                                                      res.cart_products
                                                          .product_name
                                                  }
                                              </th>
                                              <td>{res.code}</td>
                                              <td>{res.price}</td>
                                              <td>{res.quantity}</td>
                                              <td>{res.price}</td>
                                              <td>
                                                  <button
                                                      onClick={() =>
                                                          clickRedeem(
                                                              res.cart_ordered_product_id
                                                          )
                                                      }
                                                      className="btn btn-success btn-sm"
                                                  >
                                                      Redeem
                                                  </button>
                                              </td>
                                          </tr>
                                      )}
                                  </tbody>
                              ))
                            : ""}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderedComplete;
