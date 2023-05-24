import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CartData from "../../../add_to_cart/CartData";
import Tippy from "tippy.js";
function Row5(props) {
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
        const gapRow1 = 396.7 + 8 * 3;
        const gapRow2 = 395.1 + 8 * 3;
        const gapRow3 = 394.5 + 8 * 3;
        const gapRow4 = 394.2 + 8 * 3;
        const gapRow5 = 394.4 + 8 * 3;
        const gapRow6 = 395 + 8 * 3;
        const gapRow7 = 398.5 + 8 * 3;
        const gapRow8 = 398.7 + 8 * 3;
        const gapRow9 = 398.6 + 8 * 3;
        const gapRow10 = 398.8 + 8 * 3;
        const gapRow11 = 399.2 + 8 * 3;
        const gapRow12 = 399.5 + 8 * 3;
        const gapRow13 = 399.7 + 8 * 3;
        const gapRow14 = 399.8 + 8 * 3;
        const gapRow15 = 399.3 + 8 * 3;
        const gapRow16 = 296.4 + 8 * 3;
        const gapRow17 = 293.3 + 8 * 3;
        const gapRow18 = 398.9 + 8 * 3;
        const a1 = 406.6 + 8 + 8 + 9;
        const a2 = 292 + 8 + 8 + 9;
        const a3 = 406.7 + 8 + 8 + 9;
        const a4 = 291.2 + 8 + 8 + 9;
        const a5 = 406.7 + 8 + 8 + 9;
        const a6 = 290 + 8 + 8 + 9;
        const a7 = 406.7 + 8 + 8 + 9;
        const a8 = 288.9 + 8 + 8 + 9;
        const a9 = 406.6 + 8 + 8 + 9;
        const a10 = 288.1 + 8 + 8 + 9;

        const gapColumn1 = 292.8 + i * 5.2 - 31.2;
        const gapColumn2 = 293.1 + i * 5.2 - 31.2;
        const gapColumn3 = 294.1 + i * 5.2 - 31.2;
        const gapColumn4 = 296.3 + i * 5.2 - 31.2;
        const gapColumn5 = 297.3 + i * 5.2 - 31.2;
        const gapColumn6 = 297.6 + i * 5.2 - 31.2;
        const gapColumn7 = 297.2 + i * 5.2 - 31.2;
        const gapColumn8 = 297.5 + i * 5.2 - 31.2;
        const gapColumn9 = 297.7 + i * 5.2 - 31.2;
        const gapColumn10 = 297.4 + i * 5.2 - 31.2;
        const gapColumn11 = 296.9 + i * 5.2 - 31.2;
        const gapColumn12 = 295.2 + i * 5.2 - 31.2;
        const gapColumn13 = 293.5 + i * 5.2 - 31.2;
        const gapColumn14 = 293 + i * 5.2 - 31.2;
        const gapColumn15 = 292.7 + i * 5.2 - 31.2;
        const gapColumn16 = 292.9 + i * 5.2 - 31.2;
        const gapColumn17 = 293.2 + i * 5.2 - 31.2;

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
                    className="booth  preferred-seating"
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
                        stroke="#000100"
                        strokeWidth=".5"
                        strokeMiterlimit="10"
                        points={
                            gapRow1 +
                            "," +
                            gapColumn1 +
                            " " +
                            gapRow2 +
                            "," +
                            gapColumn1 +
                            " " +
                            gapRow3 +
                            "," +
                            gapColumn2 +
                            " " +
                            gapRow4 +
                            "," +
                            gapColumn3 +
                            " " +
                            gapRow4 +
                            "," +
                            gapColumn4 +
                            " " +
                            gapRow5 +
                            "," +
                            gapColumn5 +
                            " " +
                            gapRow6 +
                            "," +
                            gapColumn6 +
                            " " +
                            gapRow1 +
                            "," +
                            gapColumn6 +
                            "   " +
                            gapRow7 +
                            "," +
                            gapColumn5 +
                            " " +
                            gapRow8 +
                            "," +
                            gapColumn7 +
                            " " +
                            gapRow9 +
                            "," +
                            gapColumn8 +
                            " " +
                            gapRow10 +
                            "," +
                            gapColumn9 +
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
                            gapColumn12 +
                            " " +
                            gapRow13 +
                            "," +
                            gapColumn13 +
                            " " +
                            gapRow12 +
                            "," +
                            gapColumn14 +
                            "   " +
                            gapRow15 +
                            "," +
                            gapColumn15 +
                            " " +
                            gapRow10 +
                            "," +
                            gapColumn15 +
                            " " +
                            gapRow9 +
                            "," +
                            gapColumn16 +
                            " " +
                            gapRow8 +
                            "," +
                            gapColumn17 +
                            " " +
                            gapRow7 +
                            "," +
                            gapColumn2 +
                            " "
                        }
                        id="polygon15455"
                    />
                </g>
            );
        }
    }
    return <>{items}</>;
}

export default Row5;
