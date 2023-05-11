import React, { useState, useEffect } from "react";

function SearchTicketTable(props) {
    console.log("props", props.data);
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Order</th>
                    <th scope="col">NameTicket</th>
                    <th scope="col">Code</th>
                    <th scope="col">Upgrade</th>
                    <th scope="col">Release</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((res) => (
                    <tr>
                        <th scope="row">{res.cart_order_id}</th>
                        <td>
                            {res.cart_product_id === 0
                                ? "General Admission No Seat"
                                : ""}
                        </td>
                        <td>{res.code}</td>
                        <td>
                            <button type="button" className="btn btn-success">
                                Upgrade
                            </button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-success">
                                Release
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default SearchTicketTable;
