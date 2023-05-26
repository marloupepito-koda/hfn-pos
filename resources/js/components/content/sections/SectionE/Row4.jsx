import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CartData from "../../../add_to_cart/CartData";
import Tippy from "tippy.js";

function Row4(props) {
    const [items, setItems] = useState([]);
    const myRef = useRef([]);
    const navigate = useNavigate();

    const addCartSeat = (e) => {
        const seatCheck = CartData.data.find(
            (obj) => obj.cart_product_id === e.cart_product_id
        );
        if (seatCheck === undefined && e.quantity === 1) {
            CartData.data.push(e);
            navigate("#" + Math.floor(Math.random() * 9999));
        } else {
            const index = CartData.data.findIndex(
                (res) => res.cart_product_id === e.cart_product_id
            );
            CartData.data.splice(index, 1);
            navigate("#" + Math.floor(Math.random() * 9999));
        }
    };

    function openTooltip(status, data) {
        const section =
            data.venue_section_id === 1
                ? "A"
                : data.venue_section_id === 2
                ? "B"
                : data.venue_section_id === 3
                ? "C"
                : "D";
        const row = data.venue_row;
        const seat = data.venue_seat;
        const name = data.product_name;
        const price = data.price_list;
        const dataTable =
            '<table className="table" <span style="color: aqua;"> <tbody>' +
            '<tr><th scope="row">Status</th><td>' +
            status +
            "</td> </tr>" +
            '<tr><th scope="row">Section</th><td>' +
            section +
            '</td> </tr> <tr><th scope="row">Row</th><td>' +
            row +
            '</td> </tr> <tr><th scope="row">Seat</th><td>' +
            seat +
            '</td> </tr> <tr><th scope="row">Name</th><td>' +
            name +
            '</td> </td> </tr> <tr><th scope="row">Price</th><td>' +
            price +
            "</td> </tr></tbody></table>";
        Tippy(myRef.current[data.cart_product_id], {
            content: dataTable,
            allowHTML: true,
        });
    }

    for (let i = 0; i < 26; i++) {
        const gapRow1 = 279.8 + i * 5.2 - 20.8;
        const gapRow2 = 279.7 + i * 5.2 - 20.8;
        const gapRow3 = 280.1 + i * 5.2 - 20.8;
        const gapRow4 = 281 + i * 5.2 - 20.8;
        const gapRow5 = 283.3 + i * 5.2 - 20.8;
        const gapRow6 = 284.2 + i * 5.2 - 20.8;
        const gapRow7 = 284.5 + i * 5.2 - 20.8;
        const gapRow8 = 284.1 + i * 5.2 - 20.8;
        const gapRow9 = 284.4 + i * 5.2 - 20.8;
        const gapRow10 = 284.6 + i * 5.2 - 20.8;
        const gapRow11 = 284.3 + i * 5.2 - 20.8;
        const gapRow12 = 283.8 + i * 5.2 - 20.8;
        const gapRow13 = 282.2 + i * 5.2 - 20.8;
        const gapRow14 = 280.5 + i * 5.2 - 20.8;
        const gapRow15 = 279.9 + i * 5.2 - 20.8;
        const gapRow16 = 280.2 + i * 5.2 - 20.8;
        const gapRow17 = 280.1 + i * 5.2 - 20.8;

        const gapColumn1 = 262.1 - 8 - 8 - 8;
        const gapColumn2 = 263.8 - 8 - 8 - 8;
        const gapColumn3 = 264.4 - 8 - 8 - 8;
        const gapColumn4 = 264.6 - 8 - 8 - 8;
        const gapColumn5 = 260.3 - 8 - 8 - 8;
        const gapColumn6 = 260.1 - 8 - 8 - 8;
        const gapColumn7 = 260.2 - 8 - 8 - 8;
        const gapColumn8 = 259.6 - 8 - 8 - 8;
        const gapColumn9 = 259.3 - 8 - 8 - 8;
        const gapColumn10 = 259.1 - 8 - 8 - 8;
        const gapColumn11 = 259 - 8 - 8 - 8;
        const gapColumn12 = 260.4 - 8 - 8 - 8;
        const gapColumn13 = 260.4 - 8 - 8 - 8;
        const gapColumn14 = 260.4 - 8 - 8 - 8;

        if (i !== 12 && i !== 13) {
            const aa = i < 13 ? i : i - 2;
            const seatData = props.data[aa];

            const seatColor = CartData.data.find((res) =>
                res.cart_product_id !== undefined && seatData !== undefined
                    ? res.cart_product_id === seatData.cart_product_id
                    : undefined
            );

            const taken =
                seatData !== undefined
                    ? seatData.quantity === 0
                        ? "taken"
                        : ""
                    : "";
            items.push(
                <g
                    ref={(el) =>
                        (myRef.current[
                            seatData !== undefined
                                ? seatData.cart_product_id
                                : ""
                        ] = el)
                    }
                    onMouseEnter={() =>
                        openTooltip(
                            taken !== "taken" ? "Vacant" : "Sold Out",
                            seatData
                        )
                    }
                    onMouseLeave={() =>
                        openTooltip(
                            taken !== "taken" ? "Vacant" : "Sold Out",
                            seatData
                        )
                    }
                    key={i + Math.random()}
                    onClick={() =>
                        taken === "taken" ? "" : addCartSeat(seatData)
                    }
                    id="app-title"
                    className="booth preferred-seating"
                    section="1"
                >
                    <polygon
                        value={i}
                        className={
                            seatColor === undefined
                                ? "st6 booth-fill " + taken
                                : ""
                        }
                        fill={seatColor === undefined ? "#000100" : "#ffff66"}
                        stroke="#000000"
                        strokeWidth=".5"
                        strokeMiterlimit="10"
                        points={
                            gapRow1 +
                            "," +
                            gapColumn1 +
                            " " +
                            gapRow2 +
                            "," +
                            gapColumn2 +
                            " " +
                            gapRow3 +
                            "," +
                            gapColumn3 +
                            " " +
                            gapRow4 +
                            "," +
                            gapColumn4 +
                            " " +
                            gapRow5 +
                            "," +
                            gapColumn4 +
                            " " +
                            gapRow6 +
                            "," +
                            gapColumn3 +
                            " " +
                            gapRow7 +
                            "," +
                            gapColumn2 +
                            " " +
                            gapRow7 +
                            "," +
                            gapColumn1 +
                            "   " +
                            gapRow6 +
                            "," +
                            gapColumn5 +
                            " " +
                            gapRow8 +
                            "," +
                            gapColumn6 +
                            " " +
                            gapRow9 +
                            "," +
                            gapColumn7 +
                            " " +
                            gapRow10 +
                            "," +
                            gapColumn6 +
                            " " +
                            gapRow10 +
                            "," +
                            gapColumn8 +
                            " " +
                            gapRow11 +
                            "," +
                            gapColumn9 +
                            " " +
                            gapRow12 +
                            "," +
                            gapColumn10 +
                            " " +
                            gapRow13 +
                            "," +
                            gapColumn11 +
                            " " +
                            gapRow14 +
                            "," +
                            gapColumn10 +
                            " " +
                            gapRow15 +
                            "," +
                            gapColumn9 +
                            " " +
                            gapRow2 +
                            ", " +
                            gapColumn8 +
                            " " +
                            gapRow2 +
                            "," +
                            gapColumn6 +
                            " " +
                            gapRow15 +
                            "," +
                            gapColumn7 +
                            " " +
                            gapRow16 +
                            "," +
                            gapColumn6 +
                            " " +
                            gapRow3 +
                            "," +
                            gapColumn12
                        }
                        id="polygon12149"
                    />
                </g>
            );
        }
    }
    return <>{items}</>;
}

export default Row4;
