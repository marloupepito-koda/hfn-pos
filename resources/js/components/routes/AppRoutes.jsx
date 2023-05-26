import React, { Component } from "react";
import { createBrowserRouter } from "react-router-dom";
import Error404 from "./Error404";
import AppLayout from "../Layout";
import AddToCart from "../add_to_cart/Layout";
import CheckoutLayout from "../checkout/Layout";
import SearchTicketLayout from "../search_ticket/Layout";
import OrderedComplete from "../checkout/components/OrderedComplete";
import UpgradeTable from "../checkout/components/UpgradeTable";
import IndexLayout from "../content/Layout";
import PDFLayout from "../pdf/PDFLayout";
import RedeemLayout from "../redeem/Layout";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <IndexLayout />,
            },
            {
                path: "/upgrade/:code",
                element: <IndexLayout />,
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
    {
        path: "/redeem/:code",
        element: <RedeemLayout />,
    },
    {
        path: "/tickets/pdf/:token",
        element: <PDFLayout />,
    },
    { path: "*", element: <Error404 /> },
]);
