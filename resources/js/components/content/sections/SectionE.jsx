import React, { useState, useEffect } from "react";
import Row1 from "./SectionE/Row1";
import Row2 from "./SectionE/Row2";
import Row3 from "./SectionE/Row3";
import Row4 from "./SectionE/Row4";
import Row5 from "./SectionE/Row5";
import Row6 from "./SectionE/Row6";
import Row7 from "./SectionE/Row7";
import Row8 from "./SectionE/Row8";
import Row9 from "./SectionE/Row9";
import Row10 from "./SectionE/Row10";
import Row11 from "./SectionE/Row11";
import Row12 from "./SectionE/Row12";
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
    const [row11, setRow11] = useState([]);
    const [row12, setRo12] = useState([]);
    const [row13, setRow13] = useState([]);

    useEffect(() => {
        const row1 = props.seats.filter(
            (obj) => obj.cart_product_id < 6741 && obj.cart_product_id > 6720
        );

        const row2 = props.seats.filter(
            (obj) => obj.cart_product_id < 6761 && obj.cart_product_id > 6740
        );

        const row3 = props.seats.filter(
            (obj) => obj.cart_product_id < 6785 && obj.cart_product_id > 6760
        );

        const row4 = props.seats.filter(
            (obj) => obj.cart_product_id < 6809 && obj.cart_product_id > 6784
        );

        const row5 = props.seats.filter(
            (obj) => obj.cart_product_id < 6837 && obj.cart_product_id > 6808
        );

        const row6 = props.seats.filter(
            (obj) => obj.cart_product_id < 6865 && obj.cart_product_id > 6836
        );

        const row7 = props.seats.filter(
            (obj) => obj.cart_product_id < 6897 && obj.cart_product_id > 6864
        );

        const row8 = props.seats.filter(
            (obj) => obj.cart_product_id < 6929 && obj.cart_product_id > 6896
        );

        const row9 = props.seats.filter(
            (obj) => obj.cart_product_id < 6965 && obj.cart_product_id > 6928
        );

        const row10 = props.seats.filter(
            (obj) => obj.cart_product_id < 7001 && obj.cart_product_id > 6964
        );

        const row11 = props.seats.filter(
            (obj) => obj.cart_product_id < 7041 && obj.cart_product_id > 7000
        );

        // const row12 = props.seats.filter(
        //     (obj) =>
        //         obj.cart_product_id < 6721 && obj.cart_product_id > 6680
        // );

        // const row13 = props.seats.filter(
        //     (obj) =>
        //         obj.cart_product_id < 6757 && obj.cart_product_id > 6720
        // );
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
    }, [props]);
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
