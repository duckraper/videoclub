import { createBrowserRouter } from "react-router-dom";
import LogIn from "../pages/LogIn";

import LoadingPageAd from "../pages/adminPages/LoadingPageAd";
import AdminLayout from "../pages/adminPages/AdminLayout";
import AdminDashBoard from "../pages/adminPages/AdminDashBoard";
import AdminInv from "../pages/adminPages/AdminInv";
import AdminWks from "../pages/adminPages/AdminWks";
import AdminRents from "../pages/adminPages/AdminRents";
import ClientsTable from "../components/tables/ClientsTable";


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
            {
                path: "Clientes",
                element: <ClientsTable />,
            }
        ],
    },
   
]);

export default router;
