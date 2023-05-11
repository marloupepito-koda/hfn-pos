import React, { useState, useEffect } from "react";
import Row1 from "./SectionG/Row1";
import Row2 from "./SectionG/Row2";
import Row3 from "./SectionG/Row3";
import Row4 from "./SectionG/Row4";
import Row5 from "./SectionG/Row5";
import Row6 from "./SectionG/Row6";
import Row7 from "./SectionG/Row7";
import Row8 from "./SectionG/Row8";
import Row9 from "./SectionG/Row9";
import Row10 from "./SectionG/Row10";
function SectionA(props) {
    const [row1, setRow1] = useState([]);
    const [row2, setRow2] = useState([]);
    const [row3, setRow3] = useState([]);
    const [row4, setRow4] = useState([]);
    const [row5, setRow5] = useState([]);
    const [row6, setRow6] = useState([]);
    const [row7, setRow7] = useState([]);
    const [row8, setRow8] = useState([]);
    const [row9, setRow9] = useState([]);
    const [row10, setRow10] = useState([]);

    useEffect(() => {
        const row1 = props.seats.filter(
            (obj) => obj.cart_product_id < 7061 && obj.cart_product_id > 7040
        );

        const row2 = props.seats.filter(
            (obj) => obj.cart_product_id < 7081 && obj.cart_product_id > 7060
        );

        const row3 = props.seats.filter(
            (obj) => obj.cart_product_id < 7105 && obj.cart_product_id > 7080
        );

        const row4 = props.seats.filter(
            (obj) => obj.cart_product_id < 7129 && obj.cart_product_id > 7104
        );

        const row5 = props.seats.filter(
            (obj) => obj.cart_product_id < 7157 && obj.cart_product_id > 7128
        );

        const row6 = props.seats.filter(
            (obj) => obj.cart_product_id < 7185 && obj.cart_product_id > 7156
        );

        const row7 = props.seats.filter(
            (obj) => obj.cart_product_id < 7217 && obj.cart_product_id > 7184
        );

        setRow1(row1);
        setRow2(row2);
        setRow3(row3);
        setRow4(row4);
        setRow5(row5);
        setRow6(row6);
        setRow7(row7);
    }, [props]);
    return (
        <>
            <Row1 data={row1} />
            <Row2 data={row2} />
            <Row5 data={row3} />
            <Row6 data={row4} />
            <Row7 data={row5} />
            <Row8 data={row6} />
            <Row9 data={row7} />
            {/* <Row10 /> */}
        </>
    );
}

export default SectionA;
