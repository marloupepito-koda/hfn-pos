import React, { useState, useEffect } from "react";
import Ring from "../content/Ring";
import AddToCartNoSeats from "./components/Cart";

function AddToCart() {
    return (
        <div className="m-3 mt-5">
            <br />
            <br />
            <div className="row">
                <div className="col-md-7">
                    <Ring />
                </div>
                <div className="col-md-5">
                    <AddToCartNoSeats />
                </div>
            </div>
        </div>
    );
}

export default AddToCart;
