import React, { Component } from "react";
import { createBrowserRouter } from "react-router-dom";
import HfnLayout from "../hfn/Layout";
import HfnIndexLayout from "../hfn/sections/index/Layout";
import HfnPlaceOrderLayout from "../hfn/sections/place_order/Layout";
import OrderCompletedLayout from "../hfn/sections/order_completed/Layout";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <HfnLayout />,
        children: [
            {
                path: "/",
                element: <HfnIndexLayout />,
            },
            {
                path: "/place_order",
                element: <HfnPlaceOrderLayout />,
            },
            {
                path: "/order_completed",
                element: <OrderCompletedLayout />,
            },
        ],
    },
    // { path: "*", element: <Error404 /> },
]);
