import React, { useState, useEffect } from "react";
import { pdf } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";
import { useParams } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";

const PDFLayout = () => {
    const { token } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("/api/get_cart_orders_token/" + token).then((res) => {
            setData(res.data.status);
            console.log(res.data.status);
        });
    }, []);
    const handleConvertToPDF = async () => {
        const doc = <PDFDocument data={data} />;
        const pdfBlob = await pdf(doc).toBlob();
        saveAs(pdfBlob, "tickets.pdf");
    };
    // useEffect(() => {
    //     handleConvertToPDF();
    // }, []);
    return (
        <div>
            <button onClick={handleConvertToPDF}>Download</button>
        </div>
    );
};

export default PDFLayout;
