import React, { Component } from "react";
import { createBrowserRouter } from "react-router-dom";
import HfnLayout from "../hfn/Layout";
import HfnIndexPage from "../hfn/sections/index/Index";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <HfnLayout />,
        children: [
            {
                path: "/",
                element: <HfnIndexPage />,
            },
        ],
    },
    // { path: "*", element: <Error404 /> },
]);
