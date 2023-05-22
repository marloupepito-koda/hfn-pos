import React, { useState, useEffect } from "react";
import SectionA from "./sections/SectionA";
import SectionC from "./sections/SectionC";
import SectionE from "./sections/SectionE";
import SectionG from "./sections/SectionG";
import axios from "axios";
function Ring(props) {
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1.4);

    useEffect(() => {
        axios.get("/api/get_seats").then((res) => {
            setSeats(res.data.status);
            setLoading(false);
        });
    }, [position + scale]);

    async function moveRight() {
        await setPosition({ x: position.x + 50, y: position.y });
    }

    async function moveLeft() {
        await setPosition({ x: position.x - 50, y: position.y });
    }

    async function moveUp() {
        await setPosition({ x: position.x, y: position.y - 50 });
    }

    async function moveDown() {
        await setPosition({ x: position.x, y: position.y + 50 });
    }

    const container = {
        overflowX: "hidden",
        overflowY: "hidden",
        position: "relative",
        border: "solid 4px #006fbd",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
    };

    async function zoomIn() {
        await setScale(scale + 0.4);
    }

    async function zoomOut() {
        await setScale(scale - 0.4);
    }

    return (
        <div>
            <div className="col-md-12 p-3">
                <br />
                <div className="row ">
                    <div className="col-md-6 col-6">
                        <div className="circleBase" id="rotateMode">
                            <button
                                id="left"
                                className="btn btn-default btn-sm "
                                onClick={moveLeft}
                            >
                                <i className="fa fa-arrow-left fa-2x text-white p-1 "></i>
                            </button>

                            <button
                                id="right"
                                className="btn btn-default btn-sm"
                                onClick={moveRight}
                            >
                                <i className="fa fa-arrow-right fa-2x text-white p-1 "></i>
                            </button>

                            <button
                                id="up"
                                className="btn btn-default btn-sm"
                                onClick={moveUp}
                            >
                                <i className="fa fa-arrow-up fa-2x text-white p-1 "></i>
                            </button>

                            <button
                                id="down"
                                className="btn btn-default btn-sm"
                                onClick={moveDown}
                            >
                                <i className="fa fa-arrow-down fa-2x text-white p-1 "></i>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6 col-6">
                        <div className="circleBase" id="rotateMode2">
                            <button
                                id="up1"
                                className="btn btn-default btn-sm"
                                onClick={zoomIn}
                            >
                                <i className="fa fa-search-plus fa-3x text-white p-1 "></i>
                            </button>

                            <button
                                id="down1"
                                className="btn btn-default btn-sm"
                                onClick={zoomOut}
                            >
                                <i className="fa fa-search-minus fa-3x text-white p-1 "></i>
                            </button>
                        </div>
                    </div>
                </div>
                &nbsp;
            </div>
            {loading ? (
                <center>
                    <div className="spinner-border" role="status"></div>
                </center>
            ) : (
                <div className=" col-md-12" style={container}>
                    {/* <Draggable> */}
                    <br />
                    <br />
                    <br />
                    <center
                        style={{
                            transition: "transform 3s ease",
                            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        }}
                    >
                        <svg
                            style={{
                                enableBackground: "new 0 0 612 792",
                                WebkitUserDrag: "none",
                                touchAction: "none",
                                userSelect: "none",
                                WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                                cursor: "move",
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
                    </center>
                    {/* </Draggable> */}
                </div>
            )}
        </div>
    );
}

export default Ring;
