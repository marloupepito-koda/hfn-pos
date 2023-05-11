import React, { useState, useEffect } from "react";
import CartData from "../../add_to_cart/CartData";
import { useLocation, useOutletContext, Link } from "react-router-dom";
import CheckoutPaymentMethods from "./PaymentMethod";
function CheckoutTable() {
    const location = useLocation().hash;
    const [addCart, setAddCart] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [count, setCount] = useOutletContext();
    useEffect(() => {
        setAddCart(CartData.data);
    }, [count]);

    const subTotal = CartData.data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price_list;
    }, 0);

    const ticketFee = CartData.data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price_fee;
    }, 0);

    const grandTotal = subTotal + ticketFee;

    function handleInput(event) {
        const formattedValue = new Intl.NumberFormat("en-US", {
            style: "decimal",
        }).format(event.target.value);

        setInputValue(formattedValue);
    }

    return (
        <>
            <h3 className="mt-5">Order Summary</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Fee</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {addCart.map((res) => (
                        <tr key={res.cart_product_id}>
                            <th scope="row">
                                {res.product_name}
                                {res.product_name ===
                                "General Admission No Seat"
                                    ? ""
                                    : "Section " + res.venue_section_id === 1
                                    ? "A"
                                    : res.venue_section_id === 2
                                    ? "B"
                                    : res.venue_section_id === 3
                                    ? "C"
                                    : res.venue_section_id === 4
                                    ? "D"
                                    : "Row " +
                                      res.venue_row +
                                      " Seats " +
                                      res.venue_seat}
                            </th>
                            <td>{res.price_list}</td>
                            <td>{res.price_fee}</td>
                            <td>{res.quantity}</td>
                            <td>
                                {res.price_fee + res.price_list * res.quantity}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="col-md-4 offset-md-8">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td scope="row">Sub Total:</td>
                            <th>${subTotal}</th>
                        </tr>
                        <tr>
                            <td scope="row">Ticket Fee:</td>
                            <th>${ticketFee}</th>
                        </tr>
                        <tr>
                            <td scope="row">Discount:</td>
                            <th>
                                <input
                                    type="number"
                                    value={inputValue}
                                    onInput={handleInput}
                                    className="form-control"
                                />
                            </th>
                        </tr>
                        <tr>
                            <td scope="row">Grand Total:</td>
                            <th>${grandTotal - inputValue}</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <Link to="/" className="btn btn-dark col-md-3 mb-3">
                BACK TO CART
            </Link>
            <CheckoutPaymentMethods
                cartData={addCart}
                subTotal={subTotal}
                ticketFee={ticketFee}
                grandTotal={grandTotal - inputValue}
                discount={parseFloat(inputValue)}
            />
        </>
    );
}

export default CheckoutTable;
