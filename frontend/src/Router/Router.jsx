import { createBrowserRouter } from "react-router-dom";
import LogIn from "../pages/LogIn";

import LoadingPageAd from "../pages/adminPages/LoadingPageAd";
import Layout from "../pages/adminPages/AdminLayout";
import DashBoard from "../pages/adminPages/AdminDashBoard";
import Users from "../components/tables/UserTable";
import UsersForm from "../components/forms/UsersForm";
import Clients from "../components/tables/ClientsTable";
import ClientsForm from "../components/forms/ClientsForm"
import Films from "../components/tables/FilmsTable";
import FilmsForm from "../components/forms/FilmForm"
import Supports from "../components/tables/SupportTables";
//  import Rents from "../components/tables/PrestamosTable";


const router = createBrowserRouter([
    {
        path: "/",
        element: <LogIn />,
    },
    {
        path: "/home",
        element: <LoadingPageAd />,
    },
    {
        path: "/home/Dashboard",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <DashBoard />,
            },
            {
                path: "Trabajadores",
                element: <Users />,
            },
            {
                path: "Trabajadores/Agregar",
                element: <UsersForm />,
            },
            {
                path: "Trabajadores/Editar/:id",
                element: <UsersForm />,
            },
            {
                path: "Clientes",
                element: <Clients />,
            },{
                path: "Clientes/Agregar",
                element: <ClientsForm />,
            },
            {
                path: "Clientes/Editar/:id",
                element: <ClientsForm />,
            },
            {
                path: "Peliculas",
                element: <Films />,
            },
            {
                path: "Peliculas/Agregar",
                element: <FilmsForm />,
            },
            {
                path: "Peliculas/Editar/:id",
                element: <FilmsForm />,
            },
            {
                path: "Soportes",
                element: <Supports />,
            },
            // {
            //     path: "Prestamos",
            //     element: <Rents/>,
            // },
        ],
    },
   
]);

export default router;
