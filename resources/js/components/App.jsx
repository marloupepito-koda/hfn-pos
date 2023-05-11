import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./routes/AppRoutes";
import { RouterProvider } from "react-router-dom";

function Example() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default Example;

if (document.getElementById("app")) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
        // <React.StrictMode>
        <Example />
        // </React.StrictMode>
    );
}
