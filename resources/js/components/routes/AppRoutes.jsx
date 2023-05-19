import React, { Component } from "react";
import { createBrowserRouter } from "react-router-dom";
import Error404 from "./Error404";
import AppLayout from "../Layout";
import AddToCart from "../add_to_cart/Layout";
import CheckoutLayout from "../checkout/Layout";
import SearchTicketLayout from "../search_ticket/Layout";
import OrderedComplete from "../checkout/components/OrderedComplete";
import UpgradeTable from "../checkout/components/UpgradeTable";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <AddToCart />,
            },
            {
                path: "/upgrade/:code",
                element: <AddToCart />,
            },
            {
                path: "/checkout",
                element: <CheckoutLayout />,
            },
            {
                path: "/checkout/:code",
                element: <UpgradeTable />,
            },
            {
                path: "/tickets",
                element: <SearchTicketLayout />,
            },
            {
                path: "/order_complete",
                element: <OrderedComplete />,
            },
        ],
    },
    { path: "*", element: <Error404 /> },
]);
