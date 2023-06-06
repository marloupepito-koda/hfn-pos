import React, { useState, useEffect } from "react";
import CheckoutTable from "./components/Table";

function CheckoutLayout() {
    return (
        <div className="container">
            <br />
            <div className="row col-md-12">
                <CheckoutTable />
            </div>
        </div>
    );
}

export default CheckoutLayout;
