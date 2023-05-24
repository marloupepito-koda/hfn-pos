import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ButtonComponents from "../../../components/button/Button";
import TableComponents from "../../../components/table/Table";
import DrawerComponents from "../../../components/drawer/Drawer";
function HfnIndexPage() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={7} md={7} lg={7}>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Item>
                                <DrawerComponents section="A">
                                    <TableComponents perPage={20} />
                                </DrawerComponents>
                            </Item>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Item>
                                <DrawerComponents section="B">
                                    <TableComponents perPage={20} />
                                </DrawerComponents>
                            </Item>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Item>
                                <DrawerComponents section="C">
                                    <TableComponents perPage={20} />
                                </DrawerComponents>
                            </Item>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Item>
                                <DrawerComponents section="D">
                                    <TableComponents perPage={20} />
                                </DrawerComponents>
                            </Item>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={5} md={5} lg={5}>
                    <Item elevation={2}>
                        <TableComponents perPage={20} />
                    </Item>
                </Grid>
            </Grid>
        </Container>
    );
}

export default HfnIndexPage;
