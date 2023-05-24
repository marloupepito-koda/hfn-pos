import React, { useState, useEffect } from "react";
import PrimarySearchAppBar from "../components/TopNavbar";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
function HfnLayout() {
    return (
        <>
            <PrimarySearchAppBar />
            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Outlet />
            </Container>
        </>
    );
}

export default HfnLayout;
