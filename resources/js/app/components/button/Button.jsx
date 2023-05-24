import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

function ButtonComponents({ section }) {
    return (
        <>
            <Button
                variant="contained"
                style={{ width: "100%" }}
                color="primary"
            >
                Section {section}
            </Button>
        </>
    );
}

export default ButtonComponents;
