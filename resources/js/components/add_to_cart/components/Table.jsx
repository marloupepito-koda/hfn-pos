import React, { useState, useEffect } from "react";
import CartData from "../CartData";
import PaymentChange from "../Change";
import {
    useLocation,
    useOutletContext,
    useParams,
    useNavigate,
} from "react-router-dom";

function AddToCartTable({ quantity, subtotal }) {
    const [count, setCount] = useOutletContext();
    const location = useLocation().hash;
    const current = useLocation();
    const [data, setData] = useState([]);
    const { code } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const value =
            code === undefined ? CartData.data : CartData.data.slice(0, 2);

        setData(value);
    }, [location + count + subtotal]);

    function deleteSeats(e, price) {
        const index = CartData.data.findIndex(
            (res) => res.cart_product_id === event
        );
        const deleted = CartData.data.splice(index, 1);
        PaymentChange.data = subtotal - price;
        if (deleted && current.pathname.split("/")[1] !== "upgrade") {
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
        } else {
            navigate("#" + Math.floor(Math.random() * 9999));
        }
    }
    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Section</th>
                        <th scope="col">Row</th>
                        <th scope="col">Seat</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                    {data.length === 0 || data.length === undefined
                        ? ""
                        : data.map((res) => (
                              <tr key={res.cart_product_id}>
                                  <td>
                                      {res.product_name}
                                      {res.product_name ===
                                      "General Admission No Seat"
                                          ? "(" + quantity + ")"
                                          : ""}
                                  </td>
                                  <td>
                                      {res.product_name ===
                                          "General Admission No Seat" ||
                                      res.product_name === "No Seating"
                                          ? "-"
                                          : res.venue_section_id === 1
                                          ? "Section A"
                                          : res.venue_section_id === 2
                                          ? "Section B"
                                          : res.venue_section_id === 3
                                          ? "Section C"
                                          : res.venue_section_id === 4
                                          ? "Section D"
                                          : ""}
                                  </td>
                                  <td>
                                      {res.product_name ===
                                          "General Admission No Seat" ||
                                      res.product_name === "No Seating"
                                          ? "-"
                                          : "Row " + res.venue_row}
                                  </td>
                                  <td>
                                      {res.product_name ===
                                          "General Admission No Seat" ||
                                      res.product_name === "No Seating"
                                          ? "-"
                                          : "Seat " + res.venue_seat}
                                  </td>
                                  <td>
                                      <button
                                          disabled={
                                              res.product_name === "No Seating"
                                                  ? true
                                                  : false
                                          }
                                          className="btn"
                                          href="#"
                                          onClick={() =>
                                              deleteSeats(
                                                  res,
                                                  res.product_name ===
                                                      "General Admission No Seat"
                                                      ? quantity * 60
                                                      : res.price_sale
                                              )
                                          }
                                      >
                                          <center>
                                              <i
                                                  className="fa fa-trash-o"
                                                  style={{
                                                      fontSize: "24px",
                                                      color: "red",
                                                  }}
                                              ></i>
                                          </center>
                                      </button>
                                  </td>
                              </tr>
                          ))}
                </tbody>
            </table>
        </div>
    );
}

export default AddToCartTable;
