import React, { useState, useEffect } from "react";
import PrimarySearchAppBar from "../components/TopNavbar";
import { Outlet } from "react-router-dom";
function HfnLayout() {
    return (
        <>
            <PrimarySearchAppBar />
            <Outlet />
        </>
    );
}

export default HfnLayout;
