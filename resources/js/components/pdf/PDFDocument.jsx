import React, { useState, useEffect } from "react";
import { Document, Page, Image, Text, StyleSheet } from "@react-pdf/renderer";
import tickets from "./tickets/tickets.png";

import moment from "moment";
const PDFDocument = ({ data }) => {
    const styles = StyleSheet.create({
        image: {
            position: "relative",
            zIndex: -1,
        },
        orderInfo: {
            marginTop: "-380",
            marginLeft: "150",
            color: "#000000",
            fontSize: "15",
        },
        name: {
            marginTop: "27",
            marginLeft: "90",
            color: "#000000",
        },
        type: {
            marginTop: "-16",
            marginLeft: "300",
            color: "#000000",
        },

        qrcode: {
            width: "60px",
            marginTop: "-100",
            marginLeft: "480",
        },
        code: {
            width: "60px",
            marginTop: "20",
            marginLeft: "480",
            fontSize: "12",
        },
        event: {
            marginTop: "-113",
            marginLeft: "90",
            color: "#000000",
            fontSize: "14",
        },
        dateTime: {
            marginTop: "-70",
            marginLeft: "90",
            color: "#FFFFFF",
            fontSize: "11",
        },
        location: {
            marginTop: "-13",
            marginLeft: "300",
            color: "#FFFFFF",
            fontSize: "11",
        },
        seatType: {
            height: 108,
            width: 203,
            marginTop: "-199",
            marginLeft: "354",
            color: "#FFFFFF",
            fontSize: "11",
            paddingLeft: "5px",
            paddingRight: "8px",
            paddingTop: "15px",
            backgroundColor: "#009933",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto",
        },
        productName: {
            marginTop: "-99",
            marginLeft: "390",
            color: "white",
            fontSize: "24",
        },
        productPrice: {
            marginLeft: "410",
            color: "white",
            fontSize: "18",
        },
        productArea: {
            marginTop: "10",
            marginLeft: "360",
            color: "white",
            fontSize: "12",
        },
        productSection: {
            marginTop: "-14",
            marginLeft: "420",
            color: "white",
            fontSize: "12",
        },
        productRow: {
            marginTop: "-14",
            marginLeft: "480",
            color: "white",
            fontSize: "12",
        },
        productSeat: {
            marginTop: "-14",
            marginLeft: "520",
            color: "white",
            fontSize: "12",
        },

        productArea1: {
            marginTop: "3",
            marginLeft: "360",
            color: "white",
            fontSize: "9",
        },
        productSection1: {
            marginTop: "-13",
            marginLeft: "420",
            color: "white",
            fontSize: "12",
        },
        productRow1: {
            marginTop: "-14",
            marginLeft: "480",
            color: "white",
            fontSize: "12",
        },
        productSeat1: {
            marginTop: "-14",
            marginLeft: "520",
            color: "white",
            fontSize: "12",
        },
    });

    return (
        <Document>
            {data.map((res, index) => (
                <Page key={index}>
                    <Image style={styles.image} src={tickets} />
                    <Text style={styles.orderInfo}>
                        Order # {res.cart_order_id}{" "}
                        {moment(res.date_submitted).format("LLL")}
                    </Text>
                    <Text style={styles.name}>
                        {res.first_name} {res.last_name}
                    </Text>
                    <Text style={styles.type}>
                        {res.cart_products.venue_seat}
                    </Text>
                    <Image
                        style={styles.qrcode}
                        src={
                            "http://api.qrserver.com/v1/create-qr-code/?data=https://hfn.ee4.co/redeem/" +
                            res.code
                        }
                    />
                    <Text style={styles.code}>{res.code}</Text>
                    <Text style={styles.event}>
                        Hollywood Fight Nights at Commerce Casino
                    </Text>
                    <Text
                        style={{
                            height: 108,
                            width: 203,
                            marginTop: "-199",
                            marginLeft: "354",
                            color: "#FFFFFF",
                            fontSize: "11",
                            paddingLeft: "5px",
                            paddingRight: "8px",
                            paddingTop: "15px",
                            backgroundColor:
                                res.cart_products.product_name ===
                                    "Reserved Seating" ||
                                res.cart_products.product_name ===
                                    "General Admission Seating"
                                    ? "rgb(253, 177, 0)"
                                    : res.cart_products.product_name ===
                                      "Preferred Seating"
                                    ? "rgb(14, 122, 0)"
                                    : res.cart_products.product_name ===
                                      "VIP Ringside"
                                    ? "rgb(168, 0, 255)"
                                    : "rgb(51, 102, 255)",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "auto",
                        }}
                    ></Text>
                    <Text
                        style={{
                            marginTop: "-99",
                            marginLeft:
                                res.cart_products.product_name ===
                                    "Reserved Seating" ||
                                res.cart_products.product_name ===
                                    "General Admission Seating" ||
                                res.cart_products.product_name ===
                                    "Preferred Seating"
                                    ? "360"
                                    : "390",
                            color: "white",
                            fontSize: "24",
                        }}
                    >
                        {res.cart_products.product_name ===
                            "Reserved Seating" ||
                        res.cart_products.product_name ===
                            "General Admission Seating"
                            ? "General Admission"
                            : res.cart_products.product_name ===
                              "Preferred Seating"
                            ? "Preferred Seating"
                            : res.cart_products.product_name === "VIP Ringside"
                            ? "VIP Ringside"
                            : "No Seat"}
                    </Text>
                    <Text style={styles.productPrice}>
                        Price: $ {res.cart_products.price_sale}
                    </Text>
                    <Text style={styles.productArea}>Area</Text>
                    <Text style={styles.productSection}>Section</Text>
                    <Text style={styles.productRow}>Row</Text>
                    <Text style={styles.productSeat}>Seat</Text>

                    <Text style={styles.productArea1}>
                        {res.cart_products.product_name.split(" ")[0] === "No"
                            ? "none"
                            : res.cart_products.product_name.split(" ")[0]}
                    </Text>
                    <Text style={styles.productSection1}>
                        {res.cart_products.product_name.split(" ")[0] === "No"
                            ? "none"
                            : res.cart_products.venue_section_id === 1
                            ? "A"
                            : res.cart_products.venue_section_id === 2
                            ? "B"
                            : res.cart_products.venue_section_id === 3
                            ? "C"
                            : res.cart_products.venue_section_id === 4
                            ? "D"
                            : "No Seat"}
                    </Text>
                    <Text style={styles.productRow1}>
                        {res.cart_products.product_name.split(" ")[0] === "No"
                            ? "none"
                            : res.cart_products.venue_row}
                    </Text>
                    <Text style={styles.productSeat1}>
                        {res.cart_products.product_name.split(" ")[0] === "No"
                            ? "none"
                            : res.cart_products.venue_seat}
                    </Text>
                </Page>
            ))}
        </Document>
    );
};

export default PDFDocument;
