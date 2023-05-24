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
    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Section</th>
                        <th scope="col">Row</th>
                        <th scope="col">Seat</th>
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
                                      Section{" "}
                                      {res.product_name === "No Seating"
                                          ? "none"
                                          : res.venue_section_id === 1
                                          ? "A"
                                          : res.venue_section_id === 2
                                          ? "B"
                                          : res.venue_section_id === 3
                                          ? "C"
                                          : "D"}
                                  </td>
                                  <td>
                                      Row{" "}
                                      {res.product_name === "No Seating"
                                          ? "none"
                                          : res.venue_row}
                                  </td>
                                  <td>
                                      Seat{" "}
                                      {res.product_name === "No Seating"
                                          ? "none"
                                          : res.venue_seat}
                                  </td>
                              </tr>
                          ))}
                </tbody>
            </table>
        </div>
    );
}

export default AddToCartTable;
