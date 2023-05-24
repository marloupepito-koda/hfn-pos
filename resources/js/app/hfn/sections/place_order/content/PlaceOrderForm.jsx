import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

function PlaceOrderForm() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4} md={4}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Firstname and Lastname"
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={4} md={4}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Email Address"
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={4} md={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Age
                        </InputLabel>
                        <Select
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Previous Attendee"
                            // onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        fullWidth
                        placeholder="Order Notes"
                        multiline
                        rows={2}
                        maxRows={4}
                    />
                </Grid>
                <Grid item xs={4} md={4}></Grid>
                <Grid item xs={4} md={4}>
                    <Button variant="contained" fullWidth>
                        Place Order
                    </Button>
                </Grid>
                <Grid item xs={4} md={4}></Grid>
            </Grid>
        </Box>
    );
}

export default PlaceOrderForm;
