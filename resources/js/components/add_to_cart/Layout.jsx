import React, { useState, useEffect } from "react";
import Ring from "../content/Ring";
import AddToCartNoSeats from "./components/Cart";

function AddToCart() {
    return (
        <div>
            <div className="row col-md-8 offset-md-2">
                <AddToCartNoSeats />
                <Ring />
            </div>
        </div>
    );
}

export default AddToCart;
