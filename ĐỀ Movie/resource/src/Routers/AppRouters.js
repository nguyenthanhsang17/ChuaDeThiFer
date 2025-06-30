import React from 'react'

import ListMovie from '../Pages/ListMovie';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const routers = [
    {
        path: '/movie',
        element: (
            <ListMovie />
        )
    }
]


export default function AppRouters() {
    const router = createBrowserRouter(routers);
    return <RouterProvider router={router} />;
}

