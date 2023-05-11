import React, { useState, useEffect } from "react";
import Row1 from "./SectionC/Row1";
import Row2 from "./SectionC/Row2";
import Row3 from "./SectionC/Row3";
import Row4 from "./SectionC/Row4";
import Row5 from "./SectionC/Row5";
import Row6 from "./SectionC/Row6";
import Row7 from "./SectionC/Row7";
import Row8 from "./SectionC/Row8";
import Row9 from "./SectionC/Row9";
import Row10 from "./SectionC/Row10";
import Row11 from "./SectionC/Row11";
import Row12 from "./SectionC/Row12";
import Row13 from "./SectionC/Row13";
import Row14 from "./SectionC/Row14";
function SectionA() {
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
    const [row11, setRow11] = useState([]);
    const [row12, setRo12] = useState([]);
    const [row13, setRow13] = useState([]);

    useEffect(() => {
        axios.get("/api/get_seats").then((res) => {
            const row1 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6341 && obj.cart_product_id > 6320
            );

            const row2 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6361 && obj.cart_product_id > 6340
            );

            const row3 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6385 && obj.cart_product_id > 6360
            );

            const row4 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6409 && obj.cart_product_id > 6384
            );

            const row5 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6437 && obj.cart_product_id > 6408
            );

            const row6 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6465 && obj.cart_product_id > 6436
            );

            const row7 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6497 && obj.cart_product_id > 6464
            );

            const row8 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6529 && obj.cart_product_id > 6496
            );

            const row9 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6601 && obj.cart_product_id > 6528
            );

            const row10 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6641 && obj.cart_product_id > 6600
            );

            const row11 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6681 && obj.cart_product_id > 6640
            );

            const row12 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6721 && obj.cart_product_id > 6680
            );

            const row13 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6757 && obj.cart_product_id > 6720
            );
            setRow1(row1);
            setRow2(row2);
            setRow3(row3);
            setRow4(row4);
            setRow5(row5);
            setRow6(row6);
            setRow7(row7);
            setRow8(row8);
            setRow9(row9);
            setRow10(row10);
            setRow11(row11);
            // setRow12(row12);
            // setRow13(row13);
        });
    }, []);
    return (
        <>
            <Row1 data={row1} />
            <Row2 data={row2} />
            <Row4 data={row3} />
            <Row5 data={row4} />
            <Row6 data={row5} />
            <Row7 data={row6} />
            <Row8 data={row7} />
            <Row9 data={row8} />
            <Row10 data={row9} />
            <Row11 data={row10} />
            <Row12 data={row11} />
            {/* <Row13 data={row12} />
            <Row14 data={row13} /> */}
        </>
    );
}

export default SectionA;
