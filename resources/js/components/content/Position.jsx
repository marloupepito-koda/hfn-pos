import React, { useState, useEffect } from "react";
import Ring from "./Ring";
function Position() {
    const [zoomLevel, setZoomLevel] = useState(1);

    const handleZoomIn = () => {
        setZoomLevel(zoomLevel + 0.1);
    };

    const handleZoomOut = () => {
        setZoomLevel(zoomLevel - 0.1);
    };

    return (
        <div>
            <div style={{ zIndex: "1" }}>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
            </div>
            <Ring zoom={zoomLevel} />
        </div>
    );
}

export default Position;
