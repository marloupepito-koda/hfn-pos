import React, { useState, useEffect } from "react";
import CardSearchTicket from "./components/Cards";
import { Link } from "react-router-dom";
function SearchTicketLayout() {
    return (
        <div className="row col-md-12" style={{ marginTop: 100 }}>
            <Link className="col-md-2  btn btn-dark" to="/order_complete">
                BACK
            </Link>
            <CardSearchTicket />
        </div>
    );
}

export default SearchTicketLayout;
