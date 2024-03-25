import { createBrowserRouter } from "react-router-dom";
import { auth_state } from "../app/slices/Auth.slice";
import { useSelector } from "react-redux";

import LogIn from "../pages/LogIn";
import LoadingPageAdd from "../pages/LoadingPageAdd";
import Layout from "../pages/Layout";
import DashBoard from "../pages/DashBoard";
import Users from "../components/tables/UserTable";
import UsersForm from "../components/forms/UsersForm";
import Clients from "../components/tables/ClientsTable";
import ClientsForm from "../components/forms/ClientsForm"
import Films from "../components/tables/FilmsTable";
import FilmsForm from "../components/forms/FilmForm"
import Supports from "../components/tables/SupportTables";
import SupportsForm from "../components/forms/SupportForm";
import Rents from "../components/tables/RentsTable";
import RentForm from "../components/forms/RentForm";
import InvalidsTable from "../components/tables/InvalidsTable";




const router = createBrowserRouter([
    {
        path: "/",
        element: <LogIn />,
    },
    {
        path: "/home",
        element: <LoadingPageAdd />,
    },
    {
        path: "/home/Dashboard",
        element: <Layout />,
        children:[
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
                path: "Trabajadores/Editar/:id/",
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
                path: "Clientes/Editar/:id/",
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
                path: "Peliculas/Editar/:id/",
                element: <FilmsForm />,
            },
            {
                path: "Soportes",
                element: <Supports />,
            },
            {
                path: "Soportes/Agregar",
                element: <SupportsForm />,
            },
            {
                path: "Prestamos",
                element: <Rents/>,
            },
            {
                path: "Prestamos/Agregar",
                element: <RentForm />,
            
            },
            {
                path: "Invalidados",
                element: <InvalidsTable />,
            }
        ],
    },
   
]);

export default router;
