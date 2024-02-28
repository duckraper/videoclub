import { createBrowserRouter } from "react-router-dom";
import LogIn from "../pages/LogIn";

import LoadingPageAd from "../pages/adminPages/LoadingPageAd";
import AdminLayout from "../pages/adminPages/AdminLayout";
import AdminDashBoard from "../pages/adminPages/AdminDashBoard";
import AdminInv from "../pages/adminPages/AdminInv";
import AdminWks from "../pages/adminPages/AdminWks";
import AdminRents from "../pages/adminPages/AdminRents";

import LoadingPageDe from "../pages/depPages/LoadingPageDe";
import DepLayout from "../pages/depPages/DepLayout";
import DepDashBoard from "../pages/depPages/DepDashBoard";
import DepClnt from "../pages/depPages/DepClnt";
import DepRents from "../pages/depPages/DepRents";
import DepFilms from "../pages/depPages/DepFilms";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LogIn />,
    },
    {
        path: "/admini",
        element: <LoadingPageAd />,
    },
    {
        path: "/admini/Dashboard",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminDashBoard />,
            },
            {
                path: "Inventario",
                element: <AdminInv />,
            },
            {
                path: "Trabajadores",
                element: <AdminWks />,
            },
            {
                path: "Rentas",
                element: <AdminRents />,
            },
        ],
    },
    {
        path: "/depe",
        element: <LoadingPageDe />,
    },
    {
        path: "/depe/Dashboard",
        element: <DepLayout />,
        children: [
            {
                index: true,
                element: <DepDashBoard />,
            },
            {
                path: "Clientes",
                element: <DepClnt />,
            },
            {
                path: "Peliculas",
                element: <DepFilms />,
            },
            {
                path: "Rentas",
                element: <DepRents />,
            },
        ],
    },
]);

export default router;
