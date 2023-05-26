import React, { useState, useEffect } from "react";
import tickets from "./tickets/tickets.png";
import { useParams } from "react-router-dom";
import { PDFViewer, Document, Page, Text } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";

function PDFWebUi() {
    const { token } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("/api/get_cart_orders_token/" + token).then((res) => {
            setData(res.data.status);
        });
    }, []);
    return (
        <div style={{ height: "99vh" }}>
            <PDFViewer style={{ width: "100%", height: "100%" }}>
                {data.map((res, index) => (
                    <PDFDocument data={data} />
                ))}
            </PDFViewer>
        </div>
    );
}

export default PDFWebUi;
