
import ListProduct from '../page/ListProduct';
import ProductDetail from '../page/ProductDetail';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const routers = [
    {
        path: '/sang',
        element: (
            <ProductDetail />
        )
    },
    {
        path: '/',
        element: (
            <ListProduct />
        )
    }
]

function AppRouters() {
    const router = createBrowserRouter(routers);
    return <RouterProvider router={router} />;
}
export default AppRouters;
