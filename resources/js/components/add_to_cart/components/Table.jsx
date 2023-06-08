import React, { useState, useEffect } from "react";
import CartData from "../CartData";
import { useLocation, useOutletContext, useParams } from "react-router-dom";

function AddToCartTable() {
    const [count, setCount] = useOutletContext();
    const location = useLocation().hash;
    const [data, setData] = useState([]);
    const { code } = useParams();
    useEffect(() => {
        const value =
            code === undefined ? CartData.data : CartData.data.slice(0, 2);
        setData(value);
    }, [location + count]);

    function deleteSeats(e) {
        const index = data.findIndex(
            (res) => res.cart_product_id === e.cart_product_id
        );
        data.splice(index, 1);
        navigate("#" + Math.floor(Math.random() * 9999));
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
                                  <td>{res.product_name}</td>
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
                                      <a
                                          href="#"
                                          onClick={() => deleteSeats(res)}
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
                                      </a>
                                  </td>
                              </tr>
                          ))}
                </tbody>
            </table>
        </div>
    );
}

export default AddToCartTable;
