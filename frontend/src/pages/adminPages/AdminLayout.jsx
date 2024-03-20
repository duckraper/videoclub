import { useState, useEffect } from "react";
import {
    HomeOutlined,
    CameraOutdoorOutlined,
    PeopleAltOutlined,
    ContactEmergencyOutlined,
    MovieCreationOutlined,
    RequestQuoteOutlined,
    VideoFileOutlined,
    PersonOffOutlined
} from "@mui/icons-material";
import { Outlet, useNavigate, NavLink, useLocation } from "react-router-dom";
import UserDropDown from "../../components/UserDropDown";
import { useGetUserByIdQuery } from "../../app/services";


export default function AdminView() {
    const location = useLocation();
    const id = localStorage.getItem("id");
    const [role, setRole] = useState("");
    const {data}= useGetUserByIdQuery(id);

    useEffect(() => {
        if (data) {

            if (data.is_staff) {
                setRole("Admin");
            } else {
                setRole("User");
            }
        }
    }, [data]);

    return (
        <div className="flex w-full bg-gray-100 ">
            <div>
                <div className="flex flex-col items-center p-2 h-full">
                    <NavLink
                    to="/home/Dashboard">
                        <div className="flex items-center gap-1 text-2xl font-semibold pb-10">
                            <CameraOutdoorOutlined
                                style={{ fontSize: "xx-large" }}
                            />
                            <span className="pt-2">Films</span>
                        </div>
                    </NavLink>
                    <nav className="flex items-start p-4 text-sm font-medium">
                        <div className="grid gap-10 pt-8">
                            <NavLink
                                className={
                                    location.pathname === "/home/Dashboard"
                                        ? "flex items-center gap-3 text-xl text-orange-400 pl-3 pr-4  border-r-4 border-orange-400 transition-all "
                                        : "flex items-center gap-3 text-xl px-3  text-orange-400 transition-all hover:text-yellow-900"
                                }
                                to="/home/Dashboard"
                            >
                                <HomeOutlined />
                                Dashboard
                            </NavLink>
                            {role === "Admin" && 
                            <NavLink
                                className={
                                    location.pathname ===
                                    "/home/Dashboard/Trabajadores"
                                        ? "flex items-center gap-3 text-xl text-orange-400 pl-3 pr-4  border-r-4 border-orange-400 transition-all "
                                        : "flex items-center gap-3 text-xl px-3  text-orange-400 transition-all hover:text-yellow-900"
                                }
                                to="Trabajadores"
                            >
                                <ContactEmergencyOutlined />
                                Trabajadores
                            </NavLink>}
                            <NavLink
                                className={
                                    location.pathname ===
                                    "/home/Dashboard/Clientes"
                                        ? "flex items-center gap-3 text-xl text-orange-400 pl-3 pr-2.5  border-r-4 border-orange-400 transition-all "
                                        : "flex items-center gap-3 text-xl px-3  text-orange-400 transition-all hover:text-yellow-900"
                                }
                                to="Clientes"
                            >
                                <PeopleAltOutlined />
                                Clientes
                            </NavLink>
                            <NavLink
                                className={
                                    location.pathname ===
                                    "/home/Dashboard/Peliculas"
                                        ? "flex items-center gap-3 text-xl text-orange-400 pl-3 pr-4 border-r-4 border-orange-400 transition-all"
                                        : "flex items-center gap-3 text-xl px-3  text-orange-400 transition-all hover:text-yellow-900"
                                }
                                to="Peliculas"
                            >
                                <MovieCreationOutlined />
                                Películas
                            </NavLink>
                            {role === "Admin" && 
                            <NavLink
                                className={
                                    location.pathname ===
                                    "/home/Dashboard/Soportes"
                                        ? "flex items-center gap-3 text-xl text-orange-400 pl-3 pr-4 border-r-4 border-orange-400 transition-all"
                                        : "flex items-center gap-3 text-xl px-3  text-orange-400 transition-all hover:text-yellow-900"
                                }
                                to="Soportes"
                            >
                                <VideoFileOutlined />
                                Soportes
                            </NavLink>}
                            <NavLink
                                className={
                                    location.pathname ===
                                    "/home/Dashboard/Prestamos"
                                        ? "flex items-center gap-3 text-xl text-orange-400 pl-3 pr-4 border-r-4 border-orange-400 transition-all"
                                        : "flex items-center gap-3 text-xl px-3  text-orange-400 transition-all hover:text-yellow-900"
                                }
                                to="Prestamos"
                            >
                                <RequestQuoteOutlined />
                                Préstamos
                            </NavLink>
                            <NavLink
                                className={
                                    location.pathname ===
                                    "/home/Dashboard/Invalidados"
                                        ? "flex items-center gap-3 text-xl text-orange-400 pl-3 pr-4 border-r-4 border-orange-400 transition-all"
                                        : "flex items-center gap-3 text-xl px-3  text-orange-400 transition-all hover:text-yellow-900"
                                }
                                to="Invalidados"
                            >
                                <PersonOffOutlined />
                                Invalidados
                            </NavLink>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <header className="flex h-12 items-center gap-4 px-6 justify-end">
                    <UserDropDown />
                </header>
                <div className="h-screen w-full bg-gray-50 border-r rounded-lg shadow-xl overflow-scroll">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
