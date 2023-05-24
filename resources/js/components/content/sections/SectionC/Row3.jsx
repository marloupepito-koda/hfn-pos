import React, { useState, useEffect } from "react";

function Row3() {
    const items = [];

    for (let i = 0; i < 22; i++) {
        const gapRow1 = 371.7 + i * 5.2 - 93.6;
        const gapRow2 = 371.4 + i * 5.2 - 93.6;
        const gapRow3 = 370.5 + i * 5.2 - 93.6;
        const gapRow4 = 368.2 + i * 5.2 - 93.6;
        const gapRow5 = 367.2 + i * 5.2 - 93.6;
        const gapRow6 = 366.9 + i * 5.2 - 93.6;
        const gapRow7 = 367 + i * 5.2 - 93.6;
        const gapRow8 = 367.3 + i * 5.2 - 93.6;
        const gapRow9 = 367.4 + i * 5.2 - 93.6;
        const gapRow10 = 367.1 + i * 5.2 - 93.6;
        const gapRow11 = 367.7 + i * 5.2 - 93.6;
        const gapRow12 = 369.3 + i * 5.2 - 93.6;
        const gapRow13 = 371 + i * 5.2 - 93.6;
        const gapRow14 = 371.5 + i * 5.2 - 93.6;
        const gapRow15 = 371.8 + i * 5.2 - 93.6;
        const gapRow16 = 371.6 + i * 5.2 - 93.6;
        const gapRow17 = 371.3 + i * 5.2 - 93.6;

        const gapColumn1 = 256.8 - 8 - 8;
        const gapColumn2 = 258.5 - 8 - 8;
        const gapColumn3 = 259.1 - 8 - 8;
        const gapColumn4 = 259.4 - 8 - 8;
        const gapColumn5 = 255.1 - 8 - 8;
        const gapColumn6 = 254.9 - 8 - 8;
        const gapColumn7 = 254.8 - 8 - 8;
        const gapColumn8 = 254.3 - 8 - 8;
        const gapColumn9 = 254 - 8 - 8;
        const gapColumn10 = 253.9 - 8 - 8;
        const gapColumn11 = 253.8 - 8 - 8;
        const gapColumn12 = 254.1 - 8 - 8;
        const gapColumn13 = 254.7 - 8 - 8;
        const gapColumn14 = 369.4 - 8 - 8;

        if (i !== 10 && i !== 11) {
            items.push(
                <g key={i} id="seat-4206" className="booth" section="1">
                    <polygon
                        className="st6 booth-fill"
                        fill="#FFFFFF"
                        stroke="#000100"
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

export default Row3;
