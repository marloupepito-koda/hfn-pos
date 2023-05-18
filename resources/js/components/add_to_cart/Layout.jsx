import React, { useState, useEffect } from "react";
import Ring from "../content/Ring";
import AddToCartNoSeats from "./components/Cart";

function AddToCart() {
    return (
        <div className="container-fluid mt-5">
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
