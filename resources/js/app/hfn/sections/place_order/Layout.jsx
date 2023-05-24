import React, { useState, useEffect } from "react";
import TableComponents from "../../../components/table/Table";
import ButtonComponents from "../../../components/button/Button";
import PlaceOrderForm from "./content/PlaceOrderForm";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
function HfnPlaceOrderLayout() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <TableComponents perPage={5} total={true} />
                </Grid>
                <Grid item xs={6} md={4}>
                    <ButtonComponents size={25} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <PlaceOrderForm />
                </Grid>
            </Grid>
        </Box>
    );
}

export default HfnPlaceOrderLayout;
