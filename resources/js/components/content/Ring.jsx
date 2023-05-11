import React, { useState, useEffect } from "react";
import SectionA from "./sections/SectionA";
import SectionB from "./sections/SectionB";
import SectionC from "./sections/SectionC";
import SectionD from "./sections/SectionD";
import SectionE from "./sections/SectionE";
import SectionF from "./sections/SectionF";
import SectionG from "./sections/SectionG";
import Draggable from "react-draggable";
import axios from "axios";
function Ring(props) {
    const [zoom, setZoom] = useState(1);
    const [seats, setSeats] = useState([]);
    const container = {
        width: "100%",
        height: "85vh",
        overflowX: "hidden",
        overflowY: "hidden",
        position: "relative",
        border: "solid 1px #006fbd",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "30px",
    };

    const handleZoomIn = () => {
        setZoom(zoom + 0.1);
    };

    const handleZoomOut = () => {
        setZoom(zoom - 0.1);
    };
    const handleScroll = (event) => {
        const currentScroll = event.deltaY;
        if (currentScroll > zoom) {
            setZoom(zoom - 0.1);
        } else {
            setZoom(zoom + 0.1);
        }
    };

    useEffect(() => {
        axios.get("/api/get_seats").then((res) => {
            setSeats(res.data.status);
        });
    }, []);
    return (
        <div>
            <div className="col-md-12" style={{ zIndex: "1" }}>
                <div className="row col-md-2 p-0">
                    <div className="col-md-6 p-0">
                        <button
                            onClick={handleZoomIn}
                            className="btn btn-sm btn-primary"
                        >
                            Zoom In
                        </button>
                    </div>
                    <div className="col-md-6 p-0">
                        <button
                            onClick={handleZoomOut}
                            className="btn btn-sm btn-primary"
                        >
                            Zoom Out
                        </button>
                    </div>
                </div>
                &nbsp;
            </div>
            <div className="container col-md-12" style={container}>
                <center
                    // onWheel={handleScroll}
                    className="container"
                    style={{
                        transform: `scale(${zoom})`,
                    }}
                >
                    <Draggable>
                        <svg
                            height="200%"
                            width="1150px"
                            style={{
                                enableBackground: "new 0 0 612 792",
                                WebkitUserDrag: "none",
                                // cursor: "move",
                                marginTop: "-250",
                            }}
                            viewBox="0 0 612 792"
                            xmlSpace="preserve"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs id="defs18930" />
                            <g id="viewport">
                                <SectionA seats={seats} />
                                {/* <SectionB /> */}
                                <SectionC seats={seats} />
                                {/* <SectionD /> */}
                                <SectionE seats={seats} />
                                {/* <SectionF /> */}
                                <SectionG seats={seats} />
                                <rect
                                    x="292"
                                    y="291"
                                    className="st6"
                                    width="77.5"
                                    height="77.5"
                                    id="rect18191"
                                />
                                <rect
                                    x="292"
                                    y="291"
                                    className="st21"
                                    width="77.5"
                                    height="77.5"
                                    id="rect18193"
                                />
                                <text
                                    transform="matrix(1 0 0 1 316.9026 331.7651)"
                                    className="st22 st23"
                                    id="text18195"
                                >
                                    RING
                                </text>
                            </g>
                        </svg>
                    </Draggable>
                </center>
            </div>
        </div>
    );
}

export default Ring;
