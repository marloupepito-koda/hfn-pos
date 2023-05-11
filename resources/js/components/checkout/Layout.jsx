import React, { useState, useEffect } from "react";
import CheckoutTable from "./components/Table";

function CheckoutLayout() {
    return (
        <div className="row col-md-8 offset-md-2">
            <CheckoutTable />
        </div>
    );
}

export default CheckoutLayout;
