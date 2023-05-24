import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./routes/AppRoutes";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function Example() {
    let theme = createTheme({
        palette: {
            primary: {
                main: "#000000",
            },
            secondary: {
                main: "#edf2ff",
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default Example;

if (document.getElementById("app")) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
        <React.StrictMode>
            <Example />
        </React.StrictMode>
    );
}
