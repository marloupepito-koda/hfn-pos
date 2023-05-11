import React, { useState, useEffect } from "react";
import Row1 from "./SectionA/Row1";
import Row2 from "./SectionA/Row2";
import Row3 from "./SectionA/Row3";
import Row4 from "./SectionA/Row4";
import Row5 from "./SectionA/Row5";
import Row6 from "./SectionA/Row6";
import Row7 from "./SectionA/Row7";
import Row8 from "./SectionA/Row8";
import Row9 from "./SectionA/Row9";
import Row10 from "./SectionA/Row10";
import Row11 from "./SectionA/Row11";
import Row12 from "./SectionA/Row12";
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

    useEffect(() => {
        axios.get("/api/get_seats").then((res) => {
            const row1 = res.data.status.filter(
                (obj) => obj.cart_product_id < 6021
            );

            const row2 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6041 && obj.cart_product_id > 6020
            );

            const row3 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6065 && obj.cart_product_id > 6040
            );

            const row4 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6089 && obj.cart_product_id > 6064
            );

            const row5 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6117 && obj.cart_product_id > 6088
            );

            const row6 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6145 && obj.cart_product_id > 6116
            );

            const row7 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6177 && obj.cart_product_id > 6144
            );

            const row8 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6209 && obj.cart_product_id > 6176
            );

            const row9 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6245 && obj.cart_product_id > 6208
            );

            const row10 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6281 && obj.cart_product_id > 6244
            );

            const row11 = res.data.status.filter(
                (obj) =>
                    obj.cart_product_id < 6321 && obj.cart_product_id > 6280
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
        </>
    );
}

export default SectionA;
