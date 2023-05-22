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
        const gapRow1 = 371.7 + i * 5.2 - 104;
        const gapRow2 = 371.4 + i * 5.2 - 104;
        const gapRow3 = 370.5 + i * 5.2 - 104;
        const gapRow4 = 368.2 + i * 5.2 - 104;
        const gapRow5 = 367.2 + i * 5.2 - 104;
        const gapRow6 = 366.9 + i * 5.2 - 104;
        const gapRow7 = 367 + i * 5.2 - 104;
        const gapRow8 = 367.3 + i * 5.2 - 104;
        const gapRow9 = 367.4 + i * 5.2 - 104;
        const gapRow10 = 367.1 + i * 5.2 - 104;
        const gapRow11 = 367.7 + i * 5.2 - 104;
        const gapRow12 = 369.3 + i * 5.2 - 104;
        const gapRow13 = 371 + i * 5.2 - 104;
        const gapRow14 = 371.5 + i * 5.2 - 104;
        const gapRow15 = 371.8 + i * 5.2 - 104;
        const gapRow16 = 371.6 + i * 5.2 - 104;
        const gapRow17 = 371.3 + i * 5.2 - 104;

        const gapColumn1 = 256.8 - 8 - 8 - 8;
        const gapColumn2 = 258.5 - 8 - 8 - 8;
        const gapColumn3 = 259.1 - 8 - 8 - 8;
        const gapColumn4 = 259.4 - 8 - 8 - 8;
        const gapColumn5 = 255.1 - 8 - 8 - 8;
        const gapColumn6 = 254.9 - 8 - 8 - 8;
        const gapColumn7 = 254.8 - 8 - 8 - 8;
        const gapColumn8 = 254.3 - 8 - 8 - 8;
        const gapColumn9 = 254 - 8 - 8 - 8;
        const gapColumn10 = 253.9 - 8 - 8 - 8;
        const gapColumn11 = 253.8 - 8 - 8 - 8;
        const gapColumn12 = 254.1 - 8 - 8 - 8;
        const gapColumn13 = 254.7 - 8 - 8 - 8;
        const gapColumn14 = 369.4 - 8 - 8 - 8;

        if (i !== 12 && i !== 13) {
            const aa = i < 13 ? 25 - i - 2 : 25 - i;
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
                        fill={seatColor === undefined ? "#000000" : "#ffff66"}
                        stroke="#000000"
                        strokeWidth=".5"
                        strokeMiterlimit="10"
                        points={
                            gapColumn1 +
                            "," +
                            gapRow1 +
                            " " +
                            gapColumn2 +
                            "," +
                            gapRow1 +
                            " " +
                            gapColumn3 +
                            "," +
                            gapRow2 +
                            " " +
                            gapColumn4 +
                            "," +
                            gapRow3 +
                            " " +
                            gapColumn4 +
                            "," +
                            gapRow4 +
                            " " +
                            gapColumn3 +
                            "," +
                            gapRow5 +
                            " " +
                            gapColumn2 +
                            "," +
                            gapRow6 +
                            " " +
                            gapColumn1 +
                            "," +
                            gapRow7 +
                            " " +
                            gapColumn5 +
                            "," +
                            gapRow8 +
                            " " +
                            gapColumn6 +
                            "," +
                            gapRow9 +
                            " " +
                            gapColumn6 +
                            "," +
                            gapRow10 +
                            " " +
                            gapColumn7 +
                            "," +
                            gapRow6 +
                            " " +
                            gapColumn8 +
                            "," +
                            gapRow6 +
                            " " +
                            gapColumn9 +
                            "," +
                            gapRow5 +
                            " " +
                            gapColumn10 +
                            "," +
                            gapRow11 +
                            " " +
                            gapColumn11 +
                            "," +
                            gapRow12 +
                            " " +
                            gapColumn10 +
                            "," +
                            gapRow13 +
                            " " +
                            gapColumn12 +
                            "," +
                            gapRow14 +
                            " " +
                            gapColumn8 +
                            "," +
                            gapRow15 +
                            " " +
                            gapColumn7 +
                            "," +
                            gapRow15 +
                            " " +
                            gapColumn6 +
                            "," +
                            gapRow16 +
                            " " +
                            gapColumn7 +
                            "," +
                            gapRow17 +
                            " " +
                            gapColumn5 +
                            "," +
                            gapRow2 +
                            " "
                        }
                        id="polygon14663"
                    />
                </g>
            );
        }
    }
    return <>{items}</>;
}

export default Row4;
