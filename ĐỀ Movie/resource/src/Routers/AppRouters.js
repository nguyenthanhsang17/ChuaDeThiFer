import React from 'react'

import ListMovie from '../Pages/ListMovie';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddStart from '../Pages/AddStart';
const routers = [
    {
        path: '/movie',
        element: (
            <ListMovie />
        )
    },
    {
        path: '/movie/:id/add-stars',
        element: (
            <AddStart />
        )
    }
]


export default function AppRouters() {
    const router = createBrowserRouter(routers);
    return <RouterProvider router={router} />;
}

