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
import { set } from "lodash";
import DraggableComponent from "./Draggable";
function Ring(props) {
    const [zoom, setZoom] = useState(1.4);
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1.4);

    function moveRight() {
        setPosition((prevPosition) => ({
            ...prevPosition,
            x: prevPosition.x + 50,
        }));
    }

    function moveLeft() {
        setPosition((prevPosition) => ({
            ...prevPosition,
            x: prevPosition.x - 50,
        }));
    }

    function moveUp() {
        setPosition((prevPosition) => ({
            ...prevPosition,
            y: prevPosition.y - 50,
        }));
    }

    function moveDown() {
        setPosition((prevPosition) => ({
            ...prevPosition,
            y: prevPosition.y + 50,
        }));
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

    // const handleZoomIn = () => {
    //     setZoom(zoom + 0.1);
    // };

    // const handleZoomOut = () => {
    //     setZoom(zoom - 0.1);
    // };

    function zoomIn() {
        setScale((prevScale) => prevScale + 0.3);
    }

    function zoomOut() {
        setScale((prevScale) => prevScale - 0.3);
    }

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
            setLoading(false);
        });
    }, []);

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
                    {/* <div className="col-md-3 col-4">
                        <button
                            onClick={handleZoomIn}
                            className="btn btn-md btn-primary"
                        >
                            Zoom In
                        </button>
                    </div>
                    <div className="col-md-3  col-4">
                        <button
                            onClick={handleZoomOut}
                            className="btn btn-md btn-primary "
                        >
                            Zoom Out
                        </button>
                    </div> */}
                </div>
                &nbsp;
            </div>
            {loading ? (
                <center>
                    <div className="spinner-border" role="status"></div>
                </center>
            ) : (
                <div className="container col-md-12" style={container}>
                    {/* <Draggable> */}
                    <br />
                    <br />
                    <br />
                    <center
                        // onWheel={handleScroll}
                        className="container"
                        // style={{
                        //     transform: `scale(${zoom})`,
                        // }}
                    >
                        <div
                            style={{
                                transition: "transform 3s ease",
                                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                            }}
                        >
                            <svg
                                style={{
                                    enableBackground: "new 0 0 612 792",
                                    WebkitUserDrag: "none",
                                    // cursor: "move",
                                    touchAction: "none",
                                    userSelect: "none",
                                    WebkitUserDrag: "none",
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
                        </div>
                    </center>
                    {/* </Draggable> */}
                </div>
            )}
        </div>
    );
}

export default Ring;
