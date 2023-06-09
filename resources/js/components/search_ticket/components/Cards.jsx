import axios from "axios";
import React, { useState, useEffect } from "react";
import SearchTicketTable from "./Table";
import { useLocation, useNavigate } from "react-router-dom";
function CardSearchTicket() {
    const [searching, setSearching] = useState("");
    const [value, setValue] = useState([]);
    const [status, setStatus] = useState("");
    const { search, hash } = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (search !== "") {
            axios
                .get("/api/search_ticket_code/" + search.substring(1))
                .then((res) => {
                    setValue(res.data.status);
                    // if (res.data.status.length !== 0) {
                    //     setStatus("");
                    // } else {
                    //     setStatus("No results!");
                    // }
                    console.log(res.data.status);
                });
        }
    }, [hash]);
    const searchTicket = (e) => {
        e.preventDefault();
        setStatus("Loading...");
        axios.get("/api/search_ticket_code/" + searching).then((res) => {
            navigate("?" + searching + "#" + Math.random());
            if (res.data.status.length !== undefined) {
                setValue(res.data.status);

                if (res.data.status.length !== 0) {
                    setStatus("");
                } else {
                    setStatus("No results!");
                }
            }
        });
    };

    return (
        <>
            <div className="card mt-3">
                <div className="card-header" style={{ marginTop: 50 }}>
                    Search Tickets
                </div>
                <div className="card-body">
                    <form onSubmit={searchTicket}>
                        <div className="row">
                            <div className="col-md-4 col-12">
                                <h3>Ticket Code:</h3>
                            </div>
                            <div className="col-md-4 col-8">
                                <input
                                    onChange={(e) =>
                                        setSearching(e.target.value)
                                    }
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Search Tickets..."
                                />
                            </div>
                            <div className="col-md-4 col-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="col-md-12 mt-5">
                        {value.length !== 0 ? (
                            value.map((res) =>
                                res.cart_product_id === parseInt("7257") ? (
                                    <SearchTicketTable
                                        key={res.cart_ordered_product_id}
                                        data={value}
                                    />
                                ) : res.cart_products.quantity === 1 ? (
                                    <h3 key={res.cart_ordered_product_id}>
                                        No results!
                                    </h3>
                                ) : res.cart_ticket_codes.status === 1 ? (
                                    <h3 key={res.cart_ordered_product_id}>
                                        Ticket Redeemed
                                    </h3>
                                ) : (
                                    <SearchTicketTable
                                        key={res.cart_ordered_product_id}
                                        data={value}
                                    />
                                )
                            )
                        ) : (
                            <h3>{status}</h3>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardSearchTicket;
