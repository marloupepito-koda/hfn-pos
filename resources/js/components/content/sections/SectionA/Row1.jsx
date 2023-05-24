import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CartData from "../../../add_to_cart/CartData";
import Tippy from "tippy.js";
function Row1(props) {
    const [items, setItems] = useState([]);
    const myRef = useRef([]);
    const navigate = useNavigate();

    const addCartSeat = (e) => {
        const seatCheck = CartData.data.find(
            (obj) => obj.cart_product_id === e.cart_product_id
        );
        console.log(seatCheck);
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

    for (let i = 0; i < props.data.length + 2; i++) {
        const gapRow1 = 279.8 + i * 5.2 - 1 * 10.4;
        const gapRow2 = 279.7 + i * 5.2 - 1 * 10.4;
        const gapRow3 = 280.1 + i * 5.2 - 1 * 10.4;
        const gapRow4 = 281 + i * 5.2 - 1 * 10.4;
        const gapRow5 = 283.3 + i * 5.2 - 1 * 10.4;
        const gapRow6 = 284.2 + i * 5.2 - 1 * 10.4;
        const gapRow7 = 284.5 + i * 5.2 - 1 * 10.4;
        const gapRow8 = 284.1 + i * 5.2 - 1 * 10.4;
        const gapRow9 = 284.4 + i * 5.2 - 1 * 10.4;
        const gapRow10 = 284.6 + i * 5.2 - 1 * 10.4;
        const gapRow11 = 284.3 + i * 5.2 - 1 * 10.4;
        const gapRow12 = 283.8 + i * 5.2 - 1 * 10.4;
        const gapRow13 = 282.2 + i * 5.2 - 1 * 10.4;
        const gapRow14 = 280.5 + i * 5.2 - 1 * 10.4;
        const gapRow15 = 279.9 + i * 5.2 - 1 * 10.4;
        const gapRow16 = 280.2 + i * 5.2 - 1 * 10.4;
        const gapRow17 = 282.1 + i * 5.2 - 1 * 10.4;

        const gapColumn1 = 404.5 + 8 * 1;
        const gapColumn2 = 402.8 + 8 * 1;
        const gapColumn3 = 402.2 + 8 * 1;
        const gapColumn4 = 401.9 + 8 * 1;
        const gapColumn5 = 404.4 + 8 * 1;
        const gapColumn6 = 406.2 + 8 * 1;
        const gapColumn7 = 406.4 + 8 * 1;
        const gapColumn8 = 406.5 + 8 * 1;
        const gapColumn9 = 406.9 + 8 * 1;
        const gapColumn10 = 407.2 + 8 * 1;
        const gapColumn11 = 407.4 + 8 * 1;
        const gapColumn12 = 407.5 + 8 * 1;
        const gapColumn13 = 407 + 8 * 1;
        const gapColumn14 = 406.6 + 8 * 1;

        if (i !== 10 && i !== 11) {
            const aa = i < 11 ? 21 - i - 2 : 21 - i;
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
                    onClick={() => addCartSeat(seatData)}
                    id="seat-3827"
                    className="booth vip-ringside"
                    section="1"
                >
                    <polygon
                        value={i}
                        className={
                            seatColor === undefined
                                ? "st6 booth-fill " + taken
                                : "st6 booth-fill selected"
                        }
                        fill="#FFFFFF"
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
                            gapColumn5 +
                            " " +
                            gapRow6 +
                            "," +
                            gapColumn6 +
                            " " +
                            gapRow8 +
                            "," +
                            gapColumn7 +
                            " " +
                            gapRow9 +
                            "," +
                            gapColumn7 +
                            " " +
                            gapRow10 +
                            "," +
                            gapColumn8 +
                            " " +
                            gapRow10 +
                            "," +
                            gapColumn9 +
                            " " +
                            gapRow11 +
                            "," +
                            gapColumn10 +
                            " " +
                            gapRow12 +
                            "," +
                            gapColumn11 +
                            " " +
                            gapRow13 +
                            "," +
                            gapColumn12 +
                            " " +
                            gapRow14 +
                            "," +
                            gapColumn11 +
                            " " +
                            gapRow15 +
                            "," +
                            gapColumn10 +
                            " " +
                            gapRow2 +
                            "," +
                            gapColumn13 +
                            " " +
                            gapRow2 +
                            "," +
                            gapColumn8 +
                            " " +
                            gapRow15 +
                            "," +
                            gapColumn7 +
                            " " +
                            gapRow16 +
                            "," +
                            gapColumn7 +
                            " " +
                            gapRow3 +
                            "," +
                            gapColumn6
                        }
                        id="polygon12149"
                    />
                </g>
            );
        }
    }
    return <>{items}</>;
}

export default Row1;
