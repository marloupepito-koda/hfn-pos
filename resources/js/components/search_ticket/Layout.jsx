import React, { useState, useEffect } from "react";
import CardSearchTicket from "./components/Cards";
function SearchTicketLayout() {
    return (
        <div className="row col-md-8 offset-md-2">
            <CardSearchTicket />
        </div>
    );
}

export default SearchTicketLayout;
